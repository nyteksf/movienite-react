/*
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
  console.log("🔹 Available pagecrypt methods:", Object.keys(pagecrypt));
  
  const htmlFilePath = path.join(distDir, "index.html");
  
  try {
    // Read the HTML content
    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    console.log("🔹 Read HTML file, length:", htmlContent.length);
    
    // Get the encryption function
    if (typeof pagecrypt.default === 'function') {
      console.log("🔹 Using pagecrypt.default");
      const encryptedContent = await pagecrypt.default(htmlContent, password);
      fs.writeFileSync(htmlFilePath, encryptedContent);
    } else if (typeof pagecrypt.encrypt === 'function') {
      console.log("🔹 Using pagecrypt.encrypt");
      const encryptedContent = await pagecrypt.encrypt(htmlContent, password);
      fs.writeFileSync(htmlFilePath, encryptedContent);
    } else {
      throw new Error("No valid encryption function found in pagecrypt module");
    }
    
    console.log("✅ Content encrypted successfully");
    
    // Copy pagecrypt loader
    const loaderPath = path.join(
      __dirname,
      "node_modules",
      "pagecrypt",
      "dist",
      "loader.js"
    );
    
    if (!fs.existsSync(loaderPath)) {
      throw new Error(`Loader not found at: ${loaderPath}`);
    }
    
    const loaderContent = fs.readFileSync(loaderPath, "utf8");
    fs.writeFileSync(path.join(distDir, "loader.js"), loaderContent);
    
    console.log("✅ Process completed successfully!");
    
  } catch (error) {
    console.error("❌ Error during encryption:", {
      message: error.message,
      stack: error.stack,
      pagecryptKeys: Object.keys(pagecrypt)
    });
    process.exit(1);
  }
}

// Run the async main function
main().catch(error => {
  console.error("❌ Top-level error:", error);
  process.exit(1);
});
*/