import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons";
import StandingsLogic from "./StandingsLogic";
import PadresRecord from './PadresRecord';

export default function MLBCard() {
    const [isSlideActive, setIsSlideActive] = useState(false);

    const toggleSlide = () => {
        setIsSlideActive(!isSlideActive);
    };

    return (
        <div className="relative bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            <div 
                className={`absolute top-0 left-0 bg-gradient-to-b from-[#2F241D] to-[#3d2f26] w-full h-full z-10 cursor-pointer transition-all duration-500 rounded-3xl group ${
                    isSlideActive ? "md:translate-y-[75%] translate-y-[95%] rounded-none" : ""
                }`}
                onClick={toggleSlide}
            >
                <div className="flex flex-col items-center justify-between w-full h-full py-8">
                    {/* Icon wrapped in its own div that translates on parent hover */}
                    <div className="md:text-6xl text-5xl text-white transition-transform duration-500 group-hover:translate-y-[8%] group-hover:scale-95 group-hover:-rotate-90">
                        <FontAwesomeIcon icon={faBaseballBall} />
                    </div>

                    {/* PadresRecord stays unaffected by hover */}
                    <div className='w-full'>
                        <PadresRecord />
                    </div>
                </div>
            </div>
            <div className="relative z-0 w-full h-full pt-6 pb-2 px-2">
                <StandingsLogic />
            </div>
        </div>
    );
}


