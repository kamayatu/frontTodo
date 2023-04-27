import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

const baseURL = "http://localhost:8000/posts";

type Post = {
  id: number;
  title: string;
  status: string;
  detail?: string;
}


function App() {
  const [data, setData] = useState<Post[] | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/posts");
  //       const json: React.SetStateAction<Post[] | null> = await res.json();
  //       setData(json)
  //     } catch (e) {
  //       if(e) {
  //         console.log(e);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    axios.get(baseURL).then(response => {
      const posts = response.data;
      setData(posts);
    });
  }, []);

  if (!data) return null;

  return (
    <div className="App">
      <ul>
        {
          data?.map((posts) => (
            <li>{posts.id}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
