import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

// Debug environment
console.log("🔹 Starting script with environment:", {
  NODE_ENV: process.env.NODE_ENV,
  NODE_VERSION: process.version,
  PWD: process.cwd(),
  DIST_DIR: distDir
});

// Debug pagecrypt
console.log("🔹 Pagecrypt version:", pagecrypt.version || 'unknown');
console.log("🔹 Pagecrypt exports:", Object.keys(pagecrypt));
console.log("🔹 Pagecrypt encrypt type:", typeof pagecrypt.encrypt);

// Read index.html
const htmlFilePath = path.join(distDir, "index.html");
console.log("🔹 Reading from:", htmlFilePath);

let htmlContent;
try {
  htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  console.log("🔹 Read index.html successfully. Length:", htmlContent.length);
  console.log("🔹 First 100 chars:", htmlContent.substring(0, 100));
} catch (error) {
  console.error("❌ Failed to read index.html:", error);
  process.exit(1);
}

// Encrypt with detailed logging
let encryptedHtml;
try {
  console.log("🔹 Starting encryption...");
  encryptedHtml = pagecrypt.encrypt(htmlContent, password);
  
  // Log EVERYTHING about the result
  console.log("🔹 Raw encryption result type:", typeof encryptedHtml);
  console.log("🔹 Is null or undefined:", encryptedHtml == null);
  console.log("🔹 Constructor name:", encryptedHtml?.constructor?.name);
  console.log("🔹 Has toString?:", typeof encryptedHtml?.toString === 'function');
  
  if (typeof encryptedHtml === 'object') {
    console.log("🔹 Object keys:", Object.keys(encryptedHtml));
    console.log("🔹 Object entries:", Object.entries(encryptedHtml));
    
    // Try to get the actual encrypted content
    if (encryptedHtml.content) {
      console.log("🔹 Found .content property, using that");
      encryptedHtml = encryptedHtml.content;
    } else if (encryptedHtml.data) {
      console.log("🔹 Found .data property, using that");
      encryptedHtml = encryptedHtml.data;
    } else if (encryptedHtml.result) {
      console.log("🔹 Found .result property, using that");
      encryptedHtml = encryptedHtml.result;
    }
  }

  // Convert to string if needed
  if (Buffer.isBuffer(encryptedHtml)) {
    console.log("🔹 Converting Buffer to string");
    encryptedHtml = encryptedHtml.toString('utf8');
  } else if (encryptedHtml instanceof ArrayBuffer) {
    console.log("🔹 Converting ArrayBuffer to string");
    encryptedHtml = Buffer.from(encryptedHtml).toString('utf8');
  } else if (typeof encryptedHtml !== 'string') {
    throw new Error(`Unexpected encryption result type: ${typeof encryptedHtml}`);
  }

} catch (error) {
  console.error("❌ Encryption failed:", error);
  console.error("🔹 Error details:", {
    name: error.name,
    message: error.message,
    stack: error.stack
  });
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