import { cn } from "@/lib/utils";
import { PartialOptions } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

type ScrollbarProps = {
  options?: PartialOptions;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  options,
  className,
  style,
  children,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: "scroll" },
        ...(options ? options : {}),
      }}
      className={cn("os-theme-thin-dark", className)}
      style={style}
      defer
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
