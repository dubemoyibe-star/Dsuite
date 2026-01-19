import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {

  const navLinkClassMobile = ({ isActive }) =>
    `font-bold text-lg cursor-pointer decoration-2 transition-all duration-300
     ${
       isActive
         ? "text-yellow-700 underline underline-offset-6"
         : "hover:text-yellow-700 hover:underline hover:underline-offset-6"
     }`;

  return (
    <section className="mx-auto px-4 pt-42 pb-28 bg-gray-100 lg:px-16">
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <nav className="flex gap-6 mb-12">
        <NavLink
          to="bookings"
          className={navLinkClassMobile}
        >
          Bookings
        </NavLink>

        <NavLink
          to="messages"
          className={navLinkClassMobile}
        >
          Messages
        </NavLink>
      </nav>

      <Outlet />
    </section>
  );
}