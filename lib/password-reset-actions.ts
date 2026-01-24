'use server';

import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { sendAdminNotification } from "@/lib/email";

const TOKEN_EXPIRY_HOURS = 1;
const MAX_REQUESTS_PER_HOUR = 3;

/**
 * Request a password reset - generates token and sends email
 * Returns success even if email doesn't exist (security best practice)
 */
export async function requestPasswordReset(email: string) {
    if (!prisma) return { success: true }; // Silent fail if no DB

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() }
        });

        // Always return success to prevent email enumeration
        if (!user) {
            return { success: true };
        }

        // Rate limiting: Check recent requests
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentTokens = await prisma.passwordResetToken.count({
            where: {
                userId: user.id,
                createdAt: { gte: oneHourAgo }
            }
        });

        if (recentTokens >= MAX_REQUESTS_PER_HOUR) {
            // Still return success but don't create new token
            return { success: true };
        }

        // Delete any existing tokens for this user
        await prisma.passwordResetToken.deleteMany({
            where: { userId: user.id }
        });

        // Generate secure token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

        // Store token in database
        await prisma.passwordResetToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt
            }
        });

        // Build reset URL
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`;

        // Send email
        await sendAdminNotification({
            to: user.email,
            subject: '[LEADPEC] Password Reset Request',
            text: `
Hello ${user.name || 'Admin'},

You requested to reset your password for the LEADPEC Admin Panel.

Click the link below to reset your password:
${resetUrl}

This link will expire in ${TOKEN_EXPIRY_HOURS} hour(s).

If you did not request this reset, please ignore this email. Your password will remain unchanged.

For security reasons, do not share this link with anyone.

Best regards,
LEADPEC System
            `.trim(),
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0B1B32; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f8f9fa; }
        .button { display: inline-block; background: #008CBA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>LEADPEC Admin</h1>
        </div>
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${user.name || 'Admin'},</p>
            <p>You requested to reset your password for the LEADPEC Admin Panel.</p>
            <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
            </p>
            <p><small>Or copy this link: ${resetUrl}</small></p>
            <p>This link will expire in <strong>${TOKEN_EXPIRY_HOURS} hour(s)</strong>.</p>
            <div class="warning">
                <strong>⚠️ Security Notice:</strong><br>
                If you did not request this reset, please ignore this email. Your password will remain unchanged.
            </div>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} LEADPEC. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
            `.trim()
        });

        return { success: true };
    } catch (error) {
        console.error("Password reset request error:", error);
        return { success: true }; // Silent fail for security
    }
}

/**
 * Validate a password reset token
 */
export async function validateResetToken(token: string) {
    if (!prisma) return { valid: false, error: "System unavailable" };

    try {
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true }
        });

        if (!resetToken) {
            return { valid: false, error: "Invalid or expired reset link" };
        }

        if (resetToken.expiresAt < new Date()) {
            // Delete expired token
            await prisma.passwordResetToken.delete({
                where: { id: resetToken.id }
            });
            return { valid: false, error: "Reset link has expired. Please request a new one." };
        }

        return {
            valid: true,
            email: resetToken.user.email,
            userName: resetToken.user.name
        };
    } catch (error) {
        console.error("Token validation error:", error);
        return { valid: false, error: "Unable to validate reset link" };
    }
}

/**
 * Reset password using token
 */
export async function resetPassword(token: string, newPassword: string) {
    if (!prisma) return { error: "System unavailable" };

    // Validate password strength
    if (!newPassword || newPassword.length < 8) {
        return { error: "Password must be at least 8 characters long" };
    }

    try {
        // Find and validate token
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true }
        });

        if (!resetToken) {
            return { error: "Invalid or expired reset link" };
        }

        if (resetToken.expiresAt < new Date()) {
            await prisma.passwordResetToken.delete({
                where: { id: resetToken.id }
            });
            return { error: "Reset link has expired. Please request a new one." };
        }

        // Hash new password
        const hashedPassword = await hash(newPassword, 12);

        // Update user password
        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword }
        });

        // Delete the used token (single-use)
        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id }
        });

        return { success: "Password reset successfully! You can now log in." };
    } catch (error) {
        console.error("Password reset error:", error);
        return { error: "Failed to reset password. Please try again." };
    }
}
