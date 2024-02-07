import IconsContainer from "./IconsContainer";
import ItemsContainer from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:flex-col md:justify-between md:items-center sm:px-12 px-4 bg-purple-900 py-7 gap-10">
        <div>
          <h3>
            Join over 10 billion people having fun while accomplishing their
            goals!
          </h3>
        </div>
        <div>
          <a
            href="/"
            className="bg-purple-500 hover:bg-purple-600 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
          >
            Join Now!
          </a>
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
      <div className="flex flex-row flex-wrap justify-center content-center place-items-center">
        <div>
          <IconsContainer />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
