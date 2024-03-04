import React, { useEffect, useRef, useState } from "react";
import { Task } from "../@types/tasks";
import baseUrl from "../utils/baseurl";
import TodoItem from "../components/ToDoItem";
import Emoji from "../components/shared/Emoji";

type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};
export default function TasksPage() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [hovered, setHovered] = useState(false);

  const cheerTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log("cheering woooohoooo", e);
  };

  const partyTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log("partyyyyy", e);
  };

  const deleteTask = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log("EXTERMINATE", e);
  };

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

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-col flex-wrap justify-center h-screen">
      <div>
        <h1 className="font-bold text-xl mb-2">
          Here is a list of tasks of all users!
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
                <div className="font-bold text-xl mb-2">
                  Name: {task.taskName}
                </div>
                <br />
                <div className="text-gray-700 text-base">
                  Description: {task.description}
                </div>
                <div className="text-gray-700 text-base">{task.userId}</div>
                <div className="text-gray-700 text-base">{task.completed}</div>
                <div className="text-gray-700 text-base">
                  Difficulty: {task.difficulty}
                </div>
                <div className="flex justify-around">
                  <span
                    onClick={cheerTask}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                  >
                    <Emoji
                      symbol="💪"
                      label="flexed-biceps"
                      onPointerOver={() => setHovered(true)}
                      onPointerOut={() => setHovered(false)}
                    />
                  </span>
                  <span onClick={partyTask}>
                    <Emoji
                      symbol="🎉"
                      label="party-popper"
                      onPointerOver={() => setHovered(true)}
                      onPointerOut={() => setHovered(false)}
                    />
                  </span>
                  <span onClick={deleteTask}>X</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
//todo - add a boxshadow for every created card
