import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for the blog object
interface Blog {
  title: string;
  summary: string;
  link: string;
  image: string;
  published: string;
}

const LichessBlog: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get('http://ec2-54-241-59-25.us-west-1.compute.amazonaws.com:4000/api/lichess/latest-blog');
        const cleanedSummary = response.data.summary.replace(/<br\s*\/?>/gi, ''); // Removing <br> tags
        setBlog({ ...response.data, summary: cleanedSummary });
      } catch (error) {
        console.error('Error fetching Lichess blog:', error);
      }
    };

    fetchBlog();
  }, []);

  if (!blog) {
    return <div>Loading blog post...</div>;
  }

  return (
    <div className="relative w-44 h-24 rounded-xl shadow-xl">
      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover rounded-xl shadow-xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-black bg-opacity-25 rounded-xl shadow-xl">
        <h2 className="text-xs font-bold mb-2">{blog.title}</h2>
        <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline text-xs">
          Read more
        </a>
        <p className='text-[10px]'>Published: {new Date(blog.published).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default LichessBlog;





