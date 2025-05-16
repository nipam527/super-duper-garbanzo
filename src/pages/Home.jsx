import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <Link
        to="home" // Must match the 'id' or 'name' of the Home section
        smooth={true}
        duration={500}
        className="cursor-pointer bg-blue-500 px-6 py-3 rounded hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Hero;
