"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import {NextUIProvider} from "@nextui-org/react";
import { TooltipProvider } from "@/components/ui/tooltip"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <NextUIProvider>
      <TooltipProvider>{children}</TooltipProvider>
      </NextUIProvider>
    </NextThemesProvider>
  )
}
