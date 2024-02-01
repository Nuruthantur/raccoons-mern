import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="relative bg-body overflow-hidden">
      <nav className="relative z-10 py-7">
        {/*nav className: flex justify-evenly gap-1 align-center */}
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between">
            <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
              <NavLink to={"/"} className="font-semibold">
                Homepage
              </NavLink>
            </div>
            <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
              <NavLink to={"/users"} className="font-semibold">
                Users
              </NavLink>
            </div>
            <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
              <NavLink to={"/testpage"} className="font-semibold ">
                About
              </NavLink>
            </div>
            {!user ? (
              <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
                <NavLink to={"/auth"} className="font-semibold ">
                  Login
                </NavLink>
              </div>
            ) : (
              <>
                <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
                  <NavLink to={"/profile"} className="font-semibold ">
                    Profile
                  </NavLink>
                </div>
                <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
                  <NavLink to={"/tasks"} className="font-semibold ">
                    Tasks
                  </NavLink>
                </div>
                <div className="inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase text-black hover:text-white bg-violet-500 hover:bg-violet-600 transition duration-200 rounded-full">
                  <button onClick={logout} className="font-semibold ">
                    Logout
                  </button>
                </div>
              </>
            )}
            {user && <p> "logged in as: "{user.email}</p>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
