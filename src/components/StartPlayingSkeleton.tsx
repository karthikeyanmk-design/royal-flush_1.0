"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const StartPlayingSkeleton = () => {
  return (
    <section className="px-3 md:px-4 py-2 md:py-3">
      <div className="flex items-center gap-2 mb-2 md:mb-3">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        <div className="rounded-lg overflow-hidden">
          <Skeleton className="w-full h-28 md:h-36" />
          <div className="bg-card/95 px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <Skeleton className="w-full h-28 md:h-36" />
          <div className="bg-card/95 px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      </div>
    </section>
  );
};
