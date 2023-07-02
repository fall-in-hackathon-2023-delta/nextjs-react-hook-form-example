import React, { useState } from "react";
import styles from "./Reviewing.module.css";

function Reviewing() {
  const [status, setStatus] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "", selected: false },
    { id: 2, text: "", selected: false },
  ]);
  const [pendingTodos, setPendingTodos] = useState([
    { id: 1, text: "", selected: false },
  ]);

  const [infoTodos, setInfoTodos] = useState([
    { id: 1, text: "", selected: false },
  ]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleTodoChange = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const handleTodoSelect = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const handlePendingTodoChange = (id: number, text: string) => {
    setPendingTodos(
      pendingTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const handlePendingTodoSelect = (id: number) => {
    setPendingTodos(
      pendingTodos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const handleNewTodoChange = (id: number, text: string) => {
    setInfoTodos(
      infoTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const handleNewTodoSelect = (id: number) => {
    setInfoTodos(
      infoTodos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const handleNext = () => {
    console.log("Going to Organizer Reviewing Todos");
    // add code to handle transition to the Organizer Reviewing Todos
  };

  const [open, setOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id: number) => {
    setSelectedTodoId(id);
    setOpen(true);
  };

  return (
    <div>
      
      <h1
        style={{
          fontSize: "24px",
          marginTop: "55px",
          marginRight: "240px",
          color: "#808080",
        }}
      >
        {" "}
        My Todos
      </h1>
      <form style={{ width: "360px", margin: "0 auto", padding: "20px" }}>
        {todos.map((todo, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "inline-block",
                width: "25px",
                height: "25px",
                marginLeft: "10px",
                backgroundColor: todo.selected ? "#CEE741" : "white",
                border: "2px solid black",
              }}
            >
              <input
                type="checkbox"
                style={{ display: "none" }}
                checked={todo.selected}
                onChange={() => handleTodoSelect(todo.id)}
              />
            </label>
            <input
              type="text"
              value={todo.text}
              style={{ width: "245px", height: "28px", marginLeft: "10px" }}
              placeholder="todo description"
              onChange={(e) => handleTodoChange(todo.id, e.target.value)}
            />
          </div>
        ))}
      </form>
      <h1
        style={{
          fontSize: "24px",
          marginTop: "55px",
          marginRight: "184px",
          color: "#808080",
        }}
      >
        {" "}
        Pending Todos
      </h1>
      <form style={{ width: "360px", margin: "0 auto", padding: "20px" }}>
        {pendingTodos.map((todo, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "inline-block",
                width: "25px",
                height: "25px",
                marginLeft: "10px",
                backgroundColor: todo.selected ? "#FEF445" : "white",
                border: "2px solid black",
              }}
            >
              <input
                type="checkbox"
                style={{ display: "none" }}
                checked={todo.selected}
                onChange={() => handlePendingTodoSelect(todo.id)}
              />
            </label>
            <input
              type="text"
              value={todo.text}
              style={{ width: "245px", height: "28px", marginLeft: "10px" }}
              placeholder="todo description"
              onChange={(e) => handlePendingTodoChange(todo.id, e.target.value)}
            />
            {todo.selected && (
              <span
                onClick={() => handleOpen(todo.id)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  border: "2px solid black",
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#F29B9B",
                }}
              >
                X
              </span>
            )}
          </div>
        ))}
      </form>

      <h1
        style={{
          fontSize: "24px",
          marginTop: "55px",
          marginRight: "280px",
          color: "#808080",
        }}
      >
        {" "}
        Todos
      </h1>
      <form style={{ width: "360px", margin: "0 auto", padding: "20px" }}>
        {infoTodos.map((todo, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "inline-block",
                width: "25px",
                height: "25px",
                marginLeft: "10px",
                backgroundColor: todo.selected ? "#6881FF" : "white",
                border: "2px solid black",
              }}
            >
              <input
                type="checkbox"
                style={{ display: "none" }}
                checked={todo.selected}
                onChange={() => handleNewTodoSelect(todo.id)}
              />
            </label>

            {todo.selected && (
              <input
                type="text"
                value={todo.text}
                style={{ width: "245px", height: "28px", marginLeft: "10px" }}
                placeholder="todo description"
                onChange={(e) => handleNewTodoChange(todo.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </form>
      <div>
        {open && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "300px",
                textAlign: "center",
              }}
            >
              <h2 id="simple-modal-title">
                Cancel this Todo? We will notify the Participant so they know it
                does not need to be completed.
              </h2>
              <p id="simple-modal-description">
                If you click 'Cancel Todo', this action cannot be undone.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "15px",
                }}
              >
                <button onClick={handleClose}>Close</button>
                <button
                  onClick={() => {
                    setPendingTodos(
                      pendingTodos.filter((todo) => todo.id !== selectedTodoId)
                    );
                    handleClose();
                    alert(
                      "This Todo is cancelled. We notified the Participant that they don't need to complete it."
                    );
                  }}
                  style={{ backgroundColor: "red", color: "black",  }}
                >
                  Cancel Todo
                </button>
              </div>
              <div
                onClick={handleClose}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                }}
              >
                &#10005; {/* This is an "X" character */}
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        style={{
          marginTop: "40px",
          backgroundColor: "#414BB2",
          color: "white",
          width: "200px",
          height: "30px",
        }}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default Reviewing;
