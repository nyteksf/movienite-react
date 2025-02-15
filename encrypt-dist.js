import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

async function main() {
  console.log("🔹 Starting encryption process...");
  
  // Setup file paths
  const htmlFilePath = path.join(distDir, "index.html");
  const tempFilePath = path.join(distDir, "index.temp.html");
  
  try {
    console.log("🔹 Creating temporary file for encryption");
    
    // Copy original to temp file
    fs.copyFileSync(htmlFilePath, tempFilePath);
    
    console.log("🔹 Starting file encryption");
    
    // Use pagecrypt's file-based encryption
    await pagecrypt.encryptFile(tempFilePath, htmlFilePath, password);
    
    console.log("✅ File encrypted successfully");
    
    // Clean up temp file
    fs.unlinkSync(tempFilePath);
    
    // Copy pagecrypt loader
    const loaderPath = path.join(
      __dirname,
      "node_modules",
      "pagecrypt",
      "dist",
      "loader.js"
    );
    const loaderContent = fs.readFileSync(loaderPath, "utf8");
    fs.writeFileSync(path.join(distDir, "loader.js"), loaderContent);
    
    console.log("✅ Process completed successfully!");
    
  } catch (error) {
    console.error("❌ Error during encryption:", error);
    
    // Clean up temp file if it exists
    try {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    } catch (cleanupError) {
      console.error("❌ Error during cleanup:", cleanupError);
    }
    
    process.exit(1);
  }
}

// Run the async main function
main().catch(error => {
  console.error("❌ Top-level error:", error);
  process.exit(1);
});