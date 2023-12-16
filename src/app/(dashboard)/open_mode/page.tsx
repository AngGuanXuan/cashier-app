import React from "react";
import Link from "next/link";

const OpenMode = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-8/12">
        <header className="flex items-center min-w-full space-x-8 p-4">
          <div className="dropdown text-black">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/admin">Dashboard</Link>
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
          <h1 className="badge badge-error text-lg font-bold uppercase text-white p-5 pointer-events-none">
            Open Now
          </h1>
        </header>
        <div className="p-4">
          <button className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end"></div>
            </div>
          </button>
        </div>
      </div>
      <div className="w-4/12 p-4">
        <div className="bg-indigo-950/50 shadow-lg rounded-md h-full"></div>
      </div>
    </div>
  );
};

export default OpenMode;
