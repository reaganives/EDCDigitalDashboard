import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import WeatherLogic from "./WeatherLogic";
import TempQuickView from "./TempQuickView";

export default function WeatherCard() {
    const [isTranslated, setIsTranslated] = useState(false); // State for translation
    const [isScaled, setIsScaled] = useState(false); // State for scaling

    const handleClick = () => {
        if (!isTranslated) {
            setIsTranslated(true); // Trigger translation
            setTimeout(() => {
                setIsScaled(true); // Trigger scaling after translation
            }, 300); // Duration of translation
        } else {
            setIsScaled(false); // Reset scaling first
            setTimeout(() => {
                setIsTranslated(false); // Reset translation after scaling back
            }, 100); // Duration of scaling reset
        }
    };

    return (
        <div
            className="relative bg-white rounded-3xl shadow-lg overflow-hidden h-full"
             // Toggle state on click
        >
            <div
                className={`absolute top-0 left-0 z-10 bg-gradient-to-bl from-sky-400 to-yellow-50  w-full h-full cursor-pointer transition-all duration-500 rounded-full scale-150 border border-4 border-yellow-100/90 ${
                    isTranslated ? "-translate-y-[90%] translate-x-[90%] scale-100" : ""
                } ${isScaled ? "transition-all duration-500" : ""}`}
                onClick={handleClick}
            >
                <div className="md:text-4xl text-3xl text-white flex flex-col justify-center items-center w-full h-full hover:-translate-y-[2%] hover:translate-x-[2%] hover:scale-95 transition-all duration-500">
                    <FontAwesomeIcon icon={faCloudSun} />
                    <div className="mt-4">
                    <TempQuickView />
                    </div>
                </div>
            </div>

            <div className="relative w-full h-full z-0">
                <WeatherLogic />
            </div>
        </div>
    );
}
