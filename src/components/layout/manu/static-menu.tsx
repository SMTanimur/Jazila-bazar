import { ROUTES } from "@/configs/routes";
import Link from "next/link";

const headerLinks = [
  { href: ROUTES.SHOPS, icon: null, label: "Shops" },
  { href: ROUTES.SHOPS, icon: null, label: "Offer" },
  { href: ROUTES.HELP, label: "Faq" },
  { href: ROUTES.CONTACT, label: "Contact" },
];

const StaticMenu = () => {
  return (
    <>
      {headerLinks.map(({ href, label, icon }) => (
        <li key={`${href}${label}`} className="list-none">
          <Link
            href={href}
            className="font-normal text-gray-900 dark:text-white  flex items-center transition duration-200 no-underline hover:text-primary dark:hover:text-gray-200 focus:text-primary"
          >
            {icon && <span className="mr-2 ">{icon}</span>}
            {label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default StaticMenu;
