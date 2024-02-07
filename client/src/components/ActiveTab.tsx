import { useCallback, useEffect, useState } from "react";

const useIsTabActive = () => {
  const [isTabVisible, setIsTabVisible] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setIsTabVisible(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return isTabVisible;
};

const useDocumentVisible = (documentElement = document) => {
  const [documentVisible, setDocumentVisible] = useState(
    documentElement.visibilityState
  );

  useEffect(() => {
    const handleVisibilityChange = () =>
      setDocumentVisible(documentElement.visibilityState);

    documentElement.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () =>
      documentElement.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
  }, [documentElement]);

  return documentVisible === "visible";
};

export { useIsTabActive, useDocumentVisible };
