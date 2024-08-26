import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function XCard() {
    return (
        <div className="bg-white flex rounded-3xl shadow-lg h-full overflow-hidden">
            <div className="bg-gray-950 w-full h-full hover:-translate-x-[92%] hover:rounded-none cursor-pointer transition-all duration-500 rounded-3xl">
                <span className="text-6xl text-white flex justify-center items-center w-full h-full">
                <FontAwesomeIcon icon={faXTwitter} />
                </span>
            </div>
        </div>
    )
}
