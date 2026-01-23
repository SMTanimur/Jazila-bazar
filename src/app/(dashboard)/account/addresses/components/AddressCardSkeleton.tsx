import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function AddressCardSkeleton(props: Props) {
  const { className, ...rootProps } = props;

  return (
    <Card className={cn("min-h-[350px] relative", className)} {...rootProps}>
      <div className="absolute top-2 right-3">
        <Skeleton className="h-5 w-16" />
      </div>
      <CardContent className="flex flex-col gap-3 p-6">
        {/* Name */}
        <Skeleton className="h-6 w-32" />
        
        {/* Address lines */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-36" />
        </div>

        {/* Phone section */}
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Email section */}
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-40" />
        </div>

        {/* Footer buttons */}
        <div className="flex gap-4 mt-7">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressCardSkeleton;
