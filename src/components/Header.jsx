import React from 'react'
import logo from '../assets/logo.png' 
import {  NavLink, useNavigate} from 'react-router-dom';
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const { isAuth, loading,  logout, user } = React.useContext(AuthContext);

  const handleLogout = async () => {
    try {
       await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      await logout();
    navigate("/", { replace: true });
    } catch (error) {
      console.log(error)
    }
 
  };

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const navLinkClassMobile = ({ isActive }) =>
    `font-bold cursor-pointer decoration-2 transition-all duration-300
     ${
       isActive
         ? "text-yellow-700 underline underline-offset-6"
         : "hover:text-yellow-700 hover:underline hover:underline-offset-6"
     }`;

  const navLinkClassDesktop = ({ isActive }) =>
    `font-bold text-lg decoration-2 cursor-pointer transition-all duration-300
     ${
       isActive
         ? "text-yellow-700 underline underline-offset-6"
         : "text-gray-700 hover:text-yellow-700 hover:underline hover:underline-offset-6"
     }`;

  return (
    <>
      {/* NAV (lower z so overlay can sit above it) */}
      <nav className="flex justify-between p-4 text-white shadow-2xl fixed w-full top-0 items-center backdrop-blur-sm z-10">
        <div>
          <div className='w-16 h-16 rounded-full bg-yellow-100'>
            <img src={logo} alt="Logo" className='w-full h-full object-contain'/>
          </div>
        </div>

        {/* desktop links */}
        <div className="hidden sm:flex gap-6 items-center justify-center">
          <NavLink to="/" className={navLinkClassDesktop}>Home</NavLink>
          <NavLink to="about" className={navLinkClassDesktop}>About</NavLink>
          <NavLink to="rooms" className={navLinkClassDesktop}>Rooms</NavLink>
          <NavLink to="faqs" className={navLinkClassDesktop}>FAQs</NavLink>
          <NavLink to="contact-us" className={navLinkClassDesktop}>Contact Us</NavLink>
          {!loading && (
        !isAuth ? (
          <NavLink
            to="/login"
            className={navLinkClassDesktop}
          >
            Log in
          </NavLink>
        ) : (
          <div className="flex items-center gap-4">

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className="text-lg text-shadow-sm font-bold text-purple-700 hover:text-purple-500"
              >
                Admin
              </NavLink>
            )}

              <NavLink
                to="/profile"
                className="text-lg text-yellow-700 hover:text-yellow-500 flex items-center"
              >
                <FaUserCircle className="w-8 h-8" />
              </NavLink>
            </div>
          )
        )}
        </div>

        {/* mobile menu button */}
        <LuMenu
          className="w-8 h-8 cursor-pointer sm:hidden text-yellow-700 hover:text-yellow-500 active:text-yellow-500"
          onClick={() => setOpen(true)}
        />
      </nav>

      {/* OVERLAY - sits above the nav and below the menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE MENU - on top of overlay */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/5 bg-gray-800 text-white sm:hidden flex flex-col gap-8 p-8 z-50 shadow-2xl transform transition-transform duration-700 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-expanded={open}
        aria-live="polite"
      >
        <IoMdClose
          className="w-8 h-8 mb-4 cursor-pointer hover:text-red-700 active:text-red-700"
          onClick={() => setOpen(false)}
        />
        <NavLink to="/" className={navLinkClassMobile} onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="about" className={navLinkClassMobile} onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="rooms" className={navLinkClassMobile} onClick={() => setOpen(false)}>Rooms</NavLink>
        <NavLink to="faqs" className={navLinkClassMobile} onClick={() => setOpen(false)}>FAQs</NavLink>
        <NavLink to="contact-us" className={navLinkClassMobile} onClick={() => setOpen(false)}>Contact Us</NavLink>
        {!loading && (
          !isAuth ? (
            <>
              <NavLink
                to="login"
                className={navLinkClassMobile}
                onClick={() => setOpen(false)}
              >
                Log in
              </NavLink>

              <NavLink
                to="signup"
                className={navLinkClassMobile}
                onClick={() => setOpen(false)}
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <NavLink
                  to="admin"
                  className={navLinkClassMobile}
                  onClick={() => setOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              )}

              <NavLink
                to="profile"
                className={navLinkClassMobile}
                onClick={() => setOpen(false)}
              >
                Profile
              </NavLink>

              <button
                className="mr-auto hover:text-yellow-700 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )
        )}
      </div>
    </>
  );
}