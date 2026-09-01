import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
import {useUsers} from './Users.hooks'

function User({name}) {
  return <li style={{ padding: '8px' }}>{name}</li>
}

const getUsers= async()=>{
    const response = await fetch('/api/users')
    console.log(response)
    const body = response.json()
    return body
  }

useEffect(() => {
  getUsers()
  .then((data)=>{
    const users = data.users.map((user) => user.name)
    return users;
  })
  .then((users)=>setUsers(users))
  .catch((error)=>console.error(error))
},[counter])

  const submit = () =>{
    const newUSers = [...users,inputText];
    setUsers(newUSers)
  }

  const addCounter = () =>{
    setCounter(counter+1)
  }

function Users() {
  const {users,setInputText,submit,addCounter} = useUsers()

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUsers = [...users, inputText]
    setUsers(newUsers)
  }

  const handleChange = (event) => {
    setInputText(event.target.value);
    submit()
    // console.log('handle change',event.target.value)
 
  }
  const userList = users.map((user) => {
    return <User key={user} name={user}></User>
  });
  return (
    users,
    setInputText,
    submit,
    addCounter,
    <div className="App">
      <ul>
        {userList}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">追加</button>
      </form>
      <div>入力値:{inputText}</div>
      <button onClick={()=>setCounter(counter+1)}>更新</button>
    </div>
  );
}

export default Users;
