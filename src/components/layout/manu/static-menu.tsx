import { ROUTES } from "@/configs/routes";
import Link from "next/link";

const headerLinks = [
  { href: ROUTES.SHOPS, icon: null, label: "Shops" },
  { href: ROUTES.OFFERS, icon: null, label: "Offer" },
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
            className="font-normal text-gray-900  flex items-center transition duration-200 no-underline hover:text-gray-300 focus:text-accent"
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
