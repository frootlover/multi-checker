import { useState } from "react";
import axios from "axios";

const PLATFORMS = [
  { id: "roblox", name: "Roblox" },
  { id: "twitter (X)", name: "Twitter" },
];

export default function App() {
  const [username, setUsername] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const checkUsername = async () => {
    if (!username || selectedPlatforms.length === 0) {
      alert("Enter a username and select at least one platform.");
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const res = await axios.post("http://localhost:3001/api/check", {
        username,
        platforms: selectedPlatforms,
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Multi-Username Checker</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a username"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        <div className="mb-4">
          <p className="font-semibold mb-2">Select Platforms:</p>
          {PLATFORMS.map((platform) => (
            <label key={platform.id} className="block">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform.id)}
                onChange={() => togglePlatform(platform.id)}
                className="mr-2"
              />
              {platform.name}
            </label>
          ))}
        </div>

        <button
          onClick={checkUsername}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Checking..." : "Check Username"}
        </button>

        {results && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Results:</h2>
            <ul>
              {Object.entries(results).map(([platform, available]) => (
                <li key={platform} className="mb-1">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}:{" "}
                  <span className={available ? "text-green-600" : "text-red-600"}>
                    {available ? "Available ✅" : "Taken ❌"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
