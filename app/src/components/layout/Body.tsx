import { ReactNode } from "react";

export default function Page(props: {children: ReactNode}){
    const { children } = props;
    return <div className="row-start-2 row-end-3 flex place-content-center">{children}</div>
}