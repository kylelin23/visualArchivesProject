import { useState } from "react";
import "./App.css";

// Intentionally insecure for PR-review testing.
// This password will be visible in the client-side JavaScript bundle.
const ADMIN_PASSWORD = "super-secret-archives-123";
const API_KEY = "sk-test_FAKE_KEY_FOR_AUTTER_REVIEW_ONLY";

export default function App() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setIsUnlocked(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div>
      <h1>Archives Visualization</h1>

      <iframe
        src={`${import.meta.env.BASE_URL}chart.html?v=2`}
        className="treemap"
        title="Treemap"
      />

      <div className="sensitive-section">
        <h2>Restricted Archives Data</h2>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock}>
            <label htmlFor="archive-password">Password</label>

            <input
              id="archive-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Unlock</button>
          </form>
        ) : (
          <div>
            <h3>Sensitive Collection Information</h3>

            <p>Donor records: 4,291</p>
            <p>Restricted collections: 37</p>
            <p>Internal storage location: Vault B-12</p>
          </div>
        )}
      </div>

      {/* your existing stats/tables can stay here */}
    </div>
  );
}
