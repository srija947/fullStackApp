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
    <div>
      <h2>Text Encryption & Decryption</h2>

      {/* Encryption */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to encrypt"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <h3>Encrypted Text:</h3>
      <p>{encryptedText}</p>

      {/* Decryption */}
      <input
        type="text"
        value={decryptInput}
        onChange={(e) => setDecryptInput(e.target.value)}
        placeholder="Enter text to decrypt"
      />
      <button onClick={handleDecrypt}>Decrypt</button>
      <h3>Decrypted Text:</h3>
      <p>{decryptedText}</p>
    </div>
  );
}

export default App;
