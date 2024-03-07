import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { User } from "../@types/users.ts";
import { AuthContext } from "../context/AuthContext.tsx";
import { BiPhone, BiEnvelope, BiMap } from "react-icons/bi";
import DropdownMenu from "../components/shared/DropdownMenu.tsx";
import { UploadFileResponse } from "../@types/index.ts";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button.tsx";
import baseUrl from "../utils/baseurl.ts";

//TODO - you can send a file to multer but it is not displayed lol; create logic to handle this ^^

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [email, setEmail] = useState(user ? user.email : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("button was clicked");
    deleteAccount();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser({
      email,
      username,
      // userImage,
    });
  };
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || "");
  };
  const handleSubmitFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    console.log("selectedFile :>> ", selectedFile);
    formdata.append("userImage", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/uploadPicture",
        requestOptions
      );
      if (!response.ok) {
        console.log("something went wrong!");
      }
      if (response.ok) {
        const result = (await response.json()) as UploadFileResponse;
        console.log("result", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteAccount = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${baseUrl}api/users/deleteAccount`,
        requestOptions
      );
      if (!response.ok) {
        console.log("something went wrong!");
      }
      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (!user) {
    return navigate("/login");
  }
  if (user) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4 ">
            <DropdownMenu />
            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            ></div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src=""
              alt="Userprofile image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user?.username ? user?.username : user?.email}'s Profile
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Here could be some more info about the user...
            </span>
            <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Message
              </a>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div>
              {user && (
                <div>
                  <h3 className="text-gray-900 dark:text-white">Your Info:</h3>
                  <br />
                  <p className="text-gray-900 dark:text-white">
                    Your Email: {user.email}
                  </p>
                  <br />
                  <p className="text-gray-900 dark:text-white">
                    Your Username:{" "}
                    {user?.username
                      ? user?.username
                      : "you have no username yet"}
                  </p>
                </div>
              )}
              <br />
              <form onSubmit={handleSubmit}>
                <h1 className="text-gray-900 dark:text-white flex justify-center">
                  Change your Username
                </h1>
                {/* change email goes here*/}
                {/* <br />
              <div>
                <label htmlFor="Email"></label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div> */}
                <br />
                <div className="flex justify-center">
                  <label htmlFor="Username"></label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <br />
                <div className="flex justify-center">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Change Username
                  </button>
                </div>
              </form>
              <br />
              <form onSubmit={handleSubmitFile}>
                <h1 className="text-gray-900 dark:text-white flex justify-center">
                  Upload a profile picture!
                </h1>

                <br />

                <div className="flex justify-center">
                  <input
                    type="file"
                    name="fileUpload"
                    id="fileUpload"
                    onChange={(e) => {
                      console.log("event", e.target.files);
                      if (e.target.files) setSelectedFile(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="flex justify-center inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </form>
              <Button label="Delete Account" onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
