import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

// Force console logs to be synchronous and unbuffered
const originalLog = console.log;
console.log = (...args) => {
  originalLog(...args);
  if (process.stdout && process.stdout.write) {
    process.stdout.write(''); // Force flush
  }
};

// Debug environment immediately
console.log("🔹 DEBUG 1: Script started");
console.log("🔹 Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  NODE_VERSION: process.version,
  PWD: process.cwd(),
  DIST_DIR: distDir
});

// Debug pagecrypt immediately
console.log("🔹 DEBUG 2: Checking pagecrypt");
console.log("🔹 Pagecrypt type:", typeof pagecrypt);
console.log("🔹 Available methods:", Object.keys(pagecrypt));

// Read index.html
const htmlFilePath = path.join(distDir, "index.html");
console.log("🔹 DEBUG 3: Reading file from", htmlFilePath);

let htmlContent;
try {
  htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  console.log("🔹 DEBUG 4: File read success, length:", htmlContent.length);
} catch (error) {
  console.error("❌ Failed to read index.html:", error);
  process.exit(1);
}

// Try multiple encryption approaches
let encryptedHtml;
try {
  console.log("🔹 DEBUG 5: Starting encryption attempts");
  
  // First try: Standard encrypt
  try {
    console.log("🔹 DEBUG 6: Attempting standard encrypt");
    encryptedHtml = pagecrypt.encrypt(htmlContent, password);
    console.log("🔹 DEBUG 7: Standard encrypt result type:", typeof encryptedHtml);
  } catch (e) {
    console.log("🔹 DEBUG 8: Standard encrypt failed:", e.message);
  }
  
  // Second try: encryptSync if it exists
  if (typeof encryptedHtml !== 'string' && pagecrypt.encryptSync) {
    try {
      console.log("🔹 DEBUG 9: Attempting encryptSync");
      encryptedHtml = pagecrypt.encryptSync(htmlContent, password);
      console.log("🔹 DEBUG 10: encryptSync result type:", typeof encryptedHtml);
    } catch (e) {
      console.log("🔹 DEBUG 11: encryptSync failed:", e.message);
    }
  }
  
  // If we got an object, try to extract content
  if (typeof encryptedHtml === 'object' && encryptedHtml !== null) {
    console.log("🔹 DEBUG 12: Got object result, keys:", Object.keys(encryptedHtml));
    
    // Try common property names
    const possibleProps = ['content', 'data', 'result', 'encrypted', 'text', 'value'];
    for (const prop of possibleProps) {
      if (typeof encryptedHtml[prop] === 'string') {
        console.log(`🔹 DEBUG 13: Found string in .${prop}`);
        encryptedHtml = encryptedHtml[prop];
        break;
      }
    }
  }

  // Final validation
  if (typeof encryptedHtml !== 'string') {
    throw new Error(`Encryption result not usable. Type: ${typeof encryptedHtml}`);
  }

  console.log("🔹 DEBUG 14: Final validation passed");

} catch (error) {
  console.error("❌ Encryption failed:", error);
  console.error("🔹 Full error details:", {
    name: error.name,
    message: error.message,
    stack: error.stack,
    encryptedHtmlType: typeof encryptedHtml,
    encryptedHtmlKeys: encryptedHtml ? Object.keys(encryptedHtml) : null
  });
  process.exit(1);
}

// Write the encrypted HTML
try {
  console.log("🔹 DEBUG 15: Writing encrypted content");
  fs.writeFileSync(htmlFilePath, encryptedHtml);
  console.log("✅ Encrypted file written successfully!");
} catch (error) {
  console.error("❌ Failed to write encrypted file:", error);
  process.exit(1);
}

// Copy pagecrypt loader
try {
  console.log("🔹 DEBUG 16: Copying loader");
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