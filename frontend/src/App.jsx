import React, { useState } from "react";
import "./index.css"

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(`http://127.0.0.1:8000/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Company Profile Finder
      </h1>

      <div className="flex gap-2 w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter company name or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-6 text-gray-500">Searching...</p>}

      <div className="mt-8 w-full max-w-2xl space-y-4">
        {results.length === 0 && !loading && (
          <p className="text-gray-500 text-center">
            No results yet. Try searching for a company!
          </p>
        )}

        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {result.title}
            </h2>
            <p className="text-gray-600 mt-2">{result.snippet}</p>
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 mt-2 inline-block hover:underline"
            >
              Visit Website →
            </a>
            <p className="text-sm text-green-600 mt-1">
              ✅ Reason: {result.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
