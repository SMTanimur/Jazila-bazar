"use client";

import { useGlobalModalStateStore } from "@/store/modal";
import MobileAuthorizedMenu from "../layout/mobile-menu/mobile-authorized-menu";
import MobileMainMenu from "../layout/mobile-menu/mobile-main-menu";
import Drawer from "../ui/drawer";

const GlobalModals = () => {
  const globalModal = useGlobalModalStateStore((state) => state);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Drawer
        open={globalModal.userMenu}
        onClose={() => globalModal.closeUserMenu()}
        variant={"right"}
      >
        {globalModal.userMenu && <MobileAuthorizedMenu />}
      </Drawer>
      <Drawer
        open={globalModal.menubar}
        onClose={() => globalModal.closeMenubar()}
        variant={"left"}
      >
        {globalModal.menubar && <MobileMainMenu />}
        {/* <MobileMainMenu /> */}
      </Drawer>
    </>
  );
};

export default GlobalModals;
