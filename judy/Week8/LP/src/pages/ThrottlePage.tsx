import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

export const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>();

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>ScrollY: {scrollY}px</p>
      </div>
    </div>
  );
};
