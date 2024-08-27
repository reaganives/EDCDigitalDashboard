import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons"
import StandingsLogic from "./StandingsLogic"

export default function MLBCard() {
    return (
        <div className="relative bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            <div className="absolute top-0 left-0 bg-red-300 w-full h-full hover:translate-y-[92%] hover:rounded-none z-10 cursor-pointer transition-all duration-500 rounded-3xl">
                <span className="text-6xl text-white flex justify-center items-center w-full h-full">
                    <FontAwesomeIcon icon={faBaseballBall} />
                </span>
            </div>
            <div className="relative z-0 w-full h-full px-2 py-6">
                <StandingsLogic />
            </div>
        </div>
    )
}