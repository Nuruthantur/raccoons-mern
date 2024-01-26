import { useEffect, useState } from 'react'
import './App.css'
import { User } from './@types/users'

function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // const [foundUser, setFounduser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAllUsers = () => {
      fetch("http://localhost:8080/api/users/all")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const foundUsers = res as User[];
        setAllUsers(foundUsers)
      })
      .catch(e => console.log(e));
    }
    fetchAllUsers()
  }, []);

  return (
    <div>
    
      { allUsers.map( (user) => {
        return <div key={user._id}>
          <p>{user.email}</p>
        </div>
      }) }
      
    </div>

  )
}

export default App
