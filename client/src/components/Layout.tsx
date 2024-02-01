import React from "react";
import NavBar from "./Navbar.tsx";
import "../index.css";
import Footer from "./Footer.tsx";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className="bg-gradient-to-b from-purple-700 to-purple-500 flex flex-col h-screen justify-between">
        {/* bg-gradient-to-b from-purple-700 to-purple-500  h-10 min-h-screen */}
        <NavBar />
        <div className="">{children}</div>
        <div className="h-10 bg-blue-500">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
