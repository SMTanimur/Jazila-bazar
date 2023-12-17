"use client";

import type { SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useMe } from "@/hooks/api/user/useMe";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { me } = useMe();
  const router = useRouter();
  if (!items?.length) return null;

  return (
    <div
      className={cn("flex w-full flex-col gap-2 relative", className)}
      {...props}
    >
      <div className="relative pb-6">
        <div className="max-w-[350px] h-[160px] w-full overflow-hidden  ">
          <Image
            src={
              "https://res.cloudinary.com/smtanimur/image/upload/v1702784959/tanimur/profile/cover-img_n5rdeg.webp"
            }
            alt="cover image"
            className=""
            width={350}
            height={100}
          />
        </div>
        <div className="h-[80px] w-[80px] rounded-full  absolute -bottom-2 left-1/2 -translate-x-1/2 ">
          <Avatar className="h-20 w-20  rounded-full ring-4 ring-white ">
            <AvatarImage src={me?.avatar} alt={me?.lastName} className="" />
            <AvatarFallback>{me?.lastName}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-2">
        <h5 className="text-xl text-gray-800 dark:text-white font-semibold">
          {me?.firstName} {me?.lastName}
        </h5>
        <p className="text-sm text-slate-600">{me?.email}</p>

        <div className="border-b-2 w-full mt-3" />
      </div>
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"];

        return item.href ? (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href}
            // disabled={me?.provider !== 'google'}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center px-4 py-3 hover:bg-primary/20 hover:text-foreground ",
                pathname === item.href
                  ? "bg-primary/10 font-medium text-foreground border-l-4 border-primary"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon
                className="mr-2 h-4 w-4 transition-transform duration-300 ease-linear group-hover:rotate-12"
                aria-hidden="true"
              />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        );
      })}
      <div className="py-2 px-3 flex-col items-center">
        <div className="border-b-2 w-full my-3 self-center" />

        <div className="w-full relative">
          <Button className="w-full" >
            <Link href={"/signout"}>
            Log out
            </Link>
            
          </Button>
          <LogOutIcon
            className="mr-2 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-28"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
