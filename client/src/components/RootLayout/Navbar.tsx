import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="w-screen navbar bg-base-100 mb-5">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-none px-2 mx-2">
          <img className="w-auto h-12" src="\images\logo1.svg" />
        </div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            <Link
              to="/"
              className="btn btn-ghost normal-case text-lg hidden sm:flex"
            >
              Home
            </Link>
          </ul>
        </div>
      </div>                
    </>
  );
}
