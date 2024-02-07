import { IconsContainer } from "./Icons";
import ItemsContainer from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-purple-900 py-7">
        <h3>
          Join over 4 million people having fun while accomplishing their goals!
        </h3>
        <button
          className="bg-purple-500 hover:bg-purple-600 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
        >
          Join Now!
        </button>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <IconsContainer />
      </div>
    </footer>
  );
};

export default Footer;
