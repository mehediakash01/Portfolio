import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("❌ Cloudinary env vars are missing");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const uploadResume = async () => {
  try {
    const resumePath = resolve(__dirname, "../../public/resume.pdf");
    console.log(`📄 Reading resume from: ${resumePath}`);
    
    const buffer = await readFile(resumePath);
    console.log(`✓ File read successfully (${(buffer.length / 1024).toFixed(2)} KB)`);

    console.log("🚀 Uploading to Cloudinary...");
    
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          public_id: "resume",
          folder: process.env.CLOUDINARY_FOLDER || "portfolio",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    console.log("\n✅ Resume uploaded successfully!\n");
    console.log("🔗 Cloudinary URL:");
    console.log(`   ${result.secure_url}\n`);
    console.log("📝 Update your Navbar.jsx with this URL:");
    console.log(`   href="${result.secure_url}"\n`);
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    process.exit(1);
  }
};

uploadResume();
