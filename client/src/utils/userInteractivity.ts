import { ResNotOk } from "../@types";
import { Task } from "../@types/tasks";
import baseUrl from "./baseurl";

const cheerTask = async (
  taskId: string,
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", `Bearer ${token}`);
  const urlencoded = new URLSearchParams();
  urlencoded.append("taskId", taskId);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
  };
  try {
    const response = await fetch(
      `${baseUrl}/api/tasks/task/addEncouragements`,
      requestOptions
    );
    if (!response.ok) {
      const result = (await response.json()) as ResNotOk;
      console.log("oh noooo", result);
    }
    if (response.ok) {
      console.log(response);
      const result = (await response.json()) as Task;
      setAllTasks((prevState) => {
        const newArray: Task[] = prevState.map((task) => {
          if (task._id === result._id) {
            return result;
          } else {
            return task;
          }
        });
        return newArray;
      });
      console.log(result);
    }
  } catch (error) {
    console.log("cheering is forbidden at this stage", error);
  }
};

const celebrateTask = async (
  taskId: string,
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", `Bearer ${token}`);
  const urlencoded = new URLSearchParams();
  urlencoded.append("taskId", taskId);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
  };
  try {
    const response = await fetch(
      `${baseUrl}/api/tasks/task/addCelebrations`,
      requestOptions
    );
    if (!response.ok) {
      const result = (await response.json()) as ResNotOk;
      console.log("oh noooo", result);
    }
    if (response.ok) {
      console.log(response);
      const result = (await response.json()) as Task;
      setAllTasks((prevState) => {
        const newArray: Task[] = prevState.map((task) => {
          if (task._id === result._id) {
            return result;
          } else {
            return task;
          }
        });
        return newArray;
      });
      console.log(result);
    }
  } catch (error) {
    console.log("celebration not possible; no fun not ever :/", error);
  }
};

const favouriteTask = async (taskId: string) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", `Bearer ${token}`);
  const urlencoded = new URLSearchParams();
  urlencoded.append("taskId", taskId);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
  };
  try {
    const response = await fetch(
      `${baseUrl}/api/tasks/task/favourite`,
      requestOptions
    );
    if (!response.ok) {
      const result = (await response.json()) as ResNotOk;
      console.log("oh noooo", result);
    }
    if (response.ok) {
      console.log(response);
      const result = await response.json();
      console.log(result);
    }
  } catch (error) {
    console.log("not able to favourite task", error);
  }
};

const likeTask = async (taskId: string) => {
  console.log(taskId);
};

const setTaskToFinished = async (taskId: string) => {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", `Bearer ${token}`);
  const urlencoded = new URLSearchParams();
  urlencoded.append("taskId", taskId);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
  };
  try {
    const response = await fetch(
      `${baseUrl}/api/tasks/task/finishedTask`,
      requestOptions
    );
    if (!response.ok) {
      const result = (await response.json()) as ResNotOk;
      console.log("oh noooo", result);
    }
    if (response.ok) {
      console.log(response);
      const result = await response.json();
      console.log(result);
    }
  } catch (error) {
    console.log("could not set task to finished", error);
  }
};

export { cheerTask, celebrateTask, favouriteTask, likeTask, setTaskToFinished };
