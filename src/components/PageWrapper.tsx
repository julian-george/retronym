import React, { ReactNode } from "react";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full px-4 py-2">
      {children}
    </div>
  );
};
export default PageWrapper;
