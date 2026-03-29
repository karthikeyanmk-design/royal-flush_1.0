"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const SportCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-[110px] md:w-[136px]">
      <Skeleton className="w-full h-[147px] md:h-[182px] rounded-lg" />
    </div>
  );
};
