import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

const baseURL = "http://localhost:8000/posts";

type Post = {
  id: number;
  title: string;
  status: any;
  detail?: string;
}


function App() {
  const [data, setData] = useState<Post[]>([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDetail, setInputDetail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [editIndex, setEditIndex] = useState<number>()
  const [isDetailing, setIsDetailing] = useState(false);
  const [filter, setFilter] = useState('notStarted');
  const [filteredTodos, setFilteredTodos] = useState<Post[]>([]);


  const onChangeTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => 
    setInputTitle(e.target.value);
  
  const onChangeDetail = (e: { target: { value: React.SetStateAction<string>; }; }) => 
    setInputDetail(e.target.value);

  const onEditTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEditTitle(e.target.value)
  }

  const onEditDetail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEditDetail(e.target.value)
  }

  const onClickAdd = () => {

    //todo作成
    function createPost() {
    if(inputTitle === "") return;
      axios
        .post(baseURL, {
          title: inputTitle,
          status: 'notStarted',
          detail: inputDetail,
        })
        .then((res) => {
          // console.log(data);
          setData([res.data, ...data])
        })
    }
    createPost()
    setInputTitle("");
    setInputDetail("");
  }
  //削除
  const onClickDelete = (index:number) => {
    function deletePost() {
      axios
        .delete(`${baseURL}/${index}`)
        .then(() => {
          alert("Post deleted!")
        });
    }
    deletePost();
  }

  //編集ボタン
  const onClickEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
  }

  //編集キャンセル
  const cancelEdit = () => {
    setIsEditing(false);
  }

  //編集完了ボタン
  const completeEdit = () => {
    axios
      .put(`${baseURL}/${editIndex}`, {
        title: editTitle,
        detail: editDetail,
      })
      .then((res) => {
        setData([...data, res.data])
      });
    setEditTitle("")
    setEditDetail("")
    cancelEdit();
  }

  //詳細表示
  const openDetail = () => {
    setIsDetailing(true);
  }

  //詳細を閉じる
  const closeDetail = () => {
    setIsDetailing(false);
  }

  //ステータスの変更
  const onChangeStatus = (e: any, targetPost: any) => {
    axios
    .put(`${baseURL}/${targetPost.id}`, {
      status: e.target.value
    })
    // .then((res) => {
    //   setData([...data, res.data])
    // });
  }

  //絞り込み機能
  useEffect(() => {
    const filteringTodos = () => {
      switch(filter) {
        case 'notStarted':
          setFilteredTodos(data.filter((post) => 
            post.status === 'notStarted'
          ))
          break;
        case 'inProgress':
          setFilteredTodos(data.filter((post) => 
            post.status === 'inProgress'
          ))
          break;
          case 'done':
            setFilteredTodos(data.filter((post) => 
              post.status === 'done'
            ))
            break;
        default :
        setFilteredTodos(data);
      }
    }
    filteringTodos();
  },[filter, data])

  //データベースからデータ取得
  useEffect(() => {
    axios.get(baseURL)
    .then(res => {
      const posts = res.data;
      setData(posts);
    });
  },[data]);

  if (!data) return null;

  return (
    <>
      <div className="input-area">
        {isEditing? (
        <>
          <input placeholder="新タイトル" value={editTitle} onChange={onEditTitle}></input>
          <input placeholder="新詳細" value={editDetail} onChange={onEditDetail}></input>
          <button onClick={completeEdit}>編集</button>
          <button onClick={cancelEdit}>キャンセル</button>
        </>
        ) : (
        <>
          <input placeholder="タイトル" value={inputTitle} onChange={onChangeTitle}/>
          <input placeholder="詳細" value={inputDetail} onChange={onChangeDetail}/>
          <button onClick={onClickAdd}>追加</button>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">すべて</option>
            <option value="notStarted">未着手</option>
            <option value="inProgress">作業中</option>
            <option value="done">完了</option>
          </select>
        </>
        )}



      </div>
      <div className="incomplete-area">
        <p className="title">Todoリスト</p>
        <ul>
          {filteredTodos.map((post) => (
              <li key={post.id} className="list-row">
                <p>{post.title}</p>
                <select value={post.status} onChange={(e) => onChangeStatus(e, post)}>
                  <option value="notStarted">未着手</option>
                  <option value="inProgress">作業中</option>
                  <option value="done">完了</option>
                </select>
                <button onClick={() => onClickDelete(post.id)}>削除</button>
                <button onClick={() => onClickEdit(post.id)}>編集</button>
                <button onClick={() => openDetail()}>詳細</button>
                {isDetailing? (
                <>
                  <br />
                  <button onClick={closeDetail}>閉じる</button>
                  <p>{post.detail}</p>
                </>
                ) : (<></>)}
              </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
