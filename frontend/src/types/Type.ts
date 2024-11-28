export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  isCompleted: boolean;
};

export type User = {
  userName: string;
  password: string;
};
