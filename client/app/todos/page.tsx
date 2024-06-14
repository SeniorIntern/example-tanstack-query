'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Page() {
  const getTodos = () =>
    axios
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.data);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <p className="text-2xl text-center">Todo List</p>
      <ul className="list-decimal list-inside p-2">
        {data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}
