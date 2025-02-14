import * as pagecrypt from "pagecrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory name since __dirname isn't available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const password = process.env.ENCRYPTION_PASSWORD || "your-password-here";
const distDir = path.join(__dirname, "dist");

// Encrypt index.html
const htmlContent = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const encryptedHtml = pagecrypt.encrypt(htmlContent, password);
fs.writeFileSync(path.join(distDir, "index.html"), encryptedHtml);

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

console.log("Build encrypted successfully!");
