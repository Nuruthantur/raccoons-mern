import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import IconsContainer from "./IconsContainer";
import ItemsContainer from "./ItemsContainer";
import ScrollToTopButton from "../ScrollTopButton";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-gray-900 text-white ">
      {!user ? (
        <div className="flex flex-col bg-purple-900 items-center ">
          <div>
            <br />
            <h1>
              Join over 10 billion people having fun while accomplishing their
              goals!
            </h1>
            <br />
          </div>
          <div className="">
            <a
              href="/sign-up"
              className="bg-purple-500 hover:bg-purple-600 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
            >
              Join Now!
            </a>
          </div>
          <br />
        </div>
      ) : (
        <></>
      )}
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
      <div className="">
        {/* flex justify-center  */}
        <IconsContainer />
      </div>
      <div>
        <ScrollToTopButton />
      </div>
    </footer>
  );
};

export default Footer;
