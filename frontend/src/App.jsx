import { useState } from "react";
import axios from "axios";

const PLATFORMS = [
  { id: "roblox", name: "Roblox" },
  { id: "twitter", name: "Twitter (X)" },
];

export default function App() {
  const [username, setUsername] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center text-white">
      <div className="bg-white text-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Multi-Username Checker
        </h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a username"
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <p className="font-semibold mb-2">Select Platforms:</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => (
              <label
                key={platform.id}
                className="flex items-center gap-2 bg-gray-100 p-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform.id)}
                  onChange={() => togglePlatform(platform.id)}
                  className="accent-blue-600"
                />
                {platform.name}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={checkUsername}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          {loading ? "Checking..." : "Check Username"}
        </button>

        {results && (
          <div className="pt-4 border-t border-gray-300">
            <h2 className="text-lg font-semibold mb-2">Results:</h2>
            <ul className="space-y-1">
              {Object.entries(results).map(([platform, available]) => (
                <li key={platform} className="flex justify-between items-center">
                  <span className="font-medium">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                  </span>
                  <span
                    className={
                      available
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
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
