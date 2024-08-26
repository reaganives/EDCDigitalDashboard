import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faBaseballBall } from "@fortawesome/free-solid-svg-icons"

export default function MLBCard() {
    return (
        <div className="bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            <div className="bg-red-300 w-full h-full hover:translate-y-[92%] hover:rounded-none cursor-pointer transition-all duration-500 rounded-3xl">
                <span className="text-6xl text-white flex justify-center items-center w-full h-full">
                    <FontAwesomeIcon icon={faBaseballBall} />
                </span>
            </div>
        </div>
    )
}