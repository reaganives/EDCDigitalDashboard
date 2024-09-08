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
    x: direction === 'left' ? -250 : direction === 'right' ? 250 : 0,
    y: direction === 'up' ? -250 : direction === 'down' ? 250 : 0,
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
      delay: 1.75, // Delay before the fade-in
    },
  },
};

export default function CardGrid() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [startAnimation, setStartAnimation] = useState(false); // Control card animations

  useEffect(() => {
    // Add background class on mount
    document.body.classList.add('bg-gray-100');

    // Set loading to false after a certain duration
    const timer = setTimeout(() => {
      setLoading(false);
      // Start card animations after loading is done
      setTimeout(() => {
        setStartAnimation(true);
      }, 450);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('bg-gray-100');
    };
  }, []);

  // If loading is true, show the Loading component
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* The rest of the components with the global opacity transition */}
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

      {/* CryptoCarousel with its own independent fade-in animation */}
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


