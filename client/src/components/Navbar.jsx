import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-evenly z-[1000] items-center mb-4 bg-zinc-800 backdrop-blur-sm bg-opacity-80 sticky top-0 p-4">
      <h1 className="font-extrabold text-2xl text-pink-500">Bookitup</h1>
      <ul className="flex gap-8">
        <li className="font-semibold underline">
          <a className={"hover:text-blue-500"} href="/">
            Ticket
          </a>
        </li>
        <li className="font-semibold">
          <a
            className={"hover:text-blue-500"}
            target="_blank"
            href="https://mskp.vercel.app"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
