import React, { useContext, useEffect, useState } from "react";
import { Task } from "../@types/tasks";
import baseUrl from "../utils/baseurl";

import Emoji from "../components/shared/Emoji";
import {
  cheerTask,
  celebrateTask,
  deleteTask,
  setTaskToFinished,
} from "../utils/userInteractivity";
import { AuthContext } from "../context/AuthContext";

type AllTasksResponse = {
  allTasks: Task[];
  number: number;
  status: string;
};
export default function TasksPage() {
  const { user } = useContext(AuthContext);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [hovered, setHovered] = useState(false);

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
    <div className="mx-auto text-center rounded-lg shadow-md mt-auto mb-auto flex flex-row flex-wrap justify-center h-screen">
      <div>
        <h1 className="font-bold text-xl mb-2">
          Here is a list of tasks of all users!
        </h1>
        <br />
        <p>number of tasks: {allTasks.length}</p>
        <br />
      </div>
      {allTasks?.map((task) => {
        const taskOwner =
          typeof task.userId === "string" ? task.userId : task.userId._id;

        return (
          <div
            className="mx-auto text-center mt-auto mb-auto flex flex-column flex-wrap justify-center"
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

                <div className="text-gray-700 text-base">
                  {task.completed ? "complete" : "incomplete"}
                </div>
                <div className=" text-gray-700 text-base">
                  Difficulty: {task.difficulty}
                </div>
                <div className="flex justify-around">
                  <div>
                    <Emoji
                      symbol="💪"
                      label="flexed-biceps"
                      handleClick={
                        taskOwner === user?._id
                          ? undefined
                          : () => {
                              cheerTask(task._id, setAllTasks);
                            }
                      }
                    />
                    <br />
                    {task.taskEncouragements.length}
                  </div>
                  <div>
                    <Emoji
                      symbol="🎉"
                      label="party-popper"
                      handleClick={
                        taskOwner === user?._id
                          ? undefined
                          : () => {
                              celebrateTask(task._id, setAllTasks);
                            }
                      }
                    />
                    <br />
                    {task.taskCelebrations.length}
                  </div>
                  <div>
                    {/* //NOTE - there is an empty div to spread the others in two
                    sections to the left and right */}
                  </div>
                  {/* //TODO - only show the finished and delete button when the user owns the tasks */}
                  <div>
                    <Emoji
                      symbol="✅"
                      label="checkmark"
                      handleClick={() => {
                        alert("logic coming soon");
                        // setTaskToFinished(task._id);
                      }}
                    />
                  </div>
                  <div>
                    <Emoji
                      symbol="X"
                      label="exterminate"
                      handleClick={
                        taskOwner === user?._id
                          ? undefined
                          : () => {
                              deleteTask(task._id, setAllTasks);
                            }
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
//todo - add a box shadow for every created card
