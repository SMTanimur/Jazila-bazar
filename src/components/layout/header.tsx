"use client";
import { useMe } from "@/hooks/api/user/useMe";
import { useIsHomePage } from "@/hooks/use-is-homepage";
import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import { HeartIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Fragment } from "react";
import GradientLogo from "../common/shared/gradient-logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Icons } from "../ui/icons";

const Search = dynamic(() => import("@/components/ui/search/search"));

const Header = () => {
  const { me } = useMe();

  const isHomePage = useIsHomePage();

  return (
    <header className=" lg:justify-between lg:w-full hidden lg:flex ">
      <div className="flex items-center w-full ">
        <Link href={"/"}>
          <GradientLogo />
        </Link>

        {/* <div className="hidden ml-10  mr-auto  xl:block">
            <GroupsDropdownMenu />
          </div> */}
        <div className="w-2/3">
          {isHomePage ? (
            <>
              {/* {(headerSearch.showHeaderSearch) && ( */}
              <div className="w-full hidden px-10 mx-auto overflow-hidden lg:block ">
                <Search label="Search" variant="minimal" />
              </div>
              {/* )} */}
            </>
          ) : null}
        </div>
      </div>

      <ul className="items-center shrink-0 hidden lg:flex space-x-10 space-x-reverse">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link
            href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center shrink-0 px-3 py-0 text-sm font-semibold leading-none transition duration-300 ease-in-out border border-transparent rounded outline-none h-9 bg-primary text-white hover:bg-primary focus:outline-none focus:shadow focus:ring-1 focus:ring-primary-700"
          >
            Become Seller
          </Link>

          <div className="border-r h-6 border-border" />
          <HeartIcon className="w-5" />
          <div className="border-r h-6 border-border" />
          <div className="relative">
            <Icons.cart className="w-5" />
            <div className="absolute -top-3 -right-3 bg-red-600 text-white w-5 h-5 flex justify-center items-center">
              <span>3</span>
            </div>
          </div>

          <div className="border-r h-6 border-border" />
          {me ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <div className="relative flex gap-2 items-center cursor-pointer">
                    <Avatar className="h-8 w-8  rounded-full">
                      <AvatarImage src={me?.avatar} alt={me.lastName} />
                      <AvatarFallback>{me.lastName}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 ">
                      <span className="text-gray-600 text-sm">
                        Hi, {me?.lastName}
                      </span>
                      <h3 className="text-gray-900 dark:text-white text-md ">
                        My Account
                      </h3>
                    </div>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 top-10 mt-2 w-56 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-black"
                >
                  <Menu.Item
                    as="div"
                    className="m-2 flex items-center  rounded-lg px-4 py-2 text-sm text-gray-700"
                  >
                    <div className="flex 1 flex-col gap-2">
                      <p className="text-sm font-medium leading-none">
                        {me.firstName} {me.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {me.email}
                      </p>
                    </div>
                  </Menu.Item>
                  <div className="divider" />

                  <div className="divider" />
                  <Menu.Item
                    as="div"
                    className={({ active }: { active: boolean }) =>
                      cn({ "dropdown-active": active }, "menu-item ")
                    }
                  >
                    <Link
                      href="/account/dashboard"
                      className="flex items-center gap-1"
                    >
                      <Icons.user className="mr-1 h-4 w-4" aria-hidden="true" />
                      Account
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    as="div"
                    className={({ active }: { active: boolean }) =>
                      cn({ "dropdown-active": active }, "menu-item flex")
                    }
                  >
                    <Link
                      href="/account/dashboard"
                      className="flex items-center gap-1"
                    >
                      <Icons.user className="mr-1 h-4 w-4" aria-hidden="true" />
                      Dashboard
                      <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    as="div"
                    className={({ active }: { active: boolean }) =>
                      cn({ "dropdown-active": active }, "menu-item ")
                    }
                  >
                    <Link href="/signout" className="flex items-center gap-1">
                      <Icons.logout
                        className="mr-1 h-4 w-4"
                        aria-hidden="true"
                      />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
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
