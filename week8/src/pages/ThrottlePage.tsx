import React, { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

export const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 1000);
  // useThrottle는 1초에 한번만 실행됨

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <h1>What is throttle?</h1>
      <p>ScrollY:{scrollY}px</p>
    </div>
  );
};
