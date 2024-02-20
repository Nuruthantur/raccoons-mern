import { useEffect, useState } from "react";
import { Task } from "../@types/tasks";
import baseUrl from "../utils/baseurl";
import AllTasksList from "../components/AllTasks";
import TodoItem from "../components/ToDoItem";
//styling
// import "../styling/taskspage.css";

type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};
// export default function TasksPage() {
//   const [allTasks, setAllTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     const fetchAllTasks = () => {
//       fetch(`${baseUrl}/api/tasks/all-tasks`)
//         .then((response) => response.json())
//         .then((result: AllTasksResponse) => {
//           const foundTasks = result.allTasks;
//           // const numberOfTasks = result.number;
//           console.log("result", result);
//           setAllTasks(foundTasks);
//           console.log(foundTasks);
//         })
//         .catch((e) => console.log(e));
//     };
//     fetchAllTasks();
//   }, []);

//   return (
//     <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col justify-center  h-screen">
//       <h1 className="font-bold text-xl mb-2">Here is a list of your tasks!</h1>
//       {/* <AllTasksList /> */}
//       <br />

//       {allTasks?.map((task) => {
//         return (
//           <div
//             className="mx-auto text-center  mt-auto mb-auto flex flex-col justify-center"
//             key={task._id}
//           >
//             <div className="max-w-sm rounded overflow-hidden shadow-lg">
//               <div className="px-6 py-4">
//                 <div className="font-bold text-xl mb-2">{task.taskName}</div>
//                 <br />
//                 <p className="text-gray-700 text-base">{task.description}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

// }

// function TasksPage() {
//   const [items, setItems] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     GetTodos();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const GetTodos = () => {
//     fetch(`${baseUrl}/api/tasks/all-tasks`)
//       .then((res) => res.json())
//       .then((data) => setItems(data))
//       .catch((err) => console.log(err));
//   };

//   const addItem = async () => {
//     const data = await fetch(`${baseUrl}/api/users/task/new`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         name: input,
//         completed: false,
//       }),
//     }).then((res) => res.json());
//     console.log(data);
//     await GetTodos();
//     setInput("");
//   };

//   return (
//     <div className="container">
//       <div className="heading">
//         <h1>TO-DO-APP</h1>
//       </div>

//       <div className="form">
//         <input type="text" value={input} onChange={handleChange}></input>
//         <button onClick={() => addItem()}>
//           <span>ADD</span>
//         </button>
//       </div>

//       <div className="todolist">
//         {items.map((item) => {
//           const { _id, name, completed } = item;
//           return (
//             <TodoItem
//               name={name}
//               id={_id}
//               completed={completed}
//               setItems={setItems}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

//Option 2:
function TasksPage() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log("input: ", e.target.value);
  };

  useEffect(() => {
    GetTodos();
  }, []);
  const GetTodos = () => {
    fetch(`${baseUrl}/api/tasks/all-tasks`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>
        <button>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">
        <TodoItem />
      </div>
      <div>{/* <AllTasksList /> */}</div>
    </div>
  );
}

export default TasksPage;
