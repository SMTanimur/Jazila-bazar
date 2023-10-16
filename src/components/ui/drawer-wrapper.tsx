import GradientLogo from "../common/shared/gradient-logo";
import { Icons } from "./icons";

type DrawerWrapperProps = {
  children: React.ReactNode;
  closeSidebar: () => void;
};

const DrawerWrapper = ({ children, closeSidebar }: DrawerWrapperProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="fixed top-0 z-20 mb-4 flex w-full max-w-md items-center justify-between border-b border-gray-200 border-opacity-75 bg-white p-5 md:mb-6">
        <GradientLogo />
        <button
          onClick={() => closeSidebar()}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-body transition-all duration-200 hover:primary hover:text-stone-100 focus:bg-primary focus:text-white focus:outline-0"
        >
          <span className="sr-only">close</span>
          <Icons.close className="h-2.5 w-2.5" />
        </button>
      </div>
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default DrawerWrapper;
