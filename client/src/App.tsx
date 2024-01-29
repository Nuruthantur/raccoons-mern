import { useEffect, useRef, useState } from 'react'
import './App.css'
import { User } from './@types/users'

function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [foundOneUser, setFoundOneUser] = useState<User | null>(null);

  const inputValue = useRef("");

  const handleClick = async() => {
    if (!inputValue.current) return alert("you have to type something")
    try {
      const response = await fetch(`http://localhost:8080/api/users/find/${inputValue.current}`)
      if (!response.ok) {
        const result = await response.json() as ResNotOk;
        return console.log(result)
      }
      const result = await response.json() as User;
      setFoundOneUser(result);
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    const fetchAllUsers = () => {
      fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((res) => {
        console.log("allusers response ", res);
        const foundUsers = res.user as User[];
        setAllUsers(foundUsers)
      })
      .catch(e => console.log(e));
    }
    fetchAllUsers()
  }, []);

  return (
    <div className='grid-flow-row'>
      { allUsers.map((user) => {
        return <div key={user._id}>A
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>User-ID: {user._id}</p>
        </div>
      }) }
      <label>Find a user: </label>
      <input className="text-sm text-slate-500 bg-slate-300" type="text" onChange={(e) => inputValue.current = e.target.value} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleClick}>Find a User</button>
      {foundOneUser && <div>
        <p>{foundOneUser.email}</p>
      </div> }
    </div>

  )
}

export default App
