import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import baseUrl from "../../../utils/baseurl";
import Button from "../Button";

interface Task {
  _id: string;
  taskName: string;
  userId: string;
  description: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  user: {
    _id: string;
    email: string;
    username?: string;
    tasks?: string;
  };
}

export function CreateTask() {
  const { user, task, updateUserWithTask } = useContext(AuthContext);
  const [allTasks, setAlltasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [userId, setUserId] = useState(user?._id);
  const [taskId, setTaksId] = useState("");

  const handleChange = async () => {
    console.log("taskId and user?._id go here", taskId, user?._id);
    await updateUserWithTask(taskId, user?._id!);
  };

  const handleTaskChange = (event: React.FormEvent<HTMLDivElement>) => {
    const selectedTaskId = event.target.value;
    setTaksId(selectedTaskId);
    const task = allTasks.find((t) => t._id === selectedTaskId);
    setSelectedTask(task);
  };

  useEffect(() => {
    const getAllTasks = () => {
      fetch(`${baseUrl}/api/tasks/all-tasks`)
        .then((response) => response.json())
        .then((response) => {
          const result = response;
          console.log("result goes here", result);
          const foundTask = result.allTasks as Task[];
          console.log("res found task goes here", result.allTasks);

          console.log("result from all tasks goes here", allTasks);
          console.log("found", foundTask);

          setAllTasks(foundTask);
        })
        .catch((e) => console.log(e));
    };
    getAllTasks();
  }, []);

  if (user)
    return (
      <div className="content-container">
        <form
          style={{ width: "400px" }}
          className="d-flex justify-content-center"
        >
          <div className="d-flex justify-content-center">
            <h3 className="d-flex justify-content-center">
              Create a Player Card
            </h3>
            <div className="pb-4 pt-5">
              <div
                aria-label="Floating label select example"
                onChange={handleTaskChange}
              >
                <option>Select a Task</option>
                {allTasks &&
                  allTasks.map((task) => {
                    return (
                      <option value={task._id} key={task._id}>
                        {task.taskName}
                      </option>
                    );
                  })}
              </div>
              {selectedTask && (
                <div className="d-flex row justify-content-center pt-5">
                  <h3 className="d-flex justify-content-center">
                    {selectedTask.taskName}
                  </h3>
                  <p className="d-flex justify-content-center">
                    <b className="pe-2">Value:</b>
                    {selectedTask.description}
                  </p>

                  <button onClick={handleChange}>Create a new task</button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
}

// code from postman from here:
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// const urlencoded = new URLSearchParams();
// urlencoded.append("taskName", "go for a walk");
// urlencoded.append("difficulty", "easy");
// urlencoded.append("user", "65d388f1e26712e49bc069b2");

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: "follow",
// };

// fetch("http://localhost:8080/api/users/task/new", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
