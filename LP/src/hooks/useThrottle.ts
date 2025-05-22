import { useRef } from "react";

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0);

  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }) as T;
}
