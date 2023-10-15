"use client";
import { useMe } from "@/hooks/api/user/useMe";
import { useIsHomePage } from "@/hooks/use-is-homepage";
import { displayMobileHeaderSearchAtom } from "@/store/display-mobile-header-search-atom";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { displayHeaderSearchAtom } from "../../store/display-header-search-atom";
import GradientLogo from "../common/shared/gradient-logo";
import Search from "../common/shared/search";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
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
import StaticMenu from "./manu/static-menu";

// const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });

const Header = ({ layout }: { layout?: string }) => {
  const [displayHeaderSearch, setDisplayHeaderSearch] = useAtom(
    displayHeaderSearchAtom
  );

  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const { isAuthorized, me } = useMe();

  const isHomePage = useIsHomePage();
  const isMultilangEnable =
    process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === "true" &&
    !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

  useEffect(() => {
    if (!isHomePage) {
      setDisplayHeaderSearch(false);
    }
  }, [isHomePage, setDisplayHeaderSearch]);
  const isFlattenHeader =
    !displayHeaderSearch && isHomePage && layout !== "modern";
  return (
    <header className="flex justify-between w-full">
      <div className="flex items-center w-full ">
        <Link href={"/"}>
          <GradientLogo />
        </Link>

        {/* <div className="hidden ltr:ml-10 rtl:mr-10 ltr:mr-auto rtl:ml-auto xl:block">
            <GroupsDropdownMenu />
          </div> */}
      </div>
      {isHomePage ? (
        <>
          {(displayHeaderSearch || layout === "modern") && (
            <div className="hidden w-full px-10 mx-auto overflow-hidden lg:block ">
              <Search onSearch={() => null} />
            </div>
          )}

          {displayMobileHeaderSearch && (
            <div className="block lg:hidden w-full absolute top-0 ltr:left-0 rtl:right-0  bg-light pt-1.5 md:pt-2 px-5">
              <Search onSearch={() => null} />
            </div>
          )}
        </>
      ) : null}
      <ul className="items-center shrink-0 hidden lg:flex space-x-10 rtl:space-x-reverse">
        <StaticMenu />
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Link
            href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center shrink-0 px-3 py-0 text-sm font-semibold leading-none transition duration-300 ease-in-out border border-transparent rounded outline-none h-9 bg-primary text-white hover:bg-accent-hover focus:outline-none focus:shadow focus:ring-1 focus:ring-primary-700"
          >
            Become Seller
          </Link>
          {me ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={me?.avatar} alt={me.lastName} />
                    <AvatarFallback>{me.lastName}</AvatarFallback>
                  </Avatar>
                </Button>
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
                    <Link href="/dashboard/account">
                      <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                      Account
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/account">
                      <Icons.terminal
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Dashboard
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild disabled>
                    <Link href="/dashboard/settings">
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

export default Header;
