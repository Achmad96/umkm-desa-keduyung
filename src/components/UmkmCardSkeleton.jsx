import React from "react";

export default function UMKMCardSkeleton() {
  return (
    <div className="flex flex-col bg-primary-dark/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/10 animate-pulse block"></div>

      <div className="p-6 flex flex-col grow">
        <div className="h-6 w-3/4 bg-white/20 rounded animate-pulse mb-4"></div>
        <div className="space-y-2 mb-6 grow">
          <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse"></div>
        </div>

        <div className="flex gap-3 justify-end mt-auto">
          <div className="w-11 h-11 rounded-full bg-white/20 animate-pulse"></div>
          <div className="w-11 h-11 rounded-full bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
