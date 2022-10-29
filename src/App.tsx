import { Suspense } from 'react';
import useSWR from 'swr';

export interface TodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const Loading = () => <p>Loading...</p>;

const Page = () => {
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error } = useSWR<TodoResponse>('https://dummyjson.com/todos', fetcher, {
    suspense: true,
  });

  if (!data) {
    return <h2>데이터가 없습니다.</h2>;
  }

  return (
    <ul>
      {data.todos.map(todo => (
        <li key={todo.id}>{todo.todo}</li>
      ))}
    </ul>
  );
};

const App = () => {
  return (
    <>
      <h2>App</h2>
      <Suspense fallback={<Loading />}>
        <Page />
      </Suspense>
    </>
  );
};

export default App;
