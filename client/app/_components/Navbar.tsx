"use client";

import Link from "next/link";
import ConnectButton from "./ConnectButton";

export default function Navbar() {
  return (
    <div className="navbar bg-black">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 border border-white bg-base-200 p-2 shadow-lg shadow-black"
          >
            <li>
              <Link
                className="rounded-none"
                href={"/"}
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="rounded-none"
                href={"/protected"}
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
              >
                Protected
              </Link>
            </li>
            <li>
              <Link
                className="rounded-none"
                href={"/about"}
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <p className="text-lg">BOILERPLATE</p>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
    </div>
  );
}
