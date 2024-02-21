import { Task } from "./tasks";

export interface User {
  _id: string;
  email: string;
  username?: string;
  createdAt: string;
  taskList: Task[];
}

export interface UserCredentials {
  email: string;
  password: string;
  userName: string;
  userImage?: string;
}
