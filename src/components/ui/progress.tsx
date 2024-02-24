import { cn } from "@/lib/utils";
import { IColor } from "@/types/utils";
import { getColorClass } from "@/utils/get-color-class";
import React from "react";


interface ProgressBarProps {
  value: number;
  color?: IColor;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "rose",
  animated = false,
}) => {
  return (
    <div className="h-3 bg-gray-300 rounded-[0.25rem] overflow-hidden">
      <div
        className={cn(getColorClass(color), "h-full")}
        style={{
          width: `${value}%`,
          animation: animated ? "stripes 1s linear infinite" : "none",
          backgroundImage: `linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)`,
          backgroundSize: "1rem 1rem",
        }}
      ></div>
    </div>
  );
};

interface MultiProgressBarProps {
  bars: { value: number; color?: IColor; animated?: boolean }[];
}

const MultiProgressBar: React.FC<MultiProgressBarProps> = ({ bars }) => {
  return (
    <div>
      {bars.map(({value,animated,color="rose"}, index) => (
        <div key={index} className="h-3 bg-gray-300 rounded-[0.25rem] overflow-hidden my-4">
          <div
            className={cn(getColorClass(color), "h-full")}
            style={{
              width: `${value}%`,
              animation: animated ? "stripes 1s linear infinite" : "none",
              backgroundImage: `linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)`,
              backgroundSize: "1rem 1rem",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export { MultiProgressBar, ProgressBar };
