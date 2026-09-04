"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, SlidersHorizontal } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/walk") return null;
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      <Link className={pathname === "/" ? "nav-item active" : "nav-item"} href="/">
        <Home size={19} strokeWidth={1.8} />
        <span>Today</span>
      </Link>
      <Link className={pathname === "/flow" ? "nav-item active" : "nav-item"} href="/flow">
        <SlidersHorizontal size={19} strokeWidth={1.8} />
        <span>Order</span>
      </Link>
    </nav>
  );
}
