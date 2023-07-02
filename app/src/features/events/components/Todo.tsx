import React, { useMemo, useState } from "react";
import { Controller, UseFieldArrayReturn, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 } from "uuid";
import useRequirementContext from "../contexts/useRequirementContext";
import useCategoryContext from "../contexts/useCategoryContext";
import { T } from "@/types";
import { useSession } from "next-auth/react";

const schema = yup
  .object()
  .shape({
    id: yup.string().required(),
    //   status: yup.string().required(),
    label: yup.string().required(),
    status: yup.string().required(),
    priority: yup.number().required().nullable(),
    isEssential: yup.boolean().required(),
    selectedOption: yup.string().required().nullable(),
    options: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
      })
    ),
    contributor: yup
      .object()
      .shape({
        id: yup.string(),
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.string().required(),
        reputation: yup.number(),
      })
      .nullable(),
  })
  .required();

const todoOptionSchema = yup.object().shape({
  label: yup.string().required(),
});
function Form(props: { todo?: T.Base.Todo; fieldArray: Partial<UseFieldArrayReturn> }) {
  const { todo, fieldArray: { update }} = props;
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control: todoController,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: todo
      ? todo
      : {
          id: v4(),
          label: "",
          priority: 0,
          isEssential: false,
          options: [],
          contributor: null,
        },
  });
  const {
    register: todoOptionRegister,
    handleSubmit: todoOptionHandleSubmit,
    watch: todoOptionWatch,
    getValues: todoOptionGetValues,
    control: todoOptionController,
    formState: { errors: todoOptionErrors },
  } = useForm({
    resolver: yupResolver(todoOptionSchema),
    defaultValues: {
      label: "",
    },
  });
  const { fields: optionsFields, append: optionsAppend } = useFieldArray({
    control: todoController,

    name: "options",
    keyName: "options",
  });

  const { status, data: session } = useSession({
    required: false,
  });
  /* 
TODO:
- Add new todo input when a todo is added
- Contributor toggle
- 

*/
  return (
    <div>
      <div className="flex flex-row gap-3">
        <input
          type="checkbox"
          {...register("contributor", {
            onChange: (e) => {
              console.log("contributor changed", {checked: e.target.checked, id: session?.user?.id,
                firstName: session?.user?.first_name,
                lastName: session?.user?.last_name,
                email: session?.user?.email,
                reputation: 100,})
              if (e.target.checked) {
                setValue("status", "in_progress")
                return {
                  id: session?.user?.id,
                  firstName: session?.user?.first_name,
                  lastName: session?.user?.last_name,
                  email: session?.user?.email,
                  reputation: 100,
                };
              } else {
                setValue("status", "open")
                return null;
              }
            },
          })}
        />
        <label>
          <input {...register("label")} />
        </label>
        <label>
          <input {...register("priority")} />
        </label>
        <label>
          <input {...register("isEssential")} />
        </label>
        <div>
          <input
            type="text"
            placeholder="Add option..."
            {...todoOptionRegister("label")}
            style={{ width: "245px", height: "28px" }}
          />
          <button
            type="button"
            onClick={todoOptionHandleSubmit((data) => {
              const labels = optionsFields.map((field) => field.label);
              if (labels.includes(data.label)) {
                return;
              } else {
                const newLabels = [...optionsFields, data];
                optionsAppend(newLabels);
              }
            })}
          >
            Add Option
          </button>
          <Controller
            render={({ field: { onChange, value, ref } }) => (
              <>
                {/* TODO: Refactor to Todo.OptionSelect */}
                <select
                  id={`todo-options-${todo?.id || getValues("id")}`}
                  ref={ref}
                  className="mr-1 rounded-md border-slate-200 bg-white pr-9"
                  // onChange={(e) => onChange(handleOnChange(e, item))}
                  // defaultValue={}
                >
                  {optionsFields &&
                    optionsFields.length > 0 &&
                    optionsFields.map((field, index) => {
                      return <option value={field.label}>{field.label}</option>;
                    })}
                </select>
              </>
            )}
            name={`options`}
            control={todoController}
          />
        </div>
      </div>
    </div>
  );
}

function Container(props: { type: string; fieldArray: { fields: any; append: any; prepend: any; remove: any; swap: any; move: any; insert: any; replace: any; update: any;}; handleAddTodo?: any; }) {
  const { type, handleAddTodo, fieldArray: { fields, append, prepend, remove, swap, move, insert, replace, update } } = props;
 // @ts-ignore
  const { renderFields: renderFields, header } = useCategoryContext(type, fields);
  console.log("Todo.Container", { renderFields, header, fields });
  return (
    <div>
      {header && (
        <h2 style={{ fontSize: "24px", marginTop: "55px", marginRight: "220px", color: "#808080" }}>{header}</h2>
      )}
      {renderFields &&
        renderFields.length > 0 &&
        renderFields.map((field, index) => {
          return <Todo.Form todo={field} fieldArray={ { update }} />;
        })}
      {header === "Todos" && handleAddTodo && (
        <button className="bg-steelBlue p-4 hover:cursor-pointer rounded-md" onClick={handleAddTodo}>
          Add Todo
        </button>
      )}
    </div>
  );
}

function Todo(props: { requirement: T.Stretch.Requirement }) {}

Todo.Form = Form;
Todo.Todo = Todo;
Todo.Container = Container;

export default Todo;
