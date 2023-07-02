import React, { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 } from "uuid";
import useRequirementContext from "../../contexts/useRequirementContext";
import useCategoryContext from "../../contexts/stretch/useCategoryContext";
import { T } from "@/types";
function Todo() {

}

const schema = yup.object().shape({
        id: yup.string().required(),
     //   status: yup.string().required(),
        label: yup.string().required(),
        priority: yup.number().required().nullable(),
        isEssential: yup.boolean().required(),
        numberRequired: yup.number().required(),
        offersAllowed: yup.boolean().required(),
        options: yup.array().of(yup.string()),
        commitments: yup.array().of(
          yup.object({
            id: yup.string().required(),
            description: yup.string().required(),
            status: yup.string().required(),
            contributor: yup.object().shape({
              id: yup.string(),
              firstName: yup.string(),
              lastName: yup.string(),
              email: yup.string().required(),
              reputation: yup.number()
            }),
          })
        )
    
}).required();


function Form(props: { requirement: T.Stretch.Requirement}){
    const { requirement} = props;


    
}
/* 
Even though commitments are child to Requirement, we must render a Requirement.Form for each Commitment.
Possible circular dependency in form tree. This case is now in Stretch goals.

*/
function Commitment(props: { requirement: T.Stretch.Requirement}) {
    const { requirement } = props;
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        control: requirementController,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: requirement ? requirement : {
            id: v4(),
            label: "",
            priority: 0,
            isEssential: false,
            numberRequired: 1,
            offersAllowed: false,
            options: [],
            commitments: []
        },
      });

        const { fields, append, prepend, remove, swap, move, insert, replace, update } = useFieldArray({
            control: requirementController,

            name: "commitments",
            keyName: "commitment"
            });
const {status} = useMemo(() => {
    return {
        status: undefined// getValues("status")
    }
}, [fields, watch]);

return (
    <div>
        <h2>Form Requirement</h2>
        <input {...register("label")} />
        <input {...register("priority")} />
        <input {...register("isEssential")} />
        <input {...register("numberRequired")} />
        <input {...register("offersAllowed")} />
        <input {...register("options")} />
       

        </div>
)
}

function Requirement(props: { requirement: T.Stretch.Requirement}) {
    /* const { requirement } = props;
    const ctx = useRequirementContext(requirement);
    
    return (
        <Requirement.Form  requirement={requirement} />
      ) */
}

function Container(props: { type: string, fields: any[]}) {
    const { type, fields } = props;
    const {renderFields: renderFields, header} = useCategoryContext(type, fields);

    return (
        <div>
            {header && <h2 style={{ fontSize: "24px", marginTop: "55px", marginRight:"220px",color:"#808080"}}>{header}</h2>}
            {renderFields && renderFields.length > 0 && renderFields.map((field, index) => {
        return (
          <Requirement.Commitment  requirement={field} />
        )
      })}
        </div>
    );
}

Requirement.Form = Form;
Requirement.Todo = Todo;
Requirement.Container = Container;
Requirement.Commitment = Commitment;

export default Requirement;