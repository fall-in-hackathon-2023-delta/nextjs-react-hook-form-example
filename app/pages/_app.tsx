
import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "src/styles/globals.css";


const queryClient = new QueryClient();

function Auth(props: { children: any }) {
   const { children } = props;
   const { status, data: session } = useSession({
      required: false
   });

   const isUser = !!session?.user;

   if (isUser) {
      return children;
   }
   return <div>{"Loading ... "}</div>;
}

export default function App(props: { Component: any; pageProps: any }) {
   const {
      Component,
      pageProps: { session, ...pageProps }
   } = props;   


   return (
      <SessionProvider
         session={session}
         refetchInterval={3 * 60}
      >

               <QueryClientProvider client={queryClient}>
                   <React.StrictMode>
                  {Component.auth ? (
                     <Auth>
                        <Component {...pageProps} />
                     </Auth>
                  ) : (
                     <Component {...pageProps} />
                  )}
                   </React.StrictMode>
               </QueryClientProvider>
      </SessionProvider>
   );
}
