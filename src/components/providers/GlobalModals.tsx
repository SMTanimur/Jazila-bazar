"use client";

import {QuickViewProduct} from "@/modules/products/quickView";
import { useGlobalModalStateStore } from "@/store/modal";
import MobileAuthorizedMenu from "../layout/mobile-menu/mobile-authorized-menu";
import MobileMainMenu from "../layout/mobile-menu/mobile-main-menu";
import { Modal } from "../ui/Modal";
import Drawer from "../ui/drawer";
import dynamic from "next/dynamic";
import PostQuestionModal from "@/modules/products/productQuestion/postQuestionModal";
const CartSidebar = dynamic(() => import('@/components/cart/cart-sidebar-view'), {
  ssr: false,
});
const GlobalModals = () => {
  const globalModal = useGlobalModalStateStore((state) => state);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className="p-3">
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

      <Drawer
        open={globalModal.cartState}
        onClose={() => globalModal.closeCartState()}
        variant={"right"}
      >
        {globalModal.cartState && <CartSidebar />}
        {/* <MobileMainMenu /> */}
      </Drawer>

      <Modal
        size="md"
        show={globalModal.quickView}
        onClose={() => globalModal.setQuickViewState(false, null)}
      >
        <QuickViewProduct />
      </Modal>

      <Modal
        size="sm"
        title="Ask a question"
        show={globalModal.showPostQuestion}
        onClose={() => globalModal.setPostQuestionState(false, null)}
      >
        <PostQuestionModal />
      </Modal>
    </div>
  );
};

export default GlobalModals;
