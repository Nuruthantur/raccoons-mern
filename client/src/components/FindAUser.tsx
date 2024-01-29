/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from 'react'
import { User } from '../@types/users';
import baseUrl from '../utils/baseurl';


const FindOneUser = () => {
  console.log(baseUrl);
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const inputValue = useRef("");
  const [error, setError] = useState("");
  
  const handleClick = async() => {
    setError("");
    if (!inputValue.current) return alert("you have to type something")
    try {
      const response = await fetch(`${baseUrl}/api/users/find/${inputValue.current}`)
      if (!response.ok) {
        const result = await response.json() as ResNotOk;
        setError(result.error)
        return console.log(result);
      }
      const result = await response.json() as User;
      setFoundUser(result);
    } catch (error) {
      console.log(error);
      setError("Something went wrong...")
    }
  }

  const clear = () => {
    setFoundUser(null);
    setError("");
    inputValue.current = "";
    const input: HTMLInputElement | null = document.querySelector("input[type='text']");
    if (input) input.value = "";
  }
  return (
    <>
      <h1>Find A User!</h1>
      <label>Find a user: </label>
      <input type="text" onChange={(e) => inputValue.current = e.target.value} />
      <button onClick={handleClick}>Find User</button>
      <button onClick={clear}>Clear</button>
      { error && <p style={{ color: "red" }}>{ error }</p> }
      { foundUser && <div>
        <h2>Found this user:</h2>
        <p>{foundUser.email}</p>
      </div> }
    </>
  )
}

export default FindOneUser