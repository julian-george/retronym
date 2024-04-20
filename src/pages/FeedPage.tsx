import React, { useState, Dispatch, SetStateAction, useCallback } from "react";
import { useUser } from "../context/userContext";

const Sidebar: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { logout } = useUser();
  return (
    <>
      <div
        className={`bg-gray-200 w-64 absolute inset-y-0 left-0 flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out`}
      >
        <div className="flex-1"></div>
        <button onClick={() => logout()}>Log Out</button>
      </div>

      {/* Overlay to close sidebar on mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-0 z-20 left-64 transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
};

function FeedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);
  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex items-center w-full">
        <div className="flex-1">
          <div className="text-left" onClick={toggleSidebar}>
            Sidebar
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-center">Retronym</h1>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
}

export default FeedPage;
