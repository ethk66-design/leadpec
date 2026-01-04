const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "client_content");


async function extractText() {
    try {
        const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".docx"));
        const data = {};

        for (const file of files) {
            if (file.startsWith("~$")) continue;

            const filePath = path.join(contentDir, file);
            console.log(`Processing: ${file}`);
            const result = await mammoth.extractRawText({ path: filePath });
            data[file] = result.value.trim();
        }

        fs.writeFileSync(path.join(__dirname, "sectors_dump.json"), JSON.stringify(data, null, 2));
        console.log("Extraction complete. Saved to sectors_dump.json");
    } catch (error) {
        console.error("Error:", error);
    }
}


extractText();
