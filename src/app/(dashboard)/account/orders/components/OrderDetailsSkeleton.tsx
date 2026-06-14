import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Order Header Skeleton */}
      <Card className="border-slate-100 dark:border-slate-800">
        <CardHeader className="p-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2 border-t border-slate-50 dark:border-slate-850">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2 p-3.5 rounded-xl border border-slate-100/50 dark:border-slate-850/50">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tracker Timeline Skeleton */}
      <Card className="border-slate-100 dark:border-slate-800">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-1.5 flex-1 md:flex-initial">
                  <Skeleton className="h-4 w-20 md:mx-auto" />
                  <Skeleton className="h-3 w-16 md:mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Items Skeleton */}
      <Card className="border-slate-100 dark:border-slate-800">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-28 mb-1" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="grid gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-4 p-4 border border-slate-100 dark:border-slate-850 rounded-xl"
              >
                <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <Skeleton className="h-5 w-48 sm:w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-col justify-center">
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid: Shipping Address & Order Summary Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address Skeleton */}
        <Card className="border-slate-100 dark:border-slate-800">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent className="p-6 pt-2 space-y-4">
            <div className="p-4 rounded-xl border border-slate-100/50 dark:border-slate-850/50 space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
              <div className="border-t border-slate-100 dark:border-slate-850 pt-3 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </CardContent>
        </Card>

        {/* Order Summary Skeleton */}
        <Card className="border-slate-100 dark:border-slate-800">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-28 mb-1" />
            <Skeleton className="h-4 w-52" />
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="p-4 rounded-xl border border-slate-100/50 dark:border-slate-850/50 space-y-3.5">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
