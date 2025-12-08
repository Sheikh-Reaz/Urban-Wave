import { Link, NavLink } from "react-router";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import "./Navbar.css"; // Import your CSS file

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navlink helvetica-compressed text-color ${isActive ? "active" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            `navlink helvetica-compressed text-color ${isActive ? "active" : ""}`
          }
        >
          All Product
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `navlink helvetica-compressed text-color ${isActive ? "active" : ""}`
          }
        >
          About Us
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/my-parcels"
              className={({ isActive }) =>
                `navlink helvetica-compressed text-color ${isActive ? "active" : ""}`
              }
            >
              My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `navlink helvetica-compressed text-color ${isActive ? "active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `navlink helvetica-compressed text-color ${isActive ? "active" : ""}`
          }
        >
        Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar   px-10 shadow-sm">
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
            tabIndex="-1"
            className="menu menu-sm dropdown-content background-color rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <span>
          <Logo />
        </span>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-navlink">{links}</ul>
      </div>

      <div className="navbar-end">
        <div className="mx-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {user ? (
          <button onClick={handleLogOut} className="btn">
            Log Out
          </button>
        ) : (
          <Link className="btn square-nav-normal" to="/login">
            Log in
          </Link>
        )}

        <Link className="btn square-nav-normal text-black mx-4" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
