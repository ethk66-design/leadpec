
import { prisma } from "@/lib/db";
import { sendAdminNotification } from "@/lib/email";

async function runTest() {
    console.log("🧪 Starting Backend Functional Test...");

    if (!prisma) {
        console.log("❌ Database not available (prisma is null). Exiting.");
        process.exit(1);
    }

    // 1. Database Connection Test
    console.log("\n1. Testing Database Connection & Write (Inquiry)...");
    let inquiryId = "";
    try {
        const inquiry = await prisma.inquiry.create({
            data: {
                name: "Test Bot",
                email: "test@bot.com",
                subject: "Functional Test Run",
                message: "This is a simulated inquiry to verify DB integrity.",
                status: "PENDING"
            }
        });
        console.log("✅ Database Write Success!");
        console.log("   Creates ID:", inquiry.id);
        inquiryId = inquiry.id;
    } catch (e) {
        console.error("❌ Database Write Failed:", e);
        process.exit(1);
    }

    // 2. Email Service Test
    console.log("\n2. Testing Email Notification Logic...");
    try {
        // We expect this to print a warning if env vars are missing, or success if present
        const result = await sendAdminNotification({
            subject: "Test Notification",
            text: "This is a test email from the Functional Logic script.",
            to: "test-admin@leedpec.com"
        });

        if (result.success) {
            console.log("✅ Email Logic Executed: Sent (Message ID: " + result.messageId + ")");
        } else {
            console.log("⚠️ Email Logic Executed: Handled Gracefully (Result: " + result.error + ")");
            console.log("   (This is expected if SMTP vars are missing in .env)");
        }
    } catch (e) {
        console.error("❌ Email Logic Crashed:", e);
    }

    // 3. Cleanup
    console.log("\n3. Cleaning up Test Data...");
    if (inquiryId && prisma) {
        await prisma.inquiry.delete({ where: { id: inquiryId } });
        console.log("✅ Test Inquiry Deleted.");
    }

    console.log("\n🎉 Functional Test Complete.");
}

runTest()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma?.$disconnect();
    });
