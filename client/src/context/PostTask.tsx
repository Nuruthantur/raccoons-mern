import { useState } from "react";
import baseUrl from "../utils/baseurl";
// types
import { Task } from "../@types/tasks";
import { User } from "../@types/users";

const postTask = async (taskName: string, description: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // check if a user with that email address already exists!
  if (!taskName || !description) return alert("All fields must be included!");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  const body = new URLSearchParams();
  body.append("taskName", taskName);
  body.append("description", description);
  const requestOptions = {
    method: "POST",
    headers,
    body,
  };
  try {
    const response = await fetch(
      `${baseUrl}/api/users/task/new`,
      requestOptions
    );
    if (response.ok) {
      const result = (await response.json()) as User;
      setUser(result);
    } else {
      const result = (await response.json()) as ResNotOk;
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const createATask = async (values: {
  name: string;
  description: string;
  username: string;
}) => {
  const taskHeaders = new Headers();
  taskHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  const body = JSON.stringify(values);

  const requestOptions = {
    method: "POST",
    headers: taskHeaders,
    body: urlencoded,
  };
  try {
    const response = await fetch(
      `${baseUrl}/api/users/task/new`,
      requestOptions
    );
    if (!response.ok) {
      const result = (await response.json()) as ResNotOk;
      console.log(result);
    } else {
      const result = (await response.json()) as Task;
      console.log("the result :>> ", result);
      setTask(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export { postTask };
