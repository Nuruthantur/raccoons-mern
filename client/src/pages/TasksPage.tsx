import React, { useEffect, useRef, useState } from "react";
import { Task } from "../@types/tasks";
import baseUrl from "../utils/baseurl";
// import AllTasksList from "../components/AllTasks";
import TodoItem from "../components/ToDoItem";
// import { ArrowDownIcon } from "Icons";
// import cx from "classnames";
//styling
// import "../styling/taskspage.css";

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
    <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col flex-wrap justify-center  h-screen">
      <div>
        <h1 className="font-bold text-xl mb-2">
          Here is a list of your tasks!
        </h1>
        <br />
        <p>number of tasks: {allTasks.length}</p>
        <br />
      </div>

      {allTasks?.map((task) => {
        return (
          <div
            className="mx-auto text-center mt-auto mb-auto flex flex-row flex-wrap justify-center"
            key={task._id}
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{task.taskName}</div>
                <br />
                <p className="text-gray-700 text-base">{task.description}</p>
                <p className="text-gray-700 text-base">{task.userId}</p>
                <p className="text-gray-700 text-base">{task.completed}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
//todo - add a boxshadow for every created card

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

//Option 2: this should work
// function TasksPage() {
//   const [items, setItems] = useState([]);
//   const [input, setInput] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//     console.log("input: ", e.target.value);
//   };

//   useEffect(() => {
//     GetTodos();
//   }, []);
//   const GetTodos = () => {
//     fetch(`${baseUrl}/api/tasks/all-tasks`)
//       .then((res) => res.json())
//       .then((data) => setItems(data))
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div className="container">
//       <div className="heading">
//         <h1>TO-DO-APP</h1>
//       </div>

//       <div className="form">
//         <input type="text" value={input} onChange={handleChange}></input>
//         <button>
//           <span>ADD</span>
//         </button>
//       </div>

//       <div className="todolist">
//         <TodoItem />
//       </div>
//       <div>{/* <AllTasksList /> */}</div>
//     </div>
//   );
// }
// export default TasksPage;

// export interface IDropdownOption {
//   label: string | number;
//   labelValue: string | number;
// }

// interface IDropdownProps {
//   name?: string;
//   options: IDropdownOption[];
//   required?: boolean;
//   tabIndex?: number;
//   className?: string;
//   type?: string;
//   placeHolder?: string;
//   labelName?: string;
// }

// function Dropdown({
//   labelName,
//   name,
//   options,
//   placeHolder,
//   type,
//   required,
//   className,
//   tabIndex,
// }: IDropdownProps) {
//   const [isFocused, setIsFocused] = React.useState(false);
//   const [selectedItem, setSelectedItem] = React.useState<number | string>();
//   const wrapperRef = useRef<any>(null);

//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setIsFocused(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [wrapperRef]);

//   const onValueChange = (selectedValue: string | number) => {
//     setSelectedItem(selectedValue);
//     setIsFocused(false);
//   };
//   React.useEffect(() => {
//     setIsFocused(false);
//   }, [selectedItem]);

//   const onClear = (e: any) => {
//     e.stopPropagation();
//     setSelectedItem(placeHolder);
//     setIsFocused(false);
//   };

//   return (
//     <div ref={wrapperRef} className="border-[#979797] relative">
//       {" "}
//       <div className="flex flex-row items-center">
//         <span className="text-sm text-[#A4A4A4] mb-2">{labelName}</span>
//         {required && (
//           <span className="text-[20px] text-[#FF0000] ml-2 top-0 ">*</span>
//         )}
//       </div>
//       <div
//         tabIndex={tabIndex}
//         className={cx(
//           "w-full bg-white h-[41px] rounded-lg drop-shadow-input pl-3 focus:outline-0 focus:drop-shadow-none transition relative flex items-center",
//           {
//             "rounded-b-[0]": isFocused,
//           },
//           className
//         )}
//         onClick={() => setIsFocused(!isFocused)}
//       >
//         <span>{selectedItem ?? placeHolder}</span>
//         {type === "arrow-down" && (
//           <div className="right-3 transform -translate-y-1/2 z-10 absolute top-5">
//             {selectedItem && selectedItem !== placeHolder ? (
//               <div onClick={(e) => onClear(e)}>Whatever</div>
//             ) : (
//               <p>text</p>
//             )}
//           </div>
//         )}
//       </div>
//       {isFocused && (
//         <ul className=" items-center gap-4 block absolute w-full">
//           {options.map(({ label, labelValue }) => (
//             <li
//               onClick={() => onValueChange(labelValue)}
//               className="rounded-sm shadow-[inset_1px_0px_0px_rgba(0,0,0,0.2) bg-white drop-shadow-input pl-3 focus:outline-0 focus:drop-shadow-none transition relative flex hover:bg-[#F7B500] "
//             >
//               {label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Dropdown;

// Dropdown.defaultProps = {
//   name: "",
//   type: "",
//   className: "",
//   placeHolder: "",
//   required: false,
//   tabIndex: 0,
//   labelName: "",
// };
