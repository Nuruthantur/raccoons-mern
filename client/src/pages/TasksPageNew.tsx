import { useEffect, useState } from "react";
import baseUrl from "../utils/baseurl";
import TodoItem from "../components/ToDoItem";
import AllTasksList from "../components/AllTasks";
import { Task } from "../@types/tasks";
type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};
function TaskPage() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const GetTodos = () => {
    fetch(`${baseUrl}/api/tasks/all-tasks`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  };

  const addItem = async () => {
    const data = await fetch(baseUrl + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: input,
        completed: false,
      }),
    }).then((res) => res.json());
    console.log(data);
    await GetTodos();
    setInput("");
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>
        <button onClick={() => addItem()}>
          <span>ADD</span>
        </button>
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
    </div>
  );
}

export default TaskPage;
