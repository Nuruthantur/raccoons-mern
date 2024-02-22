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
  const [userProfile, setUserProfile] = useState<User>({} as User);

  const { getProfile } = useContext(AuthContext);

  return (
    <>
      <h1>
        {userProfile.username ? userProfile.username : "Anonymous"}'s Profile
      </h1>
      <button onClick={() => void getProfile()}>THIS IS A BUTTON</button>
      {userProfile && (
        <div>
          <h3>User Info</h3>
          <p>email: {userProfile.email}</p>
          <p>username: {userProfile.username}</p>
        </div>
      )}
    </>
  );
}

export default Profile2;
