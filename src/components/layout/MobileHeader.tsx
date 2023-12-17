"use client";
import { useMe } from "@/hooks/api/user/useMe";
import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icons } from "../ui/icons";
import { HeartIcon } from "lucide-react";
import dynamic from "next/dynamic";
import GradientLogo from "../common/shared/gradient-logo";
import { useGlobalModalStateStore } from "@/store/modal";
const CartCounterButton = dynamic(() => import("../cart/cart-count-button"), {
  ssr: false,
});
const MobileHeader = () => {
 
  const { me } = useMe();
  const globalModal = useGlobalModalStateStore();
  return (
    <header className="flex justify-between w-full items-center">
      <div className="flex items-center gap-2 w-full -ml-6">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => globalModal.onMenubar()}
          className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-green-500  "
        >
          <span className="sr-only">burger menu</span>
          <Icons.menu className={`${"transform rotate-180"} text-gray-400`} />
        </motion.button>
        <Link href={"/"}>
          <GradientLogo />
        </Link>
          
      </div>
      
      <ul className="items-center shrink-0 flex space-x-10 space-x-reverse">
  
        <div className="flex items-center space-x-4 space-x-reverse ">

          <div className="sm:flex items-center space-x-4 space-x-reverse hidden">
          <Link
            href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/signup`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center shrink-0 px-3 py-0 text-sm font-semibold leading-none transition duration-300 ease-in-out border border-transparent rounded outline-none h-9 bg-primary text-white hover:bg-primary focus:outline-none focus:shadow focus:ring-1 focus:ring-primary-700  "
          >
            Become Seller
          </Link>

          <div className="border-r h-6 border-border"/>
          <HeartIcon className="w-5"/>
          <div className="border-r h-6 border-border"/>
          <CartCounterButton/>
          </div>
          
          <div className="border-r h-6 border-border hidden sm:block"/>
          {me ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild >
                <div
           
                  className="relative flex gap-2 items-center cursor-pointer"
                >
                  <Avatar className="h-8 w-8  rounded-full">
                    <AvatarImage src={me?.avatar} alt={me.lastName} />
                    <AvatarFallback>{me.lastName}</AvatarFallback>
                  </Avatar>
                 
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {me.firstName} {me.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {me.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard">
                      <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                      Account
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard">
                      <Icons.terminal
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Dashboard
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild disabled>
                    <Link href="/account/settings">
                      <Icons.settings
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/signout">
                    <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/signin"
              className={buttonVariants({
                size: "sm",
              })}
            >
              Sign In
              <span className="sr-only">Sign In</span>
            </Link>
          )}
        </div>
      </ul>
    </header>
  );
};

export default MobileHeader
