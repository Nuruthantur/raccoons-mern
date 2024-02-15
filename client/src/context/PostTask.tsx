import { useState } from "react";
import baseUrl from "../utils/baseurl";
// types
import { Task } from "../@types/tasks";
import { User } from "../@types/users";

const postTask = async (email: string, password: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // check if a user with that email address already exists!
  if (!email || !password) return alert("All fields must be included!");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  const body = new URLSearchParams();
  body.append("email", email);
  body.append("password", password);
  const requestOptions = {
    method: "POST",
    headers,
    body,
  };
  try {
    const response = await fetch(`${baseUrl}/api/users/signup`, requestOptions);
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

export { postTask };
