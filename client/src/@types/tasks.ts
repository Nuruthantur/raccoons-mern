import { User, UserCredentials } from "./users";

export interface Task {
  _id: string;
  taskName: string;
  userId: { _id: string; email: string } | string;
  description: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  difficulty: difficulty;
  taskEncouragements: string[];
  taskCelebrations: string[];
}

type difficulty = "easy" | "medium" | "hard";
