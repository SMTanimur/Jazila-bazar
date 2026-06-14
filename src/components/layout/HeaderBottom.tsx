"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetCategoriesQuery } from "../../hooks/api/category/useGetCategoriesQuery";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Icons } from "../ui/icons";
import StaticMenu from "./manu/static-menu";
import {
  Tv,
  Trophy,
  Shirt,
  Store,
  Gem,
  Apple,
  BookOpen,
  CupSoda,
  Flower2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const getCategoryIcon = (slug: string) => {
  const s = slug.toLowerCase();
  if (s.includes("electro") || s.includes("phone") || s.includes("tech")) return <Tv className="w-4 h-4" />;
  if (s.includes("sport") || s.includes("fitness")) return <Trophy className="w-4 h-4" />;
  if (s.includes("fashion") || s.includes("cloth")) return <Shirt className="w-4 h-4" />;
  if (s.includes("grocery") || s.includes("staple") || s.includes("food")) return <Store className="w-4 h-4" />;
  if (s.includes("accessor") || s.includes("jewelry") || s.includes("watch")) return <Gem className="w-4 h-4" />;
  if (s.includes("fruit") || s.includes("vegetable") || s.includes("organic")) return <Apple className="w-4 h-4" />;
  if (s.includes("book") || s.includes("novel")) return <BookOpen className="w-4 h-4" />;
  if (s.includes("beverage") || s.includes("drink") || s.includes("juice")) return <CupSoda className="w-4 h-4" />;
  if (s.includes("beauty") || s.includes("cosmetic") || s.includes("makeup")) return <Flower2 className="w-4 h-4" />;
  
  // Default fallback
  return <Apple className="w-4 h-4" />; 
};

const HeaderBottom = () => {
  const pathname = usePathname();
  const isHomepage = pathname == "/";
  const { data: categories } = useGetCategoriesQuery({ limit: 15 });
  return (
    <div className={cn(!isHomepage ? "hidden" : "block")}>
      <div
        className={cn(
          "hidden container md:flex justify-between items-center mt-6"
        )}
      >
        <HoverCard openDelay={100} closeDelay={150}>
          <HoverCardTrigger asChild>
            <Button className="flex gap-2 items-center group font-semibold rounded-xl px-5 transition-all duration-300 shadow-sm hover:shadow-md">
              <Icons.category className="w-4 h-4" />
              <span>All Categories</span>
              <ChevronDown className="w-4 h-4 ml-1 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-72 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl duration-200" 
            align="start"
          >
            <div className="flex flex-col gap-1">
              {categories?.docs.map((category) => (
                <Link
                  className="group flex justify-between items-center py-2.5 px-3.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-rose-50/60 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-400 pl-3.5 hover:pl-5 transition-all duration-300"
                  href={`/products?category=${category.slug}`}
                  key={category.slug}
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <span className="text-slate-400 dark:text-slate-500 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300 flex-shrink-0">
                      {getCategoryIcon(category.slug)}
                    </span>
                    <span className="text-sm font-medium truncate">{category.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-rose-500 dark:group-hover:text-rose-400 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>

        <div className="hidden lg:flex items-center gap-8">
          <StaticMenu />
        </div>

        <Button variant={"outline"} className="bg-rose-300 text-primary">
          Deal Today
        </Button>
      </div>
    </div>
  );
};

export default HeaderBottom;
