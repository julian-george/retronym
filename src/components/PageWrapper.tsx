import React, { ReactNode } from "react";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {children}
    </div>
  );
};
export default PageWrapper;
