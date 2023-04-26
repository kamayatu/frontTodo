import React, { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [data, setData] = useState([]);
  const FetchData = () => {  
    useEffect(() => {
      fetch("http://localhost:8000/posts", {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
    })
  }
  return (
    <div className="App">
      <ul>
        {
          data.map(post => <li key={post}>{post}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
