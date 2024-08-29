import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Slick carousel default styles
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme

// Define the type for each crypto object
interface Crypto {
    id: string;
    image: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
}

const settings = {
    dots: false, // Disable dots
    arrows: false, // Disable arrows
    infinite: true, // Enable infinite scrolling
    speed: 5000, // Slow transition speed
    autoplay: true, // Enable autoplay
    autoplaySpeed: 0, // Set to 0 for continuous movement
    cssEase: "linear", // Ensure linear animation for continuous scroll
    slidesToShow: 1, // Show one item at a time
    slidesToScroll: 1, // Scroll one item at a time
    variableWidth: true, // Allow slides to have variable widths for ticker effect
};

export default function CryptoCarousel() {
    // Use the Crypto type for the state
    const [cryptoData, setCryptoData] = useState<Crypto[]>([]);

    useEffect(() => {
        axios.get('/crypto')
            .then(response => {
                setCryptoData(response.data);
            })
            .catch(error => {
                console.error('Error fetching crypto data:', error);
            });
    }, []);

    return (
        <div className="crypto-carousel-wrapper relative w-full max-w-5xl mx-auto overflow-hidden"> {/* Fade edges container */}
            <div className="crypto-carousel w-full relative">
                {cryptoData.length > 0 ? (
                    <Slider {...settings}>
                        {cryptoData.map((crypto) => (
                            <div 
                                key={crypto.id} 
                                className="crypto-card p-8" 
                                style={{ minWidth: '250px', maxWidth: '300px' }}
                            >
                                <div className='flex items-center gap-2 font-noto tracking-wide transition-all duration-300'>
                                <img src={crypto.image} alt={crypto.name} className="crypto-icon w-5 h-5 mx-auto" />
                                <h3 className="text-sm text-center">{crypto.name}</h3>
                                <span className="text-xs">~</span>
                                <p className="text-center text-xs">${crypto.current_price.toFixed(2)}</p>
                                <div className='ml-2'>
                                
                                <p className={`text-center text-xs ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {crypto.price_change_percentage_24h.toFixed(2)}%
                                </p>
                                </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>Loading cryptocurrency data...</p>
                )}
            </div>

            {/* Gradient overlay for the fading effect */}
            <div className="fade-overlay absolute inset-0 pointer-events-none"></div>
        </div>
    );
}



