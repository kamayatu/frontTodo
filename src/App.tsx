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
  const [completeTodos, setCompleteTodos] = useState<Post[] | null>([{
    id: 200,
    title: "none",
    status: "complete"
  }]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputDetail, setInputDetail] = useState("");

  const onChangeTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => 
    setInputTitle(e.target.value);

  const onChangeStatus = (e: { target: { value: React.SetStateAction<string>; }; }) => 
    setInputStatus(e.target.value);
  
  const onChangeDetail = (e: { target: { value: React.SetStateAction<string>; }; }) => 
    setInputDetail(e.target.value);

  const onClickAdd = () => {
    console.log(inputTitle + inputStatus + inputDetail);
  }

  useEffect(() => {
    axios.get(baseURL)
    .then(res => {
      const posts = res.data;
      setData(posts);
    });
  }, []);

  if (!data) return null;

  return (
    <>
      <div className="input-area">
        <input placeholder="タイトル" value={inputTitle} onChange={onChangeTitle}/>
        <input placeholder="ステータス" value={inputStatus} onChange={onChangeStatus} />
        <input placeholder="詳細" value={inputDetail} onChange={onChangeDetail}/>
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTodo</p>
        <ul>
          {data.map((post) => (
              <li key={post.id} className="list-row">
                <p>{post.title}</p>
                <button>完了</button>
                <button>削除</button>
              </li>
          ))}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTodo</p>
        <ul>
          {completeTodos?.map((complete) => (
              <li className="list-row" key={complete.id}>
              <p>{complete.title}</p>
              <button>戻す</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
