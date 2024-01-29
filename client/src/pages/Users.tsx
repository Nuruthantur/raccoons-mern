import { useEffect, useState } from 'react'
import { User } from '../@types/users';
import baseUrl from '../utils/baseurl';
import FindAUser from '../components/FindAUser';

function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = () => {
      fetch(`${baseUrl}/api/users/all`)
        .then((res) => res.json())
        .then((res) => {
          const foundUsers = res.user as User[];
          setAllUsers(foundUsers);

        })
        .catch(e => console.log(e));
    }
    fetchAllUsers()
  }, []);

  return (
    <div>
      <FindAUser />
      <h2>Here are all users:</h2>
      { allUsers.map((user) => {
        return <div key={user._id}>
          <p>{user.email}</p>
        </div>
      }) }
    </div>
  )
}

export default App