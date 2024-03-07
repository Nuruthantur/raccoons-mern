import React from "react";
interface ButtonProps {
  label: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div>
      <button
        className="bg-purple-500 hover:bg-purple-600 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
