import { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import LichessCard from "./LichessCard";
import MLBCard from "./MLBCard";
import XCard from "./XCard";
import WeatherCard from "./WeatherCard";
import SpotifyCard from "./SpotifyCard";
import CryptoCarousel from "./CryptoCarousel";

// Animation variants for snapping in cards from different directions
const cardVariants = {
  hidden: (direction: string) => ({
    opacity: 0,
    x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
    y: direction === 'up' ? -200 : direction === 'down' ? 200 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      delay: 0.5,
    },
  },
};

// Fade-in animation for CryptoCarousel with 2-second delay
const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1, // 2-second delay before the fade-in
    },
  },
};

export default function CardGrid() {
    useEffect(() => {
        document.body.classList.add('bg-gray-100');
        return () => {
            document.body.classList.remove('bg-gray-100');
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-2 grid-rows-4 auto-rows-auto md:gap-8 gap-4 w-full lg:max-w-6xl sm:max-w-lg md:px-8 px-2 flex-grow">
                {/* Desktop View */}
                <motion.div
                    className="lg:col-span-1 lg:row-span-2 hidden lg:grid"
                    custom="down"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <MLBCard />
                </motion.div>

                <motion.div
                    className="lg:col-span-1 lg:row-span-1 hidden lg:grid"
                    custom="up"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <LichessCard />
                </motion.div>

                <motion.div
                    className="lg:col-span-2 lg:row-span-1 hidden lg:grid"
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <SpotifyCard />
                </motion.div>

                <motion.div
                    className="lg:col-span-2 lg:row-span-1 hidden lg:grid"
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <XCard />
                </motion.div>

                <motion.div
                    className="lg:col-span-1 lg:row-span-1 hidden lg:grid"
                    custom="down"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <WeatherCard />
                </motion.div>

                {/* Mobile View */}
                <motion.div
                    className="col-span-2 row-span-1 grid lg:hidden"
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <SpotifyCard />
                </motion.div>

                <motion.div
                    className="col-span-1 row-span-2 grid lg:hidden"
                    custom="down"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <MLBCard />
                </motion.div>

                <motion.div
                    className="col-span-1 row-span-1 grid lg:hidden"
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <LichessCard />
                </motion.div>

                <motion.div
                    className="col-span-1 row-span-1 grid lg:hidden"
                    custom="right"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <WeatherCard />
                </motion.div>

                <motion.div
                    className="col-span-2 row-span-1 grid lg:hidden"
                    custom="left"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <XCard />
                </motion.div>
            </div>

            <motion.div
                className="mt-8 flex justify-center w-full"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants} // Apply fade-in variants here
            >
                <div className="lg:max-w-5xl max-w-lg">
                    <CryptoCarousel />
                </div>
            </motion.div>
        </div>
    );
}
