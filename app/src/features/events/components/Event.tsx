import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 } from "uuid";
import Todo from "./Todo";
import DateForm from "./DateForm";
import Reviewing from "./Reviewing";
function Event() {}

const schema = yup
  .object({
    id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string(),
    date: yup.string(),
    location: yup.string(),
    image: yup.string(), // set as base64 upon upload
    duration: yup.number(),
    todos: yup.array().of(yup.object()),
    offersAllowed: yup.boolean().required(),
  })
  .required();
/* 
Render the requirements field array 4x, exposing Commitment[] according to status.

*/
function Form() {
  const {
    register,
    handleSubmit,
    control: parentControl,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: v4(),
      title: "",
      description: "",
      date: "",
      location: "",
      image: "",
      duration: 0,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace, update } = useFieldArray({
    control: parentControl,
    name: "todos",
    keyName: "todo",
  });

  useEffect(() => {
    if (fields?.length === 0) {
      append({
        id: v4(),
        label: "",
        priority: 0,
        isEssential: false,
        numberRequired: 1,
        offersAllowed: false,
        options: [],
        commitments: [],
      });
    }
  }, []);

  const onSuccess = (data: any) => console.log(data);
  const onError = (error: any) => console.log(error);

  return (
    <form onSubmit={handleSubmit(onSuccess, onError)}>
      <DateForm />
      {/* <Reviewing /> */}


      <Todo.Container type={"myTodos"} fields={fields} />

      <Todo.Container type={"pendingTodos"} fields={fields} />

      <Todo.Container type={"todos"} fields={fields} />

      <Todo.Container type={"completedTodos"} fields={fields} />
    </form>
  );
}


function OrganizerMaking() {
  const [todos, setTodos] = useState([
    { id: 1, text: "", selected: false },
    { id: 2, text: "", selected: false },
  ]);

  const handleTodoChange = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const handleTodoSelect = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, selected: !todo.selected } : todo)));
  };

  const handleAddTodo = () => {
    setTodos([...todos, { id: todos.length + 1, text: "", selected: false }]);
  };

  const handleNext = () => {
    console.log("Going to Organizer Reviewing Todos");
    // add code to handle transition to the Organizer Reviewing Todos
  };

  return (
    <div>
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
            <input
              type="checkbox"
              style={{ width: "20px", height: "20px", marginLeft: "10px" }}
              checked={todo.selected}
              onChange={() => handleTodoSelect(todo.id)}
            />
            <input
              type="text"
              value={todo.text}
              style={{ width: "245px", height: "28px" }}
              onChange={(e) => handleTodoChange(todo.id, e.target.value)}
            />
            {index === todos.length - 1 && (
              <button type="button" onClick={handleAddTodo} style={{ marginLeft: "10px" }}>
                +
              </button>
            )}
          </div>
        ))}
      </form>
      <button
        style={{
          marginTop: "60px",
          backgroundColor: "#414BB2",
          color: "white",
          width: "150px",
          height: "30px",
        }}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

function Card() {}

function List() {}

function RSVP() {
  const [status, setStatus] = useState("");
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: status === "Going" ? "#CEE741" : undefined,
          marginRight: "10px",
        }}
        onClick={() => handleStatusChange("Going")}
      >
        Going
      </button>
      <button
        style={{
          backgroundColor: status === "Maybe" ? "#CEE741" : undefined,
          marginRight: "10px",
        }}
        onClick={() => handleStatusChange("Maybe")}
      >
        Maybe
      </button>
      <button
        style={{
          backgroundColor: status === "Not Going" ? "#CEE741" : undefined,
        }}
        onClick={() => handleStatusChange("Not Going")}
      >
        Not Going
      </button>
    </div>
  );
}

Event.Form = Form;
Event.Card = Card;
Event.List = List;
Event.RSVP = RSVP;

export default Event;
