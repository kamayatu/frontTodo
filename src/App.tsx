import React, { useEffect, useState } from 'react';
import './App.css';

type Post = {
  id: number;
  title: string;
  status: string;
  detail?: string;
}


function App() {
  const [data, setData] = useState<Post[] | null>(null);
  // const FetchData = () => {  
  //   useEffect(() => {
  //     fetch("http://localhost:8000/posts", {method: 'GET'})
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data)
  //     })
  //   })
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/posts");
        const json: React.SetStateAction<Post[] | null> = await res.json();
      } catch (e) {
        if(e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, []);



  return (
    <div className="App">
      <ul>
        {
          data?.map((posts) => (
            <li>{posts.title}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
