import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to={"/"} />;

  const navigate = useNavigate;
  const directUserToSignup = () => navigate("/users");

  return (
    <div>
      <div>
        <form action="">
          <input type="userName" name="userName" id="userName" />
          <label htmlFor="userName">User Name</label>{" "}
          <input type="email" name="email" id="email" />
          <label htmlFor="email">Email</label>
          <input type="password" name="password" id="password" />
          <label htmlFor="password">Password</label>
          <button>Register</button>
        </form>
        <h3>Already a User? Sign in instead:</h3>
        // <button onClick={directUserToSignup}>NAVIGATE</button>
      </div>
    </div>
  );
};

export default LoginPage;
