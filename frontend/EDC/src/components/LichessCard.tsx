import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';

export default function LichessCard() {
    return (
        <div className="relative flex bg-white rounded-3xl shadow-lg overflow-hidden h-full">
            {/* First layer */}
            <div className="relative bg-white w-full h-full hover:-translate-y-[100%] hover:rounded-full hover:scale-150 cursor-pointer transition-all duration-500 rounded-3xl z-10">
                <div className="flex flex-col justify-center items-center w-full h-full pb-16">
                    <span className="tracking-wider text-2xl mb-2">Lichess.org</span>
                    <div className="flex flex-col space-y-0">
                        <div className="flex space-x-0">
                            {Array(17).fill(0).map((_, idx) => (
                                <span key={idx} className={idx % 2 === 1 ? "text-white leading-none" : "leading-none"}>
                                    <FontAwesomeIcon icon={faSquareFull} />
                                </span>
                            ))}
                        </div>
                        <div className="flex space-x-0">
                            {Array(17).fill(0).map((_, idx) => (
                                <span key={idx} className={idx % 2 === 0 ? "text-white leading-none" : "leading-none"}>
                                    <FontAwesomeIcon icon={faSquareFull} />
                                </span>
                            ))}
                        </div>
                        <div className="flex space-x-0">
                            {Array(17).fill(0).map((_, idx) => (
                                <span key={idx} className={idx % 2 === 1 ? "text-white leading-none" : "leading-none"}>
                                    <FontAwesomeIcon icon={faSquareFull} />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



