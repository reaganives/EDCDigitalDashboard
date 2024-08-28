import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MLBNews = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchMLBNews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/mlb/latest-news');
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching MLB news:', error.message);
      }
    };

    fetchMLBNews();
  }, []);

  if (!article) {
    return <div>Loading latest MLB news...</div>;
  }

  return (
    <div className="relative w-60 h-42 rounded-md shadow-md">
      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover rounded-md shadow-md" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-black bg-opacity-50 rounded-md shadow-md">
        <h2 className="text-xs font-bold mb-4">{article.title}</h2>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline text-sm">
          Read more
        </a>
        <p className='text-[11px]'>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MLBNews;


