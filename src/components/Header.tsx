"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const path = usePathname();

  return (
    <header className='fixed p-4 flex gap-2 justify-between bg-background'>
      <div className='flex gap-2'>
        <Link href='/' className='text-xl font-bold'>
          ai-professor
        </Link>
        <Link
          href='/search'
          className={cn(
            "text-xl hover:text-primary transition-colors",
            path === "/search" ? "" : "text-primary/50"
          )}>
          Search
        </Link>
        <Link
          href='/professors'
          className={cn(
            "text-xl hover:text-primary transition-colors",
            path === "/professors" ? "" : "text-primary/50"
          )}>
          Professors
        </Link>
      </div>
    </header>
  );
}
