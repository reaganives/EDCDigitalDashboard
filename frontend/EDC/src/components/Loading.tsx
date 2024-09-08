import Lottie from 'lottie-react';
import animationData from '../assets/loading.json'; // Import your JSON file

export default function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center pt-16'>
      <Lottie animationData={animationData} loop={true} style={{ width: '310px', height: '310px' }} />
    </div>
  );
}
