import React, { useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 } from "uuid";
import useRequirementContext from "../contexts/useRequirementContext";
import useCategoryContext from "../contexts/useCategoryContext";
import { T } from "@/types";

const schema = yup
  .object()
  .shape({
    id: yup.string().required(),
    //   status: yup.string().required(),
    label: yup.string().required(),
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
function Form(props: { todo?: T.Base.Todo }) {
  const { todo } = props;
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control: todoController,
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
  const { fields, append, prepend, remove, swap, move, insert, replace, update } = useFieldArray({
    control: todoController,

    name: "options",
    keyName: "options",
  });

  return (
    <div>
      <label>
        Label:
        <input {...register("label")} />
      </label>
      <label>
        <input {...register("priority")} />
      </label>
      <label>
        <input {...register("isEssential")} />
      </label>
      <input
        type="text"
        placeholder="Add option..."
        {...todoOptionRegister("label")}
        style={{ width: "245px", height: "28px" }}
      />
      <button
        type="button"
        onClick={todoOptionHandleSubmit((data) => {
          const labels = fields.map((field) => field.label);
          if (labels.includes(data.label)) {
            return;
          } else {
            const newLabels = [...fields, data];
            append(newLabels);
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
              {fields &&
                fields.length > 0 &&
                fields.map((field, index) => {
                  return <option value={field.label}>{field.label}</option>;
                })}
            </select>
          </>
        )}
        name={`options`}
        control={todoController}
      />
    </div>
  );
}

function Container(props: { type: string; fields: any[] }) {
  const { type, fields } = props;
  const { renderFields: renderFields, header } = useCategoryContext(type, fields);
  console.log("Todo.Container", { renderFields, header });
  return (
    <div>
      {header && (
        <h2 style={{ fontSize: "24px", marginTop: "55px", marginRight: "220px", color: "#808080" }}>{header}</h2>
      )}
      {renderFields &&
        renderFields.length > 0 &&
        renderFields.map((field, index) => {
          return <Todo.Form todo={field} />;
        })}
      {header === "Todos" && <Todo.Form />}
    </div>
  );
}

function Todo(props: { requirement: T.Stretch.Requirement }) {}

Todo.Form = Form;
Todo.Todo = Todo;
Todo.Container = Container;

export default Todo;
