import React from "react";
import { Lp } from "../types/lp";

interface LPContentProps {
  lp: Lp;
}

const LPContent = ({ lp }: LPContentProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">{lp.title}</h2>
      <p className="text-sm text-gray-300 leading-relaxed">{lp.content}</p>
      <div className="flex flex-wrap gap-2 mt-4 text-sm justify-center">
        {lp.tags.map((tag) => (
          <span key={tag.id} className="bg-gray-700 px-3 py-1 rounded-full">
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LPContent;
