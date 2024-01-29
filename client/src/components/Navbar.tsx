import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const navContainerStyles = {
    height: "50px",
    border: "solid 1px black",
    display: "flex",
    gap: "1em",
    alignItems: "center",
    padding: "0 1em",
  };

  const { user, logout } = useContext(AuthContext);
  return(
    <nav style={navContainerStyles}>
        <NavLink to={"/"}>Homepage</NavLink>
        <NavLink to={"/users"}>Users</NavLink>
        <NavLink to={"/testpage"}>Test</NavLink>
        { !user ? 
            <NavLink to={"/auth"} >Login</NavLink> :
            <>
            <NavLink to={"/profile"}>Profile</NavLink>
            <button onClick={logout}>Logout</button>
            </>
        }
        { user && <p>{user.email}</p> }
    </nav>
  )
  }  
//   return (
//     <nav style={navContainerStyles}>
//       <NavLink to={"/"}>Homepage</NavLink>
//       <NavLink to={"/users"}>Users</NavLink>
//       <NavLink to={"/testpage"}>Test</NavLink>
//       { !user ? 
//         <NavLink to={"/auth"} >Login</NavLink> :
//         <>
//           <NavLink to={"/profile"}>Profile</NavLink>
//           <button onClick={logout}>Logout</button>
//         </>
//       }
//     </nav>
//   );
// }

export default NavBar;
