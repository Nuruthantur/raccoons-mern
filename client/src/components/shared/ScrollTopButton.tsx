import React from "react";

function ScrollToTopButton() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-purple-500 hover:bg-purple-600 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
    >
      Scroll to Top
    </button>
  );
}

export default ScrollToTopButton;
