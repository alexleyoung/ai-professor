"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const path = usePathname();

  return (
    <header className='fixed w-full flex gap-2 items-center justify-between bg-background z-50'>
      <div className='flex gap-4 items-center'>
        <Link href='/' className='p-5 text-xl font-bold'>
          ai-professor
        </Link>
        <Link
          href='/search'
          className={cn(
            "text-xl px-2 py-1 rounded-lg hover:bg-muted transition-colors",
            path === "/search" ? "" : "text-primary/50"
          )}>
          search
        </Link>
        <Link
          href='/professors'
          className={cn(
            "text-xl px-2 py-1 rounded-lg hover:bg-muted transition-colors",
            path === "/professors" ? "" : "text-primary/50"
          )}>
          professors
        </Link>
      </div>
    </header>
  );
}
