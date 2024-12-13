"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
  const pathname = usePathname();

  const getLinkClass = (href: string) =>
    `text-xl font-medium ${
      pathname === href
        ? "text-yellow-300" 
        : "text-white hover:text-yellow-200" 
    }`;

  return (
    <ul className="hidden md:flex space-x-10">
      <li>
        <Link href="/" className={getLinkClass("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/games" className={getLinkClass("/games")}>
          Games
        </Link>
      </li>
      <li>
        <Link href="/highscore" className={getLinkClass("/highscore")}>
          Highscores
        </Link>
      </li>
      <li>
        <Link href="/about" className={getLinkClass("/about")}>
          About
        </Link>
      </li>
    </ul>
  );
}
