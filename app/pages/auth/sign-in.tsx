import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken } from "next-auth/react";

export async function getServerSideProps(context: CtxOrReq | undefined) {
    return {
       props: {
          csrfToken: await getCsrfToken(context)
       }
    };
 }