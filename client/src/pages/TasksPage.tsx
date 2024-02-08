import { useEffect, useState } from "react";
import { Task } from "../@types/tasks";
import baseUrl from "../utils/baseurl";
type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};
export default function TasksPage() {
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

  return (
    <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col justify-center">
      <h1>test</h1>
      <h2>here is a list of all tasks</h2>
      <br />

      {allTasks?.map((task) => {
        return (
          <div
            key={task._id}
            className="mx-auto text-center  mt-auto mb-auto flex flex-col justify-center"
          >
            <p>{task.taskName}</p>
            <br />
            <p>{task.description}</p>
          </div>
        );
      })}
    </div>
  );

  //     {/* <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
  //       <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
  //         <div className="mb-4">
  //           <h1 className="text-grey-darkest">Todo List</h1>{" "}
  //           <div className="flex mt-4">
  //             <input
  //               className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
  //               placeholder="Add Todo"
  //             />
  //             <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
  //               Add
  //             </button>
  //           </div>
  //         </div>
  //         <div>
  //           <div className="flex mb-4 items-center">
  //             <p className="w-full text-grey-darkest">
  //               Add another component to Tailwind Components
  //             </p>
  //             <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
  //               Done
  //             </button>
  //             <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
  //               Remove
  //             </button>
  //           </div>
  //           <div className="flex mb-4 items-center">
  //             <p className="w-full line-through text-green">
  //               Submit Todo App Component to Tailwind Components
  //             </p>
  //             <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">
  //               Not Done
  //             </button>
  //             <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
  //               Remove
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div> */}
  //   </div>
  // );
}
