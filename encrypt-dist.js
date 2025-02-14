import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

console.log("🔹 Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  NODE_VERSION: process.version,
  PWD: process.cwd(),
  DIST_DIR: distDir,
});

// Read index.html
const htmlFilePath = path.join(distDir, "index.html");
console.log("🔹 Reading from:", htmlFilePath);

let htmlContent;
try {
  htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  console.log(
    "🔹 Read index.html successfully. Content length:",
    htmlContent.length
  );
} catch (error) {
  console.error("❌ Failed to read index.html:", error);
  process.exit(1);
}

// Verify pagecrypt is loaded correctly
console.log("🔹 Pagecrypt object:", {
  hasEncrypt: typeof pagecrypt.encrypt === "function",
  exportedKeys: Object.keys(pagecrypt),
});

// Encrypt with error handling
let encryptedHtml;
try {
  encryptedHtml = pagecrypt.encrypt(htmlContent, password);

  console.log("🔹 Encryption result:", {
    type: typeof encryptedHtml,
    isBuffer: Buffer.isBuffer(encryptedHtml),
    isArrayBuffer: encryptedHtml instanceof ArrayBuffer,
    constructor: encryptedHtml?.constructor?.name,
  });

  // Convert to string if needed
  if (Buffer.isBuffer(encryptedHtml)) {
    encryptedHtml = encryptedHtml.toString("utf8");
  } else if (encryptedHtml instanceof ArrayBuffer) {
    encryptedHtml = Buffer.from(encryptedHtml).toString("utf8");
  } else if (typeof encryptedHtml !== "string") {
    throw new Error(
      `Unexpected encryption result type: ${typeof encryptedHtml}`
    );
  }
} catch (error) {
  console.error("❌ Encryption failed:", error);
  console.error("🔹 Error details:", {
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
}

// Verify encrypted content
if (typeof encryptedHtml !== "string") {
  console.error("❌ Final content is not a string:", typeof encryptedHtml);
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
