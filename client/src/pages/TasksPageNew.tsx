import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import baseUrl from "../utils/baseurl";
import TodoItem from "../components/ToDoItem";
import AllTasksList from "../components/AllTasks";
import { Task } from "../@types/tasks";
import TasksPage from "./TasksPage";
import { Button } from "../components/ui/button";
import { User } from "../@types/users";
import { AuthContext } from "../context/AuthContext";
type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};
type TaskResponse = {
  message: string;
  error: boolean;
  data: Task;
};

type NewTaskType = {
  taskName: string;
  description: string;
};

export interface IDropdownOption {
  label: string | number;
  labelValue: string | number;
}

interface IDropdownProps {
  name?: string;
  options: IDropdownOption[];
  required?: boolean;
  tabIndex?: number;
  className?: string;
  type?: string;
  placeHolder?: string;
  labelName?: string;
}

function TaskPage() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTaskType>({} as NewTaskType);

  useEffect(() => {
    const fetchAllTasks = () => {
      fetch(`${baseUrl}/api/tasks/all-tasks`)
        .then((response) => response.json())
        .then((result: AllTasksResponse) => {
          const foundTasks = result.allTasks;
          // const numberOfTasks = result.number;
          console.log("result", result);
          setAllTasks(foundTasks);
          console.log(foundTasks);
        })
        .catch((e) => console.log(e));
    };
    fetchAllTasks();
  }, []);

  // const addItem = async () => {
  //   // const myHeaders = new Headers();
  //   // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //   // const urlencoded = new URLSearchParams();
  //   // urlencoded.append("taskName", "");
  //   // urlencoded.append("difficulty", "");
  //   const data = await fetch(`${baseUrl}/api/users/task/new`, {
  //     // const urlencoded = new URLSearchParams();
  //     // urlencoded.append("taskName", "go for a walk");
  //     // urlencoded.append("difficulty", "easy");
  //     // const requestOptions = {
  //     //   method: "POST",
  //     //   headers: myHeaders,
  //     //   body: urlencoded,
  //     //   redirect: "follow"
  //     // };
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: input,
  //       // completed: false,
  //     }),
  //   }).then((result) => result.json());
  //   console.log(data);
  //   // GetTodos();
  //   setInput("");
  // };

  const addItem2 = async (newTaskInputs: NewTaskType) => {
    //create the Request for our backend
    //REVIEW create logic to check existing fields before submit

    if (!newTaskInputs.taskName) {
      alert("Task must have a name");
      return;
    }

    if (true) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("taskName", newTaskInputs.taskName);
      urlencoded.append("description", newTaskInputs.description);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `${baseUrl}/api/users/task/new`,
          requestOptions
        );
        if (!response.ok) {
          // console.log("response not ok", response);
          const result = await response.json();
          console.log("result ", result);
        }

        if (response.ok) {
          const result = (await response.json()) as TaskResponse;
          console.log("result ", result);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };
  //change the div to a form and create a form submit button (don't forget the e: prevent default or it will trigger a reload of the page)
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e);
    setOpen(!open);
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("newTask :>> ", newTask);
    addItem2(newTask);
    // console.log("form submit has run", e);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("handleInputChange runs", e.target.name, e.target.value);
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  //TODO - create a dropdown menu to choose the difficulty level for a task
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="heading flex flex-col justify-center">
          <h1>Create a new task</h1>
          <br />
        </div>
        <form onSubmit={(e) => void handleFormSubmit(e)}>
          <div className="form">
            <div>
              <input
                name="taskName"
                id="taskName"
                type="text"
                placeholder="Enter a task name"
                onChange={handleInputChange}
                className={"inputBox"}
                value={newTask.taskName}
              ></input>
            </div>
            <br />

            <div>
              <input
                name="description"
                id="description"
                type="text"
                placeholder="Enter a description "
                onChange={handleInputChange}
                className={"inputBox"}
                value={newTask.description}
              />
            </div>
            <div>
              <button onClick={handleOpen}>Difficulty</button>
              {open ? (
                <div>
                  <ul>
                    <li>1{user && user._id}</li>
                    <li>2</li>
                    <li>3</li>
                  </ul>
                </div>
              ) : (
                <div>Is Closed</div>
              )}
            </div>

            <button
              className="bg-purple-800 hover:bg-purple-900 duration-300 py-2 px-4  sm:w-50 md:w-56 lg:w-64 font-[Poppins]
           rounded-md text-white"
            >
              add task
            </button>
          </div>
        </form>
      </div>

      {/* get the users tasks and not all tasks! */}
      <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col justify-center  h-screen">
        <h1 className="font-bold text-xl mb-2">
          Here is a list of your tasks!
        </h1>
        {/* <AllTasksList /> */}
        <br />

        {user &&
          user.taskList.map((task) => {
            return (
              <div
                className="mx-auto text-center  mt-auto mb-auto flex flex-col justify-center"
                key={task._id}
              >
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {task.taskName}
                    </div>
                    <br />
                    <p className="text-gray-700 text-base">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* <div className="todolist">
        {items.map((item) => {
          const { _id, name, completed } = item;
          return (
            <TodoItem
              name={name}
              id={_id}
              completed={completed}
              setItems={setItems}
            />
          );
        })}
      </div> */}
    </>
  );
}

export default TaskPage;
