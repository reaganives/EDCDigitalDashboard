import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LichessCard from "./LichessCard";
import MLBCard from "./MLBCard";
import XCard from "./XCard";
import WeatherCard from "./WeatherCard";
import SpotifyCard from "./SpotifyCard";
import CryptoCarousel from "./CryptoCarousel";
import Loading from "./Loading";

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

// Fade-in animation for CryptoCarousel with a delay
const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 3, // Keep the delay for the CryptoCarousel fade-in
    },
  },
};

export default function CardGrid() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [startAnimation, setStartAnimation] = useState(false); // Control card animations

  useEffect(() => {
    // Set loading to false after a certain duration
    const timer = setTimeout(() => {
      setLoading(false);
      // Start card animations after loading is done
      setTimeout(() => {
        setStartAnimation(true);
      }, 200);
    }, 1750);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Show the Loading animation until loading is finished */}
      {loading && <Loading />}

      {/* Render the CardGrid immediately but keep it hidden while loading */}
      <div
        className={`flex flex-col justify-center items-center transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-2 grid-rows-4 auto-rows-auto md:gap-8 gap-4 w-full lg:max-w-6xl sm:max-w-lg md:px-8 px-2 flex-grow">
          {/* Desktop View */}
          <motion.div
            className="lg:col-span-1 lg:row-span-2 hidden lg:grid"
            custom="down"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <MLBCard />
          </motion.div>

          <motion.div
            className="lg:col-span-1 lg:row-span-1 hidden lg:grid"
            custom="up"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <LichessCard />
          </motion.div>

          <motion.div
            className="lg:col-span-2 lg:row-span-1 hidden lg:grid"
            custom="right"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <SpotifyCard />
          </motion.div>

          <motion.div
            className="lg:col-span-2 lg:row-span-1 hidden lg:grid"
            custom="left"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <XCard />
          </motion.div>

          <motion.div
            className="lg:col-span-1 lg:row-span-1 hidden lg:grid"
            custom="down"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <WeatherCard />
          </motion.div>

          {/* Mobile View */}
          <motion.div
            className="col-span-2 row-span-1 grid lg:hidden"
            custom="right"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <SpotifyCard />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-2 grid lg:hidden"
            custom="down"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <MLBCard />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-1 grid lg:hidden"
            custom="left"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <LichessCard />
          </motion.div>

          <motion.div
            className="col-span-1 row-span-1 grid lg:hidden"
            custom="right"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <WeatherCard />
          </motion.div>

          <motion.div
            className="col-span-2 row-span-1 grid lg:hidden"
            custom="left"
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <XCard />
          </motion.div>
        </div>
      </div>

      {/* Keep the fade-in for CryptoCarousel but remove the parent opacity transition */}
      <motion.div
        className="mt-8 flex justify-center w-full"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants} // Keep the fade-in variants here
      >
        <div className="lg:max-w-5xl max-w-lg">
          <CryptoCarousel />
        </div>
      </motion.div>
    </div>
  );
}

