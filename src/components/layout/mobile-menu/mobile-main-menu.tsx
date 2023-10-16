import { useRouter } from "next/router";

import DrawerWrapper from "@/components/ui/drawer-wrapper";
import { ROUTES } from "@/configs/routes";
import { useGlobalModalStateStore } from "@/store/modal";

const headerLinks = [
  { href: ROUTES.SHOPS, label: "Shops" },
  { href: ROUTES.MANUFACTURERS, label: "text-manufacturers" },
  { href: ROUTES.AUTHORS, label: "User" },
  { href: ROUTES.OFFERS, label: "Offer" },
  { href: ROUTES.HELP, label: "Faq" },
  { href: ROUTES.CONTACT, label: "Contact" },
];
type DrawerWrapperProps = {};

export default function MobileMainMenu() {
  const router = useRouter();
  const globalmodal = useGlobalModalStateStore((state) => state);
  function handleClick(path: string) {
    router.push(path);
    globalmodal.closeMenubar();
  }

  return (
    <DrawerWrapper closeSidebar={globalmodal.closeMenubar}>
      <ul className="flex-grow">
        {headerLinks.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <button
              onClick={() => handleClick(href)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}
