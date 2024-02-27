import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <Link to="/">
          <h1 className="flex flex-wrap text-xl font-bold sm:text-2xl md:text-3xl">
            <span className="text-slate-500">Uhuyy</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <form className="flex items-center rounded-lg bg-slate-100 p-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-40 bg-transparent focus:outline-none sm:w-64"
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <div className="block lg:hidden">
            <MobileMenu />
          </div>
          <ul className="hidden gap-4 lg:flex ">
            <Link to="/">
              <li className="hidden text-slate-700 hover:underline sm:inline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden text-slate-700 hover:underline sm:inline">
                About
              </li>
            </Link>
            <Link to="/profile">
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
