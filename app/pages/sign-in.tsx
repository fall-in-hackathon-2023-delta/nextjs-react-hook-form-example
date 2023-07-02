import LoginForm from "@/features/authentication/components/LoginForm";
import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken } from "next-auth/react";

export async function getServerSideProps(context: CtxOrReq | undefined) {
 //  console.log("context: ", context)
    return {
       props: {
          csrfToken: await getCsrfToken(context)
       }
    };
 }

 export default function SignInPage(props: { csrfToken: string }){
   const { csrfToken } = props;
   return (<LoginForm csrfToken={csrfToken} />)
 }

