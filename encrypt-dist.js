import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

// Read index.html
const htmlFilePath = path.join(distDir, "index.html");
const htmlContent = fs.readFileSync(htmlFilePath, "utf8");

console.log(
  "🔹 Read index.html successfully. Content length:",
  htmlContent.length
);

// Encrypt the HTML file properly
const encryptedHtml = pagecrypt.encrypt(htmlContent, password);

console.log("🔹 Type of encryptedHtml:", typeof encryptedHtml);
console.log(
  "🔹 First 500 chars of encryptedHtml:\n",
  encryptedHtml.slice(0, 500)
);

if (typeof encryptedHtml !== "string") {
  console.error(
    "❌ Encryption failed: expected a string, but got:",
    typeof encryptedHtml
  );
  process.exit(1);
}

// ✅ Write the encrypted HTML to index.html
fs.writeFileSync(htmlFilePath, encryptedHtml);

console.log("✅ Encrypted file written successfully!");

console.log("🔹 Type of encryptedHtml:", typeof encryptedHtml);
console.log("🔹 Encrypted HTML (entire content):", encryptedHtml);

console.log("🔹 encryptedHtml structure:", JSON.stringify(encryptedHtml, null, 2));

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

console.log("✅ Loader copied successfully!");
