import { useRef, useState } from "react";
import { Task } from "../@types/tasks";
import { ResNotOk } from "../@types";
import baseUrl from "../utils/baseurl";

//NOTE - unused for now

const findATask = () => {
  const [foundTask, setFoundTask] = useState<Task | null>(null);
  const inputValue = useRef("");
  const [error, setError] = useState("");
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setError("");
    if (!inputValue.current) return alert("you have to type something");
    try {
      const response = await fetch(
        `${baseUrl}/api/tasks/find/${inputValue.current}`
      );

      if (!response.ok) {
        const result = (await response.json()) as ResNotOk;
        console.log("result", result);
        setError(result.error);
        return console.log(result);
      }
      const result = (await response.json()) as Task;
      setFoundTask(result);
    } catch (error) {
      console.log(error);
      setError("Something went wrong...");
    }
  };
};

export default findATask;
