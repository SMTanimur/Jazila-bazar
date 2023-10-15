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
        <li key={`${href}${label}`}>
          <Link
            href={href}
            className="font-normal text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
          >
            {icon && <span className="ltr:mr-2 rtl:ml-2">{icon}</span>}
            {label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default StaticMenu;
