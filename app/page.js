"use client"
import { useState } from "react";
import NavBar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import GithubCard from "./components/Card";

const defaultUser = {
  login: "yourname",
  name: "Your Name",
  avatar_url: "",
  html_url: "https://github.com/",
  bio: "Your Bio",
  created_at: "-",
  public_repos: "-",
  followers: "-",
  following: "-",
  location: "-",
  twitter_username: "-",
  blog: "-",
  company: "-"
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState(defaultUser);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`flex flex-col items-center justify-start min-h-screen font-mono p-4 ${isDarkMode ? 'bg-[#141D2F]' : 'bg-[#F6F8FF]'}`}>
      <div className="w-full max-w-[730px]">
        <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <SearchInput isDarkMode={isDarkMode} setUserData={setUserData} />
        <GithubCard isDarkMode={isDarkMode} userData={userData} />
      </div>
    </div>
  );
}