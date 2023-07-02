import ButtonAuthentication from "@/features/authentication/components/ButtonAuthentication";
import { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
    const router = useRouter();
  return (
    <div className="row-start-1 row-end-2 flex flex-row place-content-center place-items-center p-4 justify-between">

        <FaHome onClick={() => (window.location.href = "/")} size={30} className=""/>
        {showSearch ? (
          <input type="text" placeholder="Search..." className="search" />
        ) : (
          <FaSearch onClick={() => setShowSearch(!showSearch)} size={30} className="" />
        )}
   <button className="p-4 rounded-md hover:cursor-pointer bg-steelBlue" onClick={() => {
                    router.push("/events")
                }}>Events</button>
      <ButtonAuthentication />{" "}
    </div>
  );
}
