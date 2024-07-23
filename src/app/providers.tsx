"use client";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "@/theme";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
