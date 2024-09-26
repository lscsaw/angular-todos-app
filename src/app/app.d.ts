export type Todo = {
  id: number;
  name: string;
  description?: string;
  creator: {
    name: string;
  };
  createdAt: Date;
  status: 'TODO' | 'DONE';
};
