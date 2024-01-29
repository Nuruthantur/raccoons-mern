import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css"

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  return(
    <nav className="flex justify-evenly gap-1 align-center">
        <NavLink to={"/"} className="font-semibold hover:text-gray-600">Homepage</NavLink>
        <NavLink to={"/users"} className="font-semibold hover:text-gray-600">Users</NavLink>
        <NavLink to={"/testpage"} className="font-semibold hover:text-gray-600">Test</NavLink>
        { !user ? 
            <NavLink to={"/auth"} className="font-semibold hover:text-gray-600">Login</NavLink> :
            <>
            <NavLink to={"/profile"} className="font-semibold hover:text-gray-600">Profile</NavLink>
            <button onClick={logout} className="font-semibold hover:text-gray-600">Logout</button>
            </>
        }
        { user && <p>{user.email}</p> }
    </nav>
  )
  }  

export default NavBar;
