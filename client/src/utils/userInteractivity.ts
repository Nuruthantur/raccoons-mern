import { ResNotOk } from "../@types";
import baseUrl from "./baseurl";

const cheerTask = async (taskId: string) => {
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
      const result = await response.json();
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
export default cheerTask;
