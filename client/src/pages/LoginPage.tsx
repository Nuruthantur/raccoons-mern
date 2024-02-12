import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { user } = useContext(AuthContext);
  if (user) return <Navigate to={"/"} />;

  const navigate = useNavigate();
  const directUserToSignup = () => navigate("/sign-up");

  return (
    <div className={"flex flex-col items-center justify-center h-screen"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          // onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
      <h3>Already a User? Sign in instead:</h3>
      <button
        className="bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
        onClick={directUserToSignup}
      >
        NAVIGATE
      </button>
    </div>
  );
};

export default LoginPage;
