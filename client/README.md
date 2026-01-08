# Hotel Booking Management System

A full-stack hotel booking application that allows users to browse rooms, make secure bookings, and manage their reservations, while providing administrators with powerful tools to oversee bookings and room allocations.

This project was built to model how a real hotel reservation system works in production, with a strong focus on authentication, authorization, data integrity, and admin workflows.

---

## Features

### User Features
- User authentication (sign up, login, logout) with session-based auth
- Browse available room types with detailed descriptions and pricing
- Book rooms by room type (not physical room numbers)
- View personal booking history in a profile dashboard
- Cancel bookings (status-based cancellation, not hard deletes)
- Secure access to protected routes

---

###  Admin Features
- Admin-only dashboard with full visibility of all bookings
- Assign physical rooms to confirmed bookings
- Cancel any booking when necessary
- View booking status (paid, cancelled)
- Prevent double assignment of physical rooms using database constraints
- Role-based access control (admin vs user)

---

## System Design Highlights

- **Room Type vs Physical Room separation**  
  Users book *room types* (e.g. Deluxe, Standard), while admins later assign *physical rooms* (e.g. Room 101).  
  This mirrors how real hotels operate and prevents overbooking errors.

- **Data Integrity First**  
  Physical room numbers are enforced as `UNIQUE` at the database level, ensuring that no two bookings can be assigned the same room.

- **Status-Based Booking Management**  
  Bookings are cancelled by updating status instead of deleting records, preserving history and ensuring auditability.

- **Role-Based Authorization**  
  Access to admin routes and actions is strictly controlled using session roles.

---

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express
- SQLite
- Session-based authentication

---

## Security & Access Control

- Session-based authentication using HTTP-only cookies
- Protected routes for authenticated users
- Admin-only middleware for sensitive operations
- Ownership checks to ensure users can only manage their own bookings

---

## Future Improvements
- Automatic physical room allocation
- Date-based availability checking
- Payment gateway integration
- Booking analytics for admins
- Improved admin search and filtering

---

## Purpose

This project was built to demonstrate real-world backend and frontend patterns, including:
- clean API design
- secure authentication flows
- admin-user role separation
- database-driven business rules