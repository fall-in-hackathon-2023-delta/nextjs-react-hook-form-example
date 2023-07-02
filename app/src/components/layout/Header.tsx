import ButtonAuthentication from "@/features/authentication/components/ButtonAuthentication";
import { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="row-start-1 row-end-2 flex flex-row place-content-end p-4 justify-between">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FaHome onClick={() => (window.location.href = "/home")} size={30} className="home" />
        {showSearch ? (
          <input type="text" placeholder="Search..." className="search" />
        ) : (
          <FaSearch onClick={() => setShowSearch(!showSearch)} size={30} className="search" />
        )}
      </div>
      <ButtonAuthentication />{" "}
    </div>
  );
}
