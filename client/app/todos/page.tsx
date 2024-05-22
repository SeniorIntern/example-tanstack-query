'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/services';
import { Todo } from '@/types';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useRef } from 'react';
import { toast } from 'sonner';

// 1- Create a client
const queryClient = new QueryClient();

const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    // 2- Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

const TodoList = () => {
  // 3- Queries
  const {
    data: todos,
    isLoading,
    error
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => apiClient.get<Todo[]>('/todos').then((res) => res.data)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="my-8">
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="space-x-2 flex items-center list-disc">
            <Checkbox />
            <span>{todo.title}</span>
            <Badge>{todo.username}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TodoForm = () => {
  // Access the client. used for mutation
  const queryClient = useQueryClient();
  // 4- Mutations
  const mutation = useMutation({
    mutationFn: (todo: Todo) =>
      apiClient.post<Todo>('/todos', todo).then((res) => res.data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('List Updated', { id: 'announcement' });
    },
    onError: (err) => {
      toast.error(err.message, { id: 'announcement' });
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="space-x-4 w-2/4 inline-flex"
      onSubmit={(e) => {
        e.preventDefault();

        if (!inputRef.current?.value) return;

        mutation.mutate({
          id: 1,
          title: inputRef.current?.value,
          username: 'dan'
        });
      }}
    >
      <Input ref={inputRef} placeholder="I want to..." />
      <Button>Submit</Button>
    </form>
  );
};

export default function Page() {
  return (
    <QueryProvider>
      <section className="p-2">
        <TodoForm />
        <TodoList />
      </section>
    </QueryProvider>
  );
}
