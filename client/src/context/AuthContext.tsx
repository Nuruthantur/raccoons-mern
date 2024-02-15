import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { User } from "../@types/users";
import baseUrl from "../utils/baseurl";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateUser: (values: {
    email: string;
    username: string | undefined;
  }) => Promise<void>;
  loading: boolean;
}
type LoginDataType = {
  user: User;
  token: string;
};

type LoginResponse = {
  message: string;
  error: boolean;
  data: LoginDataType;
};

const defaultValue: AuthContextType = {
  user: null,
  login: () => {
    throw new Error("no provider");
  },
  logout: () => {
    throw new Error("no provider");
  },
  signup: () => {
    throw new Error("no provider");
  },
  updateUser: () => {
    throw new Error("no provider");
  },
  loading: false,
};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email: string, password: string) => {
    // check if a user with that email address already exists!
    if (!email || !password) return alert("All fields must be included!");
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.append("email", email);
    body.append("password", password);
    const requestOptions = {
      method: "POST",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/users/signup`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as User;
        setUser(result);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // OLD LOGIN FUNCTION
  // const login = async (email: string, password: string) => {
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/x-www-form-urlencoded");
  //   const body = new URLSearchParams();
  //   body.append("email", email);
  //   body.append("password", password);
  //   const requestOptions = {
  //     method: "POST",
  //     headers,
  //     body,
  //   };
  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/users/login`,
  //       requestOptions
  //     );
  //     if (response.ok) {
  //       const result = (await response.json()) as User;
  //       setUser(result);
  //       console.log(result);
  //     } else {
  //       const result = (await response.json()) as ResNotOk;
  //       console.log(result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const login = async (email: string, password: string) => {
    // if (!email || !password) {
    //   alert("some fields are  missing");
    //   return;
    // }
    //create the Request for our backend
    // if (email && password) {
    if (true) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `${baseUrl}/api/users/login`,
          requestOptions
        );

        if (!response.ok) {
          //handle not Ok response here
          console.log("response not ok", response);
          const result = await response.json();
          console.log("result ", result);
        }

        if (response.ok) {
          const result = (await response.json()) as LoginResponse;
          console.log("result ", result);

          if (result.data.token) {
            // Store token in local storage
            localStorage.setItem("token", result.data.token);

            setUser(result.data.user);
          }
          //set our user information
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  const checkUserStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("user is logged in");
    } else {
      console.log("No user");
    }

    //write a request to our backend to get the user information back when whe refresh
  };

  const updateUser = async (values: {
    email: string;
    username: string | undefined;
  }) => {
    //validation - check email format etc.
    if (!user) return;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(values);
    const requestOptions = {
      method: "POST",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/users/update/${user._id}`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as User;
        setUser(result);
      } else {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    console.log("%c useEffect run", "color:orange");
    checkUserStatus();
  }, [user?.email]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
