import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [decryptInput, setDecryptInput] = useState("");

  const handleEncrypt = async () => {
    const response = await fetch("http://localhost:3000/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setEncryptedText(data.encryptedText);
  };

  const handleDecrypt = async () => {
    const response = await fetch("http://localhost:3000/decrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encryptedText: decryptInput }),
    });
    const data = await response.json();
    setDecryptedText(data.decryptedText);
  };

  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      backgroundColor: "#f4f4f4", 
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ color: "#333" }}>Text Encryption & Decryption</h2>

      {/* Encryption */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to encrypt"
        style={{ padding: "10px", margin: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button 
        onClick={handleEncrypt} 
        style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Encrypt
      </button>
      <h3>Encrypted Text:</h3>
      <p style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px", width: "300px", textAlign: "center" }}>{encryptedText}</p>

      {/* Decryption */}
      <input
        type="text"
        value={decryptInput}
        onChange={(e) => setDecryptInput(e.target.value)}
        placeholder="Enter text to decrypt"
        style={{ padding: "10px", margin: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button 
        onClick={handleDecrypt} 
        style={{ padding: "10px 20px", backgroundColor: "#28A745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Decrypt
      </button>
      <h3>Decrypted Text:</h3>
      <p style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px", width: "300px", textAlign: "center" }}>{decryptedText}</p>
    </div>
  );
}

export default App;