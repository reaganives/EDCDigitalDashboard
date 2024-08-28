import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Animation from './Animation';

export default function XCard() {
    const [isSlideActive, setIsSlideActive] = useState(false); // State to toggle the slide

    const toggleSlide = () => {
        setIsSlideActive(!isSlideActive); // Toggle state
    };

    return (
        <div className="relative bg-white flex rounded-3xl shadow-lg h-full overflow-hidden group">
            <div
                className={`absolute bg-gradient-to-r from-black to-gray-900 w-full h-full transition-all duration-500 rounded-3xl hover:opacity-95 cursor-pointer flex justify-center items-center z-20 ${
                    isSlideActive ? '-translate-x-[92%] rounded-none' : ''
                }`}
                onClick={toggleSlide} // Attach the toggle function to onClick
            >
                <span className="md:text-6xl text-5xl text-white flex justify-center items-center transition-all ease-in-out duration-500 group-hover:scale-105 group-hover:ring group-hover:ring-white">
                    <FontAwesomeIcon icon={faXTwitter} />
                </span>
            </div>
            <div className="relative w-full flex justify-end">
                <div className='absolute -top-52 z-0'>
                    <Animation />
                </div>
                <div className='absolute z-10 w-full h-full flex justify-end items-end'>
                    <h2 className='px-6 pb-2 text-xs tracking-widest italic hover:scale-105 transition-all duration-500 cursor-default'>
                        Waiting on API access approval...
                    </h2>
                </div>
            </div>
        </div>
    );
}

