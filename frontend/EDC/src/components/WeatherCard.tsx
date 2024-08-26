import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudSun } from "@fortawesome/free-solid-svg-icons"

export default function WeatherCard () {
    return (
        <div className="flex bg-white rounded-3xl shadow-lg overflow-hidden h-full">
            <div className="bg-gradient-to-bl from-blue-300 to-yellow-50 w-full h-full hover:-translate-y-[65%] hover:translate-x-[65%] hover:rounded-full hover:sclae-50 cursor-pointer transition-all duration-500 rounded-3xl">
                <span className="text-6xl text-white flex justify-center items-center w-full h-full">
                    <FontAwesomeIcon icon={faCloudSun} />
                </span>
            </div>
        </div>
    )
}