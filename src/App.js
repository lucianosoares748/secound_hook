/* eslint-disabled */
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import './App.css';

const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('EFFECT', new Date().toLocaleString());
    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const response = await fetch(url, options);
        const jsonResult = await response.json();
        setResult(jsonResult);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };

    fetchData();
  }, [url, options]);

  return [result, loading];
};

export const App = () => {
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && result) {
    console.log(result);
  }
  return (
    <div>
      <h1>Oi</h1>
    </div>
  );
};

export default App;
