import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanNumberInput = (value: string) => {
  if (value === "") {
    return "";
  }
  const newValue = Number.parseInt(value);
  if (!isNaN(newValue) && newValue >= 0) {
    return newValue;
  }
};

export const cleanNumberInputBlur = (
  value: string | number,
  min: number = 0,
) => {
  if (value === "" || value === 0) {
    return min;
  }
};
