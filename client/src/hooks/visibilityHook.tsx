import { useState } from "react";

const useVisibility = (defaultVisibility = false) => {
  const [visibility, setVisibility] = useState(defaultVisibility);

  const handleVisiblitiy = (value: any) => {
    if (value && typeof value === "boolean") {
      setVisibility(value);
    } else {
      setVisibility((state) => !state);
    }
  };

  return [visibility, handleVisiblitiy];
};

export default useVisibility;
