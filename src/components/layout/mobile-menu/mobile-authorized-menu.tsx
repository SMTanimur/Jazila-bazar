import DrawerWrapper from "@/components/ui/drawer-wrapper";
import { siteConfig } from "@/configs/site";
import { useGlobalModalStateStore } from "@/store/modal";
import { useRouter } from "next/navigation";
export default function MobileAuthorizedMenu() {
  const router = useRouter();
  const globalModal = useGlobalModalStateStore();
  function handleClick(path: string) {
    router.push(path);
    globalModal.closeUserMenu();
  }
  return (
    <DrawerWrapper closeSidebar={globalModal.closeUserMenu}>
      <ul className="flex-grow">
        {siteConfig.authorizedLinksMobile.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <span
              className="block px-5 py-3 text-sm font-semibold capitalize transition duration-200 cursor-pointer md:px-8 text-heading hover:text-primary"
              onClick={() => handleClick(href)}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}
