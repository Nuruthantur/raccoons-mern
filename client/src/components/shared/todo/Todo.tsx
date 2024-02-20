import React, { useContext, useState } from "react";

function CreateToDo() {
  // const { task } = useContext(AuthContext);
  return (
    <div className="todo">
      <div className="todo-main container d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column">
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="Body" />
        </div>
      </div>
    </div>
  );
}

export default CreateToDo;
