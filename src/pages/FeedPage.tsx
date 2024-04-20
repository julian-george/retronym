import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out`}
      >
        {/* Sidebar content */}
        <h1 className="text-white text-3xl font-semibold">Brand</h1>
        <ul>
          <li className="padding-4 hover:bg-gray-700">Home</li>
          <li className="padding-4 hover:bg-gray-700">About</li>
          <li className="padding-4 hover:bg-gray-700">Services</li>
          <li className="padding-4 hover:bg-gray-700">Contact</li>
        </ul>
      </div>

      {/* Overlay to close sidebar on mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-20 transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

function FeedPage() {
  return (
    <>
      <Sidebar />
      <div className="flex justify-center items-center">
        <h1>Retronym</h1>
      </div>
    </>
  );
}

export default FeedPage;
