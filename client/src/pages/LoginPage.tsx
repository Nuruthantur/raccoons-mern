import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type LoginCredentials = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  // useState<LoginCredentials | null>(null);
  const redirectTo = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event goes brrr :>>>", e.target.name, e.target.value);
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  // if (user) return <Navigate to={"/"} />;

  const navigate = useNavigate();
  const directUserToSignup = () => navigate("/sign-up");

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle login", loginCredentials);
    await login(loginCredentials?.email, loginCredentials?.password);
    redirectTo("/");
  };

  return (
    <>
      <div className={"flex flex-col items-center justify-center h-screen"}>
        <div className={"titleContainer"}>
          <h1 className="text-3xl">Login</h1>
          <br />
        </div>

        <div>
          <form onSubmit={(e) => void handleSubmitLogin(e)}>
            <div className={"inputContainer"}>
              <input
                name="email"
                id="email"
                type="text"
                placeholder="Enter your email here"
                value={loginCredentials?.email}
                onChange={handleInputChange}
                className={"inputBox"}
              />
              <label htmlFor="email"></label>
              {/* <label className="errorLabel">{emailError}</label> */}
            </div>
            <br />
            <div className={"inputContainer"}>
              <input
                name="password"
                id="password"
                type="text"
                placeholder="Enter your password here"
                value={loginCredentials?.password}
                onChange={handleInputChange}
                className={"inputBox"}
              />
              <label htmlFor="password"></label>
              {/* <label className="errorLabel">{passwordError}</label> */}
            </div>
            <br />
            <div className={"inputContainer"}>
              <button
                className={
                  "bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full"
                }
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3>Already a User? Sign in instead:</h3>
          <button
            className="bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
            onClick={directUserToSignup}
          >
            NAVIGATE
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
