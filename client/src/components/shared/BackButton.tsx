import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigateTo = useNavigate();

  const goBack = () => {
    navigateTo(-1);
  };

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default BackButton;
