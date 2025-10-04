export default interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
