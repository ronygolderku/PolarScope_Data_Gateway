import React from "react";
import logoImg from "../assets/aceasicon.png";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#0F2D57]/90 z-50 text-[#F8FAFC] backdrop-blur-sm">
      <span className="text-4xl font-bold text-[#F4C542]">L</span>
      <img
        src={logoImg}
        alt="Loading..."
        className="w-10 h-10 animate-spin m-2"
      />
      <span className="text-4xl font-bold text-[#F4C542]">A D I N G</span>
    </div>
  );
};

export default Loading;