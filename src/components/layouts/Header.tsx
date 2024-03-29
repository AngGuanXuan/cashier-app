import Link from "next/link";
import React from "react";
import { FaPowerOff } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a>List of Product</a>
                <ul className="p-2">
                  <li>
                    <Link href="/table">table</Link>
                  </li>
                  <li>
                    <Link href="/food&beverage">Food &amp; Beverage</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/rates">Hourly Rates</Link>
              </li>
              <li>
                <a>Settings</a>
                <ul className="p-2">
                  <li>
                    <Link href="/settings/general_settings">
                      General Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings/change_password">
                      Change Password
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className="btn btn-ghost text-xl uppercase font-bold"
            >
              LCCL Enterprise
            </Link>
            <Link
              href="/open_mode"
              className="btn btn-error text-white font-bold hover:shadow-md"
            >
              <FaPowerOff />
              Operate Now
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-lg px-1">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <details>
                <summary>List of Products</summary>
                <ul className="p-2 w-52">
                  <li>
                    <Link href="/table">table</Link>
                  </li>
                  <li>
                    <Link href="/food&beverage">Food &amp; Beverage</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/rates">Hourly Rates</Link>
            </li>
            <li>
              <details>
                <summary>Settings</summary>
                <ul className="p-2 w-52">
                  <li>
                    <Link href="/settings/general_settings">
                      General Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings/change_password">
                      Change Password
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-neutral">Sign Out</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
