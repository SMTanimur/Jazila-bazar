"use client";

import type { SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname} from "next/navigation";

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
  if (!items?.length) return null;

  return (
    <div
      className={cn("flex w-full flex-col relative pb-4", className)}
      {...props}
    >
      <div className="relative pb-8">
        <div className="max-w-[350px] h-[130px] w-full overflow-hidden rounded-t-xl relative">
          <Image
            src="https://res.cloudinary.com/smtanimur/image/upload/v1702784959/tanimur/profile/cover-img_n5rdeg.webp"
            alt="cover image"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="h-20 w-20 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 shadow-md">
          <Avatar className="h-20 w-20 rounded-full ring-4 ring-white dark:ring-slate-900">
            <AvatarImage src={me?.avatar} alt={me?.lastName} className="object-cover" />
            <AvatarFallback>{me?.lastName?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-2 px-4">
        <h5 className="text-lg text-slate-800 dark:text-slate-100 font-bold">
          {me?.firstName} {me?.lastName}
        </h5>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">{me?.email}</p>

        <div className="border-b border-slate-200 dark:border-slate-800 w-full mt-4 mb-2" />
      </div>
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"];

        return item.href ? (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-[calc(100%-1rem)] mx-2 my-0.5 items-center px-3.5 py-2.5 rounded-xl transition-all duration-200 hover:bg-rose-50/60 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-400 font-medium",
                pathname === item.href
                  ? "bg-rose-100/60 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon
                className="mr-2.5 h-4 w-4 transition-transform duration-300 ease-linear group-hover:rotate-12"
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
      
      <div className="px-4 flex flex-col items-center mt-auto">
        <div className="border-t border-slate-200 dark:border-slate-800 w-full my-4" />

        <Button className="w-full rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 h-10" asChild>
          <Link href="/signout">
            <LogOutIcon className="h-4 w-4" aria-hidden="true" />
            <span>Log out</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
