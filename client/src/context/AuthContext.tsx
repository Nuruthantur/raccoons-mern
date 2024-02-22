import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { User } from "../@types/users";
import baseUrl from "../utils/baseurl";
import { Navigate } from "react-router-dom";
import { Task } from "../@types/tasks";

interface AuthContextType {
  user: User | null;
  task: Task | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateUser: (values: {
    email: string;
    userName?: string | undefined;
  }) => Promise<void>;

  createATask: (values: {
    name: string;
    description: string;
    userName?: string;
  }) => Promise<void>;

  updateUserWithTask: (userName: string, taskId: string) => Promise<void>;

  // getProfile: (values: { user: User }) => void;
  getProfile: (user: User) => Promise<void>;

  loading: boolean;
}

type LoginDataType = {
  user: User;
  token: string;
};

type APIResponse<T> = {
  message: string;
  error: boolean;
  data: T;
};

export type LoginResponse = {
  message: string;
  error: boolean;
  data: LoginDataType;
};

const defaultValue: AuthContextType = {
  user: null,
  task: undefined,
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
  createATask: () => {
    throw new Error("no provider");
  },
  updateUserWithTask: () => {
    throw new Error("no provider");
  },
  getProfile: () => {
    throw new Error("no provider");
  },
  loading: false,
};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | undefined>(undefined);

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

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      alert("no field must be left empty");
      return;
    }
    //create the Request for our backend
    if (email && password) {
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
            console.log("result login", result);
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
    userName: string | undefined;
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
    // localStorage.removeItem("token");
    setUser(null);
    // Navigate({ to: "/login" });
  };

  const createATask = async (values: {
    name: string;
    description: string;
    userName?: string;
  }) => {
    const taskHeaders = new Headers();
    taskHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const body = JSON.stringify(values);

    const requestOptions = {
      method: "POST",
      headers: taskHeaders,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/users/task/new`,
        requestOptions
      );
      if (!response.ok) {
        const result = (await response.json()) as ResNotOk;
        console.log(result);
      } else {
        const result = (await response.json()) as Task;
        console.log("the result :>> ", result);
        setTask(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserWithTask = async (taskId: string, userName: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.append("ID form task is ", taskId);
    body.append("ID from user is ", userName);
    var options = {
      method: "PATCH",
      headers,
      body,
    };
    try {
      const response = await fetch(
        `${baseUrl}/api/users/updateUserList`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO - move the getProfile function here
  // do a user token check in the authcontext to have the token every time the page refreshes
  const getProfile = async () => {
    const [userProfile, setUserProfile] = useState<User>({} as User);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("you have to login first");
    }
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/profile",
          requestOptions
        );
        if (response.ok) {
          const result = (await response.json()) as APIResponse<User>;
          console.log("result", result);
          setUserProfile(result.data.user);
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };
  // in the useeffect check for the token
  useEffect(() => {
    console.log("useEffect run", "color:orange");
    checkUserStatus();
  }, [user?.email]);

  return (
    <AuthContext.Provider
      value={{
        user,
        task,
        createATask,
        updateUserWithTask,
        login,
        logout,
        signup,
        updateUser,
        getProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
