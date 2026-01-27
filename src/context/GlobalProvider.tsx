"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProgressProvider } from "@bprogress/next/app";
import { useContext, createContext } from "react";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();
const Context = createContext<null>(null);

export const GlobalProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        height="4px"
        color="#284ea7"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <Context.Provider value={null}>{children}</Context.Provider>
        <Toaster position="top-right" />
      </ProgressProvider>
    </QueryClientProvider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useGlobalContext: must be use within GlobalProvider.");
  }
  return context;
};
