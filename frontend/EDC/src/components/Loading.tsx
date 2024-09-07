import Lottie from 'lottie-react';
import animationData from '../assets/loading.json'; // Import your JSON file

export default function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Lottie animationData={animationData} loop={true} style={{ width: '450px', height: '450px' }} />
    </div>
  );
}
