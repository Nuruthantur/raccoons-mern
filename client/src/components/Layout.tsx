import React from "react";
import NavBar from "./Navbar.tsx";
import "../index.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className="max-w-30">
        {/* bg-gradient-to-b from-purple-700 to-purple-500 p-4 */}
        <NavBar />
        <div className="bg-gradient-to-b from-purple-700 to-purple-500 p-4">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
