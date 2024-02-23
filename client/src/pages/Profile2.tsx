import React, { useContext, useState } from "react";
import { User } from "../@types/users";
import { AuthContext } from "../context/AuthContext.tsx";

// type User2 = {
//     user: {
//         email:string
//     }
// }
//FIXME - getProfile function not working
function Profile2() {
  // const [userProfile, setUserProfile] = useState<User>({} as User);

  // const { getProfile } = useContext(AuthContext);
  const { user, getProfile } = useContext(AuthContext);
  const [email, setEmail] = useState(user ? user.email : "");
  const [username, setUsername] = useState(user ? user.username : "");
  console.log("user", user);
  console.log("email", email);
  console.log("username", username);
  console.log(setUsername, setEmail);
  // const getProfile = async () => {
  //   ({
  //     email,
  //     username,
  //   });
  // };
  return (
    <>
      <h1>{user?.username ? user?.username : "Anonymous"}'s Profile</h1>
      {/* <button onClick={() => void getProfile()}>THIS IS A BUTTON</button> */}
      {/* <button onClick={handesubmit}>THIS IS A BUTTON</button> */}
      {user && (
        <div>
          <h3>User Info</h3>
          <p>email: {user.email}</p>
          <p>username: {user?.username}</p>
        </div>
      )}
    </>
  );
}

export default Profile2;
