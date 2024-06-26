import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const directUserToSignup = () => navigate("/sign-up");

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle login", loginCredentials);
    await login(loginCredentials?.email, loginCredentials?.password);
    //TODO - do this only if the login is successful! otherwise you'd get redirected even after a failed login
    // if (login == true) {
    //   redirectTo("/");
    // }
  };

  if (user) redirectTo("/");

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen shadow-lg">
        <div>
          <h1 className="text-3xl">Login</h1>
          <br />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => void handleSubmitLogin(e)}>
              <div className={"inputContainer"}>
                <label htmlFor="email"></label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Enter your email here"
                  value={loginCredentials?.email.trim()}
                  onChange={handleInputChange}
                  className={"inputBox"}
                />
              </div>
              <br />
              <div className={"inputContainer"}>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter your password here"
                  value={loginCredentials?.password.trim()}
                  onChange={handleInputChange}
                  className={"inputBox"}
                />
                <label htmlFor="password"></label>
              </div>
              <br />
              <div>
                <button
                  className={
                    "bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full"
                  }
                  type="submit">
                  Login
                </button>
              </div>
            </form>
            <br />
            <h3>Already a User? Sign in instead:</h3>
            <button
              className="bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
              onClick={directUserToSignup}>
              Go to signup!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
