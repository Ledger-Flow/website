"use client";

import { useEffect, useRef } from "react";

export const useClose = (close: () => void) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const escKeyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", escKeyClose);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", escKeyClose);
    };
  }, [close]);

  return ref;
};
