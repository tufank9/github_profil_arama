import Image from 'next/image'

export default function GithubCard({ isDarkMode, userData }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderLink = (url) => {
    if (!url) return 'Not Available';
    // Add https:// if it's not already there
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    return (
      <a 
        href={fullUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {url}
      </a>
    );
  };

  return (
    <div className={`w-full max-w-[730px] ${userData.bio ? 'h-auto' : 'h-[420px]'} ${isDarkMode ? 'bg-[#1E2A47]' : 'bg-[#FEFEFE]'} rounded-3xl shadow-lg mt-6`}>
      <div className="flex flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-9">
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mx-auto md:mx-0">
          <Image
            src={userData.avatar_url || '/placeholder.svg?height=120&width=120'}
            alt={`${userData.name || userData.login}'s avatar`}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className={`font-bold text-2xl md:text-[26px] ${isDarkMode ? 'text-white' : 'text-[#2B3442]'}`}>
                {userData.name || userData.login}
              </h1>
              <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-[#0079FF] hover:underline">
                @{userData.login}
              </a>
            </div>
            <p className={`mt-2 md:mt-0 ${isDarkMode ? 'text-gray-400' : 'text-[#697C9A]'}`}>
              Joined {formatDate(userData.created_at)}
            </p>
          </div>
          
          <p className={`mt-5 text-[15px] ${isDarkMode ? 'text-gray-400' : 'text-[#4B6A9B]'}`}>
            {userData.bio || "This profile has no bio"}
          </p>

          <div className={`mt-8 w-full rounded-[10px] flex justify-around items-center ${isDarkMode ? 'bg-[#141D2F]' : 'bg-[#F6F8FF]'} p-4 md:p-8`}>
            {[
              { label: 'Repos', value: userData.public_repos },
              { label: 'Followers', value: userData.followers },
              { label: 'Following', value: userData.following }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <p className={`text-[13px] ${isDarkMode ? 'text-gray-400' : 'text-[#4B6A9B]'}`}>{item.label}</p>
                <h2 className={`text-[22px] font-bold ${isDarkMode ? 'text-white' : 'text-[#2B3442]'}`}>
                  {item.value}
                </h2>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              { icon: "/local.png", alt: "Location", value: userData.location },
              { icon: "/socialMedia.png", alt: "Twitter", value: userData.twitter_username },
              { icon: "/link.png", alt: "Website", value: userData.blog, isLink: true },
              { icon: "/company.png", alt: "Company", value: userData.company }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-5">
                <Image src={item.icon} alt={item.alt} width={20} height={20} />
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-[#4B6A9B]'} truncate ${!item.value && 'opacity-50'}`}>
                  {item.isLink ? renderLink(item.value) : (item.value || 'Not Available')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}