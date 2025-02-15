import * as pagecrypt from "pagecrypt";

const result = pagecrypt.encrypt("index.html", "dr3am");
console.log("Result type:", typeof result);
console.log("Result:", result);