import nodemailer from 'nodemailer';

interface SendNotificationProps {
    subject: string;
    text: string;
    html?: string;
    to?: string; // Optional override, defaults to ADMIN_EMAIL
}

export async function sendAdminNotification({ subject, text, html, to }: SendNotificationProps) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // Check availability
    if (!host || !user || !pass) {
        console.warn("⚠️ SMTP Credentials not found in environment variables. Email notification skipped.");
        console.log("Subject:", subject);
        console.log("Body:", text);
        return { success: false, error: "SMTP not configured" };
    }

    const transporter = nodemailer.createTransport({
        host: host,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: user,
            pass: pass,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"LEADPEC System" <noreply@leedpec.com>',
            to: to || process.env.ADMIN_EMAIL || 'admin@leedpec.com', // Fallback to a default if env missing
            subject: subject,
            text: text,
            html: html || text.replace(/\n/g, '<br>'), // Simple fallback for HTML
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Failed to send email" };
    }
}
