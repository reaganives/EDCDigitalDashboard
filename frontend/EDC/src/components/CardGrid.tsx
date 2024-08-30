import { useEffect } from "react";
import LichessCard from "./LichessCard";
import MLBCard from "./MLBCard";
import XCard from "./XCard";
import WeatherCard from "./WeatherCard";
import SpotifyCard from "./SpotifyCard";
import CryptoCarousel from "./CryptoCarousel";

export default function CardGrid() {
    useEffect(() => {
        document.body.classList.add('bg-gray-100');
        return () => {
            document.body.classList.remove('bg-gray-100');
        };
    }, []);
    
    return (
        <div className="flex flex-col justify-center items-center "> {/* Ensure it takes at least the full height of the screen */}
            <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-2 grid-rows-4 auto-rows-auto md:gap-8 gap-4 w-full lg:max-w-6xl sm:max-w-lg md:px-8 px-2 flex-grow"> {/* Flex-grow added */}
                <div className="lg:col-span-1 lg:row-span-2 hidden lg:grid">
                    <MLBCard />
                </div>
                <div className="lg:col-span-1 lg:row-span-1 hidden lg:grid">
                    <LichessCard /> 
                </div>
                <div className="lg:col-span-2 lg:row-span-1 hidden lg:grid">
                    <SpotifyCard />
                </div>
                <div className="lg:col-span-2 lg:row-span-1 hidden lg:grid">
                    <XCard />
                </div>
                <div className="lg:col-span-1 lg:row-span-1 hidden lg:grid">
                    <WeatherCard /> 
                </div>

                {/* Mobile View */}

                <div className="col-span-2 row-span-1 grid lg:hidden">
                    <SpotifyCard />
                </div>
                <div className="col-span-1 row-span-2 grid lg:hidden">
                    <MLBCard />
                </div>
                <div className="col-span-1 row-span-1 grid lg:hidden">
                    <LichessCard /> 
                </div>
                <div className="col-span-1 row-span-1 grid lg:hidden">
                    <WeatherCard /> 
                </div>
                <div className="col-span-2 row-span-1 grid lg:hidden">
                    <XCard />
                </div>
            </div>
            <div className="mt-8 flex justify-center w-full"> {/* Centered with full width */}
                <div className="lg:max-w-5xl max-w-lg"> {/* Controlled max-width */}
                    <CryptoCarousel />
                </div>
            </div>
        </div>
    );
}






