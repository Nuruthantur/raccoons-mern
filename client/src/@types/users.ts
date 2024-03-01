import { Task } from "./tasks";

export interface User {
  _id: string;
  email: string;
  username?: string;
  createdAt: string;
  taskList: Task[];
  userImage?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  username: string;
  userImage?: string;
}
