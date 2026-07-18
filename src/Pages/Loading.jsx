import React from "react";
import logoImg from "../assets/aceasicon.png";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2D57]/90 text-[#F8FAFC] backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0b2748]/90 px-8 py-7 shadow-2xl">
        <img
          src={logoImg}
          alt="Loading"
          className="h-10 w-10 animate-spin"
        />
        <div className="text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[#F4C542]">
            Loading
          </div>
          <div className="mt-1 text-sm text-[#D6E1F0]">
            Preparing catalogue content
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;