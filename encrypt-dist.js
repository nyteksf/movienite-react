import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

// Make the main function async
async function main() {
  console.log("🔹 Starting encryption process...");
  
  // Read index.html
  const htmlFilePath = path.join(distDir, "index.html");
  console.log("🔹 Reading from:", htmlFilePath);

  let htmlContent;
  try {
    htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    console.log("🔹 Read index.html successfully. Length:", htmlContent.length);
  } catch (error) {
    console.error("❌ Failed to read index.html:", error);
    process.exit(1);
  }

  // Encrypt with await
  let encryptedHtml;
  try {
    console.log("🔹 Starting encryption...");
    encryptedHtml = await pagecrypt.encrypt(htmlContent, password);
    
    console.log("🔹 Encryption completed. Result type:", typeof encryptedHtml);
    
    if (typeof encryptedHtml !== 'string') {
      throw new Error(`Expected string output but got ${typeof encryptedHtml}`);
    }

  } catch (error) {
    console.error("❌ Encryption failed:", error);
    process.exit(1);
  }

  // Write the encrypted HTML
  try {
    fs.writeFileSync(htmlFilePath, encryptedHtml);
    console.log("✅ Encrypted file written successfully!");
  } catch (error) {
    console.error("❌ Failed to write encrypted file:", error);
    process.exit(1);
  }

  // Copy pagecrypt loader
  try {
    const loaderPath = path.join(
      __dirname,
      "node_modules",
      "pagecrypt",
      "dist",
      "loader.js"
    );
    const loaderContent = fs.readFileSync(loaderPath, "utf8");
    fs.writeFileSync(path.join(distDir, "loader.js"), loaderContent);
    console.log("✅ Loader copied successfully!");
  } catch (error) {
    console.error("❌ Failed to copy loader:", error);
    process.exit(1);
  }
}

// Run the async main function
main().catch(error => {
  console.error("❌ Top-level error:", error);
  process.exit(1);
});