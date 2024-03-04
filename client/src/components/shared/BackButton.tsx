import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigateTo = useNavigate();

  const goBack = () => {
    navigateTo(-1);
  };

  return (
    <div>
      <button
        onClick={goBack}
        className="bg-purple-500 hover:bg-purple-600 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
      >
        Go Back
      </button>
    </div>
  );
}

export default BackButton;
