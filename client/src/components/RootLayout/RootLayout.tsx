import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <>
      <div className="min-h-screen w-screen">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <Navbar />
            <Outlet />
          </div>
          <div className="drawer-side w-screen overflow-hidden">
            <label
              htmlFor="my-drawer-3"
              className="drawer-overlay h-screen"
            ></label>

            <ul className="menu p-4 w-80 h-full bg-gray-800 text-slate-200">
              <div className="flex px-2 mx-2 justify-center py-12">
                <img className="w-auto h-20 ml-6" src="\images\logo1.svg" />
              </div>
              <Link
                to="/"
                className="btn btn-ghost normal-case text-lg hidden sm:flex"
              >
                Home
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
