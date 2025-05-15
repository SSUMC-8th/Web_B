import React from "react";
import { Lp } from "../types/lp";

interface LPHeaderProps {
  lp: Lp;
}

const LPHeader = ({ lp }: LPHeaderProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="w-80 h-80 bg-black/30 rounded-lg shadow-md flex items-center justify-center relative">
        <img
          src={lp.thumbnail}
          alt="LP"
          className="w-60 h-60 rounded-full object-cover animate-spin border-[6px] border-gray-600"
        />
        <div className="absolute w-8 h-8 bg-black rounded-full z-10" />
        <span className="absolute bottom-2 right-2 text-xs text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded">
          {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>
    </div>
  );
};

export default LPHeader;
