import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = ({ theme, toggleTheme }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = () => {
    signOutUser();
    setIsOpen(false); // close mobile menu on logout
  };
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="w-11/12 mx-auto my-3 bg-gradient-to-r from-blue-100 to-slate-100 shadow-md hover:shadow-sm transition-shadow p-2 font-semibold">
      <div className="flex justify-between items-center">
        {/* Logo */}

        <div className="flex items-center gap-2 font-bold text-xl">
          <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
          <p className="text-primary">
            Hobby<span className="text-accent">Hub</span>
          </p>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[18px] ${
                isActive
                  ? "underline underline-offset-8 decoration-2 decoration-primary"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
          {
            <>
              <NavLink
                to="/groups"
                className={({ isActive }) =>
                  `text-[18px] ${
                    isActive
                      ? "underline underline-offset-8 decoration-2 decoration-primary"
                      : ""
                  }`
                }
              >
                All Groups
              </NavLink>
              <NavLink
                to="/createGroup"
                className={({ isActive }) =>
                  `text-[18px] ${
                    isActive
                      ? "underline underline-offset-8 decoration-2 decoration-primary"
                      : ""
                  }`
                }
              >
                Create Group
              </NavLink>
              <NavLink
                to="/myGroups"
                className={({ isActive }) =>
                  `text-[18px] ${
                    isActive
                      ? "underline underline-offset-8 decoration-2 decoration-primary"
                      : ""
                  }`
                }
              >
                My Groups
              </NavLink>
            </>
          }
        </div>

        {/* Desktop User Auth */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              {/* User icon with tooltip */}
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
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
            <Link className="btn btn-primary px-6 py-2" to="/login">
              Login
            </Link>
          )}
          {isHomePage && (
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-sm"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-lg" />
              ) : (
                <FaSun className="text-lg" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-white p-4 rounded shadow">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[18px] ${
                isActive
                  ? "underline underline-offset-8 decoration-2 decoration-primary"
                  : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/groups"
                className={({ isActive }) =>
                  `text-[18px] ${
                    isActive
                      ? "underline underline-offset-8 decoration-2 decoration-primary"
                      : ""
                  }`
                }
              >
                All Groups
              </NavLink>
              <NavLink
                to="/createGroup"
                className={({ isActive }) =>
                  `text-[18px] ${
                    isActive
                      ? "underline underline-offset-8 decoration-2 decoration-primary"
                      : ""
                  }`
                }
              >
                Create Group
              </NavLink>
              <NavLink
                to="/myGroups"
                className={({ isActive }) =>
                  `text-[18px] ${
                    isActive
                      ? "underline underline-offset-8 decoration-2 decoration-primary"
                      : ""
                  }`
                }
              >
                My Groups
              </NavLink>
            </>
          )}
          <div className="flex items-center gap-3 mt-3">
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                {/* <span>{user.email}</span> */}
                <button
                  onClick={handleSignOut}
                  className="btn px-4 py-2 btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="btn px-4 py-2 btn-primary"
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            {isHomePage && (
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-sm"
                title="Toggle theme"
              >
                {theme === "light" ? (
                  <FaMoon className="text-lg" />
                ) : (
                  <FaSun className="text-lg" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
