import { useEffect, useState } from "react";
import { User } from "../@types/users";
import baseUrl from "../utils/baseurl";
import FindOneUser from "../components/FindAUser";

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
        .catch((e) => console.log(e));
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <FindOneUser />
      </div>
      {/* <FindOneUser /> */}
      <h2>Here's a list of all subscribed users:</h2>
      {allUsers.map((user) => {
        return (
          <div key={user._id}>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
