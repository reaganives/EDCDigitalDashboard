import Lottie from 'lottie-react';
import animationData from '../assets/waiting.json'; // Import your JSON file

const MyAnimationComponent = () => {
  return (
    <div className='w-full h-full'>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default MyAnimationComponent;
