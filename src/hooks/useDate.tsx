"use client";

import { useEffect, useState } from "react";

const useDate = (interval: number = 1000, freeze: boolean = false) => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    if (freeze) return;
    const id = setInterval(() => {
      setTime(new Date());
    }, interval);

    return () => clearInterval(id);
  }, [freeze, interval]);

  return time;
};

export default useDate;
