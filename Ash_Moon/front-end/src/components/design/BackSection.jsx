import React from "react";

const BackSection = ({ children }) => {
  return (
    <div className="relative ">
      {children}
      <div
        className="fixed top-[60%] left-[50%] w-[30rem] h-[30rem] bg-gradient-to-b from-main to-secondary shadow-[0px_0px_60px_10px_#ffffff81,inset_0px_0px_100px_30px_#ae2d47] -z-30
        rounded-full -translate-x-[50%] -translate-y-[50%]"
      ></div>
    </div>
  );
};

export default BackSection;
