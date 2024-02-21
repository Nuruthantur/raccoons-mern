import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UserCredentials } from "../@types/users";
// import AuthForm from "../components/AuthForm";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type RegisterResponse = {
  message: string;
  error: boolean;
  data: {
    user: UserCredentials;
  };
};

const Signup = () => {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to={"/"} />;
  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(null);

  const navigate = useNavigate();
  const directUser = () => navigate("/login");

  const handleInputCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...(userCredentials as UserCredentials),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    if (userCredentials) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", userCredentials.email);
      urlencoded.append("password", userCredentials.password);
      urlencoded.append("userName", userCredentials.userName);
      urlencoded.append(
        "userImage",
        userCredentials?.userImage
          ? userCredentials.userImage
          : "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
      );
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/signup?",
          requestOptions
        );
        const result = (await response.json()) as RegisterResponse;
        console.log("result :>> ", result);
      } catch (error) {
        console.log("error :>> ", error);
      }
    } else {
      console.log("enter required fields first");
    }
  };

  return (
    // "flex flex-col items-center justify-center h-screen"
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl">Sign up</h1>
        <br />
      </div>

      <div className="flex flex-col  ">
        <div className="flex flex-col items-center justify-center">
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => void handleSubmitRegister(e)}
          >
            <div>
              <label htmlFor="email"></label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputCredentialsChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInputCredentialsChange}
              />
            </div>
            <br />
            <button className="bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full">
              Register
            </button>
          </form>
          <br />
          <h3>Already a User? Sign in instead:</h3>

          <button
            className="bg-purple-800 hover:bg-purple-900 duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
            onClick={directUser}
          >
            Go to login page!
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
