import { useNavigate } from "react-router-dom";

import Button from "../components/shared/Button";

export default function Error404() {
  const navigateTo = useNavigate();

  const goBack = () => {
    navigateTo(-1);
  };
  return (
    <div className="bg-gradient-to-b from-purple-700 to-purple-500 flex flex-col justify-center h-screen">
      <div className="flex flex-col items-center">
        <div>
          <h1>There doesn't seem to be anything here </h1>
        </div>
        <div>
          <h2>*cricket noise*</h2>
        </div>
        <div>
          <Button label="Go Back" onClick={goBack} />
        </div>
      </div>
    </div>
  );
}
