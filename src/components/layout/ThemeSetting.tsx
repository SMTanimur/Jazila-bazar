"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Icons } from "../ui/icons"
import { useState } from "react"
 
export function ThemeSetting() {
  const { setTheme, theme } = useTheme()
   const [togleSwich,setTogleSwich]= useState(false)
  return (
    <DropdownMenu  onOpenChange={ ()=> setTogleSwich(!togleSwich)}>
      <DropdownMenuTrigger asChild className=""
       
      >
        <Button>
          djfdk
        </Button>
      {/* <Button
      variant="ghost"
      size="icon"
    >
      {
        togleSwich ? <Icons.settings className="w-5"/> : <Icons.close className="w-5"/>
        
      }
      <span className="sr-only">Toggle theme</span>
    </Button> */}
      </DropdownMenuTrigger>
     
      <DropdownMenuContent className="w-32" >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex justify-between">
          <DropdownMenuItem>
            
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
      </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}