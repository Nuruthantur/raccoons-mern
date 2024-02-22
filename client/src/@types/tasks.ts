export interface Task {
  _id: string;
  taskName: string;
  userId: string;
  description: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  difficulty: difficulty;
}

type difficulty = "easy" | "medium" | "hard";
