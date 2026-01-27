"use client";

import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = (newState?: boolean) => {
    setState((prev) => newState ?? !prev);
  };

  return [state, toggle] as const;
};
