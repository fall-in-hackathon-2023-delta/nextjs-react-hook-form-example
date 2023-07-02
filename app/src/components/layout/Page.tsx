import { ReactNode } from "react";

export default function Page(props: {children: ReactNode[]}){
    const { children } = props;
    return <div className="grid grid-cols-1 grid-rows-[minmax(0,_auto)_1fr]">{children}</div>
}