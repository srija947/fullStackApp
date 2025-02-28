const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secretKey = crypto.randomBytes(32); // 32-byte key for AES-256
const iv = crypto.randomBytes(16); // 16-byte IV

// Encryption Route
app.post("/encrypt", (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    res.json({ encryptedText: encrypted });
  } catch (error) {
    console.error("Encryption error:", error);
    res.status(500).json({ error: "Encryption failed" });
  }
});

// Decryption Route
app.post("/decrypt", (req, res) => {
  try {
    const { encryptedText } = req.body;
    if (!encryptedText) return res.status(400).json({ error: "No encrypted text provided" });

    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    res.json({ decryptedText: decrypted });
  } catch (error) {
    console.error("Decryption error:", error);
    res.status(500).json({ error: "Decryption failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
