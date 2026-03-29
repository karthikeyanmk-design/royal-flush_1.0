"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const GameCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-[110px] md:w-[136px]">
      <Skeleton className="w-full h-[147px] md:h-[182px] rounded-lg mb-1" />
      <div className="flex items-center gap-1">
        <Skeleton className="w-1.5 h-1.5 rounded-full" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};
