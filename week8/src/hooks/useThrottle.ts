//useThrottle : 주어진 값(상태)가 자주 변경될 때
// 최소 interval로 변경되도록 하는 훅

import { useEffect, useRef, useState } from 'react';

function useThrottle<T>(value: T, delay: number = 500) {

  const [throttledValue, setThrottledValue] = useState<T>(value);

  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {

    if(Date.now() - lastExecuted.current >= delay) {

      setThrottledValue(value)
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    }else{
      const timeout = setTimeout(() => {
        setThrottledValue(value)
        lastExecuted.current = Date.now()
      }, delay - (Date.now() - lastExecuted.current)) // delay - (Date.now() - lastExecuted.current) : 남은 시간

      return () => clearTimeout(timeout)
    }
  },[value, delay])

  return throttledValue
}

export default useThrottle