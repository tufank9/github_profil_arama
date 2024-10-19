export default function NavBar({ toggleTheme, isDarkMode }) {
    return (
      <div className="flex items-center justify-between w-full max-w-[730px] p-4">
        <h1 className={`text-2xl md:text-[24px] font-bold ${isDarkMode ? 'text-white' : 'text-[#222731]'}`}>
        GitHub Profil Arama Sitesi
        </h1>
  
        <button onClick={toggleTheme} className="flex items-center gap-2 focus:outline-none" aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#4B6A9B]'}`}>
            {isDarkMode ? 'LIGHT' : 'DARK'}
          </span>
          <img src={isDarkMode ? "/sun.png" : "/moon.png"} alt={isDarkMode ? "Sun icon" : "Moon icon"} className="w-5 h-5" />
        </button>
      </div>
    );
  }