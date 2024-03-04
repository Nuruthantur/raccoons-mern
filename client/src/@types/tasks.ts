import { User, UserCredentials } from "./users";

export interface Task {
  _id: string;
  taskName: string;
  userId: string;
  description: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  difficulty: difficulty;
  taskEncouragements: string[];
  taskCelebrations: string[];
  // taskEncouragements: Array<User["_id"]>;
  // taskCelebrations: Array<User["_id"]>;
}

type difficulty = "easy" | "medium" | "hard";
