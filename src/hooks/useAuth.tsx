"use client";

import { logIn, logOut, signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogIn = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: logIn,
  });

  return mutation;
};

export const useSignUp = () => {
  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
  });

  return mutation;
};

export const useLogOut = () => {
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logOut,
  });

  return mutation;
};
