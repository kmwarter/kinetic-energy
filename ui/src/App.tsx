import './App.css';

import { useQuery } from '@tanstack/react-query';

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const result = await fetch('http://localhost:4000').then((res) => res.json());
      console.log('RESULT', result.data);
      return result;
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <div className="App">Data: {data.message}</div>;
}

export default App;
