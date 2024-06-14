'use client';

import {
  keepPreviousData,
  useInfiniteQuery
} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoQuery = {
  pageSize: number;
};

const useTodos = (query: TodoQuery) =>
  useInfiniteQuery<Todo[], Error>({
    queryKey: ['posts', query],
    queryFn: ({ pageParam }) =>
      axios
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
          params: {
            _start:
              typeof pageParam === 'number'
                ? (pageParam - 1) * query.pageSize
                : pageParam,
            _limit: query.pageSize
          }
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, //1m
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

export default function Page() {
  const pageSize = 30;
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useTodos({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;
  console.log('data===', data?.pages);

  if (!data?.pages) return <p>Loading...</p>;

  const fetchedTodos =
    data?.pages.reduce((total, page) => total + page.length, 0) || 0;

  return (
    <div>
      <p className="text-2xl text-center">Todo List</p>
      <p>current data length: {fetchedTodos}</p>
      <div className="border border-black">
        <InfiniteScroll
          dataLength={fetchedTodos}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          loader={<p>Loading...</p>}
        >
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((todo) => (
                <p key={todo.id} className="space-x-2">
                  <span>id: {todo.id}</span>
                  <span>{`userId: ${todo.userId} , title: ${todo.title}`}</span>
                </p>
              ))}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
