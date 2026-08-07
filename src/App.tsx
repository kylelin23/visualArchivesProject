import { useState } from "react";
import "./App.css";

// ============================================================
// INTENTIONALLY INSECURE TEST CODE
// These are FAKE credentials for testing PR review tooling.
// ============================================================

const ADMIN_PASSWORD = "password123";
const API_KEY = "sk_live_FAKE_AUTTER_TEST_KEY_123456789";
const DATABASE_PASSWORD = "admin123";
const INTERNAL_TOKEN = "FAKE_INTERNAL_ADMIN_TOKEN_DO_NOT_USE";

export default function App() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // BAD: Authentication happens entirely in the browser
  // against a hardcoded password.
  function login() {
    if (password === ADMIN_PASSWORD) {
      // BAD: Sensitive credentials stored in localStorage.
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("apiKey", API_KEY);
      localStorage.setItem("databasePassword", DATABASE_PASSWORD);

      setUnlocked(true);
    } else {
      alert("Incorrect password");
    }
  }

  // BAD: Destructive operation using credentials embedded
  // directly in frontend JavaScript.
  async function deleteEverything() {
    await fetch("https://example.com/api/delete-all-records", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${INTERNAL_TOKEN}`,
        "X-API-Key": API_KEY,
        "X-Database-Password": DATABASE_PASSWORD,
      },
    });

    alert("Database deleted!");
  }

  // VERY BAD: Executes arbitrary JavaScript supplied by user.
  function runUserInput() {
    const input = prompt("Enter JavaScript to execute:");

    if (input) {
      eval(input);
    }
  }

  return (
    <div>
      <h1>Archives Visualization</h1>

      <iframe
        src={`${import.meta.env.BASE_URL}chart.html?v=2`}
        className="treemap"
        title="Treemap"
      />

      {/* =====================================================
          INTENTIONALLY INSECURE ADMIN SECTION
          ===================================================== */}

      <div className="sensitive-section">
        <h2>Restricted Archives Admin Panel</h2>

        {!unlocked ? (
          <div>
            <p>Enter the administrator password to continue.</p>

            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>Admin Login</button>
          </div>
        ) : (
          <div>
            <h2>TOP SECRET ADMIN PANEL</h2>

            <p>Restricted Collections: 37</p>

            {/* Fake sensitive information */}
            <p>Test SSN: 123-45-6789</p>
            <p>Test Credit Card: 4111 1111 1111 1111</p>

            {/* BAD: Secrets displayed directly to the user */}
            <p>Database Password: {DATABASE_PASSWORD}</p>
            <p>API Key: {API_KEY}</p>
            <p>Internal Token: {INTERNAL_TOKEN}</p>

            <button onClick={deleteEverything}>Delete Entire Database</button>

            <button onClick={runUserInput}>Execute Arbitrary JavaScript</button>

            {/* BAD: URL-controlled content inserted as raw HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: window.location.hash.substring(1),
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          ORIGINAL STATISTICS
          ===================================================== */}

      <div className="stats">
        <h2>Overall Linear Feet Summary Statistics</h2>

        <table>
          <tbody>
            <tr>
              <td>Collection count</td>
              <td>186</td>
            </tr>
            <tr>
              <td>Mean</td>
              <td>142.50</td>
            </tr>
            <tr>
              <td>Std</td>
              <td>473.32</td>
            </tr>
            <tr>
              <td>Min</td>
              <td>2.50</td>
            </tr>
            <tr>
              <td>25%</td>
              <td>5.00</td>
            </tr>
            <tr>
              <td>50%</td>
              <td>25.25</td>
            </tr>
            <tr>
              <td>75%</td>
              <td>100.38</td>
            </tr>
            <tr>
              <td>Max</td>
              <td>5833.50</td>
            </tr>
          </tbody>
        </table>

        <h2>Summary by Department</h2>

        <table>
          <thead>
            <tr>
              <th>MS/UA/Dept</th>
              <th>Count</th>
              <th>Sum</th>
              <th>Mean</th>
              <th>Median</th>
              <th>Max</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Department</td>
              <td>1</td>
              <td>57.0</td>
              <td>57.00</td>
              <td>57.00</td>
              <td>57.0</td>
            </tr>

            <tr>
              <td>MS</td>
              <td>124</td>
              <td>10929.5</td>
              <td>88.14</td>
              <td>13.00</td>
              <td>1018.5</td>
            </tr>

            <tr>
              <td>UA</td>
              <td>60</td>
              <td>15514.0</td>
              <td>258.57</td>
              <td>70.75</td>
              <td>5833.5</td>
            </tr>

            <tr>
              <td>Unknown</td>
              <td>1</td>
              <td>5.0</td>
              <td>5.00</td>
              <td>5.00</td>
              <td>5.0</td>
            </tr>
          </tbody>
        </table>

        <h2>Top 10 Largest Collections</h2>

        <table>
          <thead>
            <tr>
              <th>MS/UA/Dept</th>
              <th>Collection No.</th>
              <th>Title</th>
              <th>Linear Feet</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>UA</td>
              <td>UA</td>
              <td>Unknown</td>
              <td>2507.0</td>
            </tr>

            <tr>
              <td>UA</td>
              <td>UA0015</td>
              <td>Records of the Athletics Department</td>
              <td>1477.5</td>
            </tr>

            <tr>
              <td>MS</td>
              <td>MS0195</td>
              <td>Mothers for Peace Collection</td>
              <td>1018.5</td>
            </tr>

            <tr>
              <td>MS</td>
              <td>MS0210</td>
              <td>Diablo Canyon Nuclear Power Plant Public Docum</td>
              <td>1001.0</td>
            </tr>

            <tr>
              <td>UA</td>
              <td>UA0099</td>
              <td>University Archives Photograph Collection</td>
              <td>978.0</td>
            </tr>

            <tr>
              <td>MS</td>
              <td>MS0009</td>
              <td>California Fairs Collection</td>
              <td>950.0</td>
            </tr>

            <tr>
              <td>UA</td>
              <td>UA0033</td>
              <td>The Associated Students, Inc. (ASI)</td>
              <td>882.5</td>
            </tr>

            <tr>
              <td>MS</td>
              <td>MS0015</td>
              <td>Richard J. Krejsa Collection</td>
              <td>733.0</td>
            </tr>

            <tr>
              <td>UA</td>
              <td>UA0008</td>
              <td>Office of the President, Julian A. McPhee</td>
              <td>724.5</td>
            </tr>

            <tr>
              <td>MS</td>
              <td>MS0003</td>
              <td>Arthur G. Barton Landscape Architecture</td>
              <td>514.0</td>
            </tr>
          </tbody>
        </table>

        <h2>Linear Feet by Department</h2>

        <table>
          <tbody>
            <tr>
              <td>Department</td>
              <td>26.0</td>
            </tr>
            <tr>
              <td>MS</td>
              <td>10762.0</td>
            </tr>
            <tr>
              <td>UA</td>
              <td>12403.0</td>
            </tr>
            <tr>
              <td>Unknown</td>
              <td>5.0</td>
            </tr>
          </tbody>
        </table>

        <div className="counts">
          <p>MS Containers: 1374</p>
          <p>UA Containers: 2001</p>
        </div>
      </div>
    </div>
  );
}
