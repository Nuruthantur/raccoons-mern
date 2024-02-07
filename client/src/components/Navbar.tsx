import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  // tabs = ["/","/users","/testpage","/auth","/profile","/tasks"]
  // const [openTab, setOpentab] = useState( count: this.props.value,
  // activeTabId: 0);

  return (
    <div className="relative bg-body ">
      <nav className="relative z-10 py-7">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between">
            <div>
              <NavLink
                to={"/"}
                className={({ isActive }) => {
                  return (
                    "inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase    rounded-full" +
                    (!isActive
                      ? "text-black bg-violet-500 hover:text-white hover:bg-violet-600 transition duration-200 rounded-full"
                      : " text-white bg-violet-600 underline")
                  );
                }}
              >
                Homepage
              </NavLink>
            </div>
            <div>
              <NavLink
                to={"/users"}
                className={({ isActive }) => {
                  return (
                    "inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase    rounded-full" +
                    (!isActive
                      ? "text-black bg-violet-500 hover:text-white hover:bg-violet-600 transition duration-200 rounded-full"
                      : " text-white bg-violet-600 underline")
                  );
                }}
              >
                Users
              </NavLink>
            </div>
            <div>
              <NavLink
                to={"/about"}
                className={({ isActive }) => {
                  return (
                    "inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase    rounded-full" +
                    (!isActive
                      ? "text-black bg-violet-500 hover:text-white hover:bg-violet-600 transition duration-200 rounded-full"
                      : " text-white bg-violet-600 underline")
                  );
                }}
              >
                About
              </NavLink>
            </div>
            {!user ? (
              <div>
                <NavLink
                  to={"/auth"}
                  className={({ isActive }) => {
                    return (
                      "inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase    rounded-full" +
                      (!isActive
                        ? "text-black bg-violet-500 hover:text-white hover:bg-violet-600 transition duration-200 rounded-full"
                        : " text-white bg-violet-600 underline")
                    );
                  }}
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <>
                <div>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) => {
                      return (
                        "inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase    rounded-full" +
                        (!isActive
                          ? "text-black bg-violet-500 hover:text-white hover:bg-violet-600 transition duration-200 rounded-full"
                          : " text-white bg-violet-600 underline")
                      );
                    }}
                  >
                    Profile
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to={"/tasks"}
                    className={({ isActive }) => {
                      return (
                        "inline-flex h-11 py-2 px-4 items-center justify-center text-sm font-medium uppercase    rounded-full" +
                        (!isActive
                          ? "text-black bg-violet-500 hover:text-white hover:bg-violet-600 transition duration-200 rounded-full"
                          : " text-white bg-violet-600 underline")
                      );
                    }}
                  >
                    Tasks
                  </NavLink>
                </div>
                <div>
                  <button onClick={logout} className="font-semibold ">
                    Logout
                  </button>
                </div>
              </>
            )}
            {user && <p> {user.email}</p>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
