import { useEffect } from "react";
import LichessCard from "./LichessCard";
import MLBCard from "./MLBCard";
import XCard from "./XCard";
import WeatherCard from "./WeatherCard";
import SpotifyCard from "./SpotifyCard";

export default function CardGrid() {
    useEffect(() => {
        document.body.classList.add('bg-gray-100');
        return () => {
            document.body.classList.remove('bg-gray-100');
        };
    }, []);
    
    return (
        <div className="flex justify-center items-center scale-125">
            <div className="grid grid-cols-8 grid-rows-2 gap-8 w-full max-w-6xl h-[40vh]">
                <div className="col-span-2 row-span-2">
                    <MLBCard /> {/* Or GitHubCard */}
                </div>
                <div className="col-span-2 row-span-1">
                    <LichessCard /> {/* Or GitHubCard */}
                </div>
                {/* Top-right Spotify card */}
                <div className="col-span-4 row-span-1">
                    <SpotifyCard />
                </div>
                {/* Bottom-left Twitter-like card */}
                <div className="col-span-4 row-span-1">
                    <XCard /> {/* Or TwitterCard */}
                </div>
                {/* Bottom-right miscellaneous card */}
                <div className="col-span-2 row-span-1">
                    <WeatherCard /> {/* Or miscellaneous card */}
                </div>
            </div>
        </div>
    );
}





