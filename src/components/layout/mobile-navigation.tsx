"use client";
import { useMe } from "@/hooks/api/user/useMe";
import { motion } from "framer-motion";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";
export default function MobileNavigation({
  children,
}: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { isAuthorized } = useMe();
  // const [_, setDrawerView] = useAtom(drawerAtom);

  // const hasFilter = `[manufacturer], ${ROUTES?.SEARCH}`.includes(
  //   router.pathname.split('/').pop()!
  // );

  // const { totalUniqueItems } = useCart();

  // function handleSidebar(view: string) {
  //   setDrawerView({ display: true, view });
  // }

  return (
    <div className="visible h-12 lg:hidden md:h-14">
      <nav className="h-12 md:h-14 w-full py-1.5 px-2 flex justify-between fixed ltr:left-0 rtl:right-0 bottom-0 z-10 bg-light shadow-400">
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
        >
          <span className="sr-only">burger menu</span>
          {/* <NavbarIcon className={`${'transform rotate-180'}`} /> */}
        </motion.button>

        {children}

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => router.push("/")}
          className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
        >
          <span className="sr-only">home</span>
          <HomeIcon />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.88 }}
          // onClick={() => handleSidebar("cart")}
          className="relative flex items-center justify-center h-full p-2 product-cart focus:outline-none focus:text-accent"
        >
          <span className="sr-only">cart</span>
          {/* <ShoppingBagIcon /> */}
          {/* {totalUniqueItems > 0 && (
            <span className="bg-accent py-1 px-1.5 text-10px leading-none font-semibold text-light rounded-full absolute top-0 ltr:right-0 rtl:left-0 mt-0.5 ltr:-mr-0.5 rtl:-ml-0.5">
              {totalUniqueItems}
            </span>
          )} */}
        </motion.button>

        {isAuthorized ? (
          <motion.button
            whileTap={{ scale: 0.88 }}
            // onClick={() => handleSidebar("AUTH_MENU_VIEW")}
            className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
          >
            <span className="sr-only">user</span>
            <Icons.user />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
          >
            <span className="sr-only">user</span>
            <Link href={"/login"}>
              <Icons.user />
            </Link>
          </motion.button>
        )}
      </nav>
    </div>
  );
}
