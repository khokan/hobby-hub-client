import { useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router"; // fix
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = ({ theme, toggleTheme }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleSignOut = () => {
    signOutUser();
    setIsOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-[18px] transition hover:text-primary ${
      isActive
        ? "underline underline-offset-8 decoration-2 decoration-primary"
        : ""
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/groups" className={navLinkClass}>
        All Groups
      </NavLink>
      {user && (
        <NavLink to="/dashboard/overview" className={navLinkClass}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-11/12 p-2 font-semibold shadow-md bg-gradient-to-r from-blue-100 to-slate-100">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
          <p className="text-primary">
            Hobby<span className="text-accent">Hub</span>
          </p>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">{links}</div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              {/* User Avatar Tooltip */}
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                  {user.displayName || user.email}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="btn btn-primary px-6 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary px-6 py-2">
              Login
            </Link>
          )}
          {isHomePage && (
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-sm"
              title="Toggle Theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-white p-4 rounded shadow flex flex-col gap-3">
          {links}
          <div className="flex items-center gap-3 mt-3">
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleSignOut}
                  className="btn btn-primary px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary px-4 py-2"
              >
                Login
              </Link>
            )}
            {isHomePage && (
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-sm"
                title="Toggle Theme"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
