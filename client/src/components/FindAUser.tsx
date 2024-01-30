/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRef, useState } from 'react'
import { User } from '../@types/users';
import baseUrl from '../utils/baseurl';


const FindOneUser = () => {
  // console.log(baseUrl);
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const inputValue = useRef("");
  const [error, setError] = useState("");
  
  const handleClick = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault()
    setError("");
    if (!inputValue.current) return alert("you have to type something")
    try {
      const response = await fetch(`${baseUrl}/api/users/find/${inputValue.current}`)
     
      if (!response.ok) {
        const result = await response.json() as ResNotOk;
        console.log('result', result)
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
    <div className='w-full max-w-xs '>
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
    <div className="mb-4">
      <label className='block text-gray-700 text-sm font-bold mb-2'>Find a user: </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={(e) => inputValue.current = e.target.value} />
      </div>
      <div className='mb-6'>
      <button className='bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleClick}>Find User</button>
      <button className='bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={clear}>Clear</button>
      { error && <p style={{ color: "red" }}>{ error }</p> }
      { foundUser && <div>
        <h2 className='block text-gray-700 text-sm font-bold mb-2'>Found this user:</h2>
        <p>{foundUser.email}</p>
      </div> }
      </div>
      </form>
      </div>
    </>
  )
}

export default FindOneUser