import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"


const Profile = () => {
    const { user, updateUser} = useContext(AuthContext);
    const [ email, setEmail] = useState(user ? user.email : "");
    const [username, setUsername] = useState(user ? (user.username !== undefined ? user.username : "") : "");

    console.log("username", username)

    const handleSubmit = async() => {
        await updateUser({email, username});
    }

    if (user) return (
        <div>
            <h1>{user.username ? user.username : "Anonymous"}'s Profile</h1>
        <input 
            type="email" 
            value={email} 
            placeholder={user.email} 
            onChange={(e) => setEmail(e.target.value)} />
        <input 
            type="text" 
            value={username} 
            placeholder={user.username ? user.username : "Choose a Username"} 
            onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleSubmit}>Update Profile!</button>
        </div>
    )
}

export default Profile