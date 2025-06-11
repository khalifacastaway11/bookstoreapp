# Bookstore App

Bookstore App is a full-stack web application for browsing, purchasing, and managing books online. It features user authentication, admin controls, secure payments, and a modern React frontend.

## Features

- **User Authentication:** Register, login, logout, and JWT-based session management.
- **Profile Management:** Users can view and update their profile information.
- **Password Reset:** Secure password reset via email.
- **Admin Controls:** Admin users can access protected routes and manage the bookstore.
- **Book Catalog:** Browse a collection of books with details like title, author, genre, price, and stock.
- **Shopping Cart:** Add books to a cart and manage quantities.
- **Checkout & Payments:** Secure checkout with Stripe and PayPal integration.
- **Order History:** Users can view their past orders.
- **Responsive UI:** Built with React and Bootstrap for a modern, mobile-friendly experience.

## Tech Stack

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT, bcrypt
- **Payments:** Stripe, PayPal
- **Email:** Nodemailer (for password reset)
- **Other:** dotenv for environment variables, Git for version control

## Getting Started

1. Clone the repository.
2. Install dependencies for both frontend and backend.
3. Set up your `.env` files with your own secrets and API keys.
4. Start the backend and frontend servers.
5. Visit the app in your browser.

## Folder Structure

- `/bookstore-frontend` — React frontend
- `/controllers`, `/routes`, `/models` — Express backend structure
- `.env` — Environment variables (not tracked in git)

## Security

- **Never commit secrets or API keys to the repository.** Use environment variables.
- All sensitive routes are protected with authentication middleware.

---

Feel free to modify or expand this description to fit your app’s unique features!
