import React from "react";

const Container = ({ children }) => {
  return (
    <div className="relative bg-[#1E1E1E] text-white px-6  overflow-hidden shadow-lg">
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-primary opacity-20 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-secondary opacity-20 blur-3xl rounded-full z-0"></div>
      {children}
    </div>
  );
};

export default Container;
