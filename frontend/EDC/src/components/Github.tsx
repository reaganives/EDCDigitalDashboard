import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface GithubProps {
  url: string;
}

const Github: React.FC<GithubProps> = ({ url }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 hover:rotate-6"
      aria-label="Github"
    >
      <FaGithub size={30} />
    </button>
  );
};

export default Github;