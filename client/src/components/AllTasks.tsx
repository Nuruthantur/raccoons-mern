import { useEffect, useState } from "react";
import { Task } from "../@types/tasks";
import baseUrl from "../utils/baseurl";
type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};

function AllTasksList() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

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

  {
    allTasks?.map((task) => {
      return (
        <div className="mx-auto text-center  mt-auto mb-auto flex flex-col justify-center">
          <div
            key={task._id}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <div className="<div class=" px-6 py-4>
              <div className="font-bold text-xl mb-2">{task.taskName}</div>
              <br />
              <p className="text-gray-700 text-base">{task.description}</p>
            </div>
          </div>
        </div>
      );
    });
  }
}

export default AllTasksList;
