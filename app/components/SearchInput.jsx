"use client"
import { useState } from "react";

export default function SearchInput({ isDarkMode, setUserData }) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (username) {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message || "User not found");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-[730px] mt-8 mb-4">
      <div className={`relative ${isDarkMode ? 'bg-[#1E2A47]' : 'bg-white'} rounded-lg shadow-md`}>
        <input
          type="text"
          placeholder="Search GitHub username…"
          className={`w-full h-[60px] md:h-[70px] p-2 pl-12 pr-28 rounded-lg 
            ${isDarkMode ? 'bg-[#1E2A47] text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'} 
            focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />

        <img
          src="/search.png"
          alt="Search icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />

        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 h-[50px] 
          ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-lg 
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
}