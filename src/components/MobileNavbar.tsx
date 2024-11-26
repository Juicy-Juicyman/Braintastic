"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const getLinkClass = (href: string) =>
    `text-lg font-medium ${
      pathname === href
        ? "text-yellow-300" 
        : "text-purple-600 hover:text-yellow-400" 
    }`;

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={toggleMenu}
        className="text-white p-2 rounded-md hover:bg-purple-500 focus:outline-none"
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white rounded-md shadow-lg p-4 z-50">
          <ul className="space-y-4 text-purple-600 text-lg font-medium">
            <li>
              <Link
                href="/"
                className={getLinkClass("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/games"
                className={getLinkClass("/games")}
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={getLinkClass("/about")}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
