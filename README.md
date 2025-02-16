# Jewelry Store Admin Panel

An administrative panel for managing an online jewelry store, enabling staff to add and update products, collections, and orders. Built with Next.js, TypeScript, and MongoDB, featuring Clerk for authentication and Stripe for payment tracking. Optimized for streamlined business operations.

## Features
- **Product Management**: Add, update, and delete jewelry products.
- **Collection Management**: Organize products into collections.
- **Order Management**: View and process customer orders.
- **User Authentication**: Secure login with Clerk.
- **Payment Tracking**: Integrated with Stripe for payment monitoring.
- **Responsive Design**: Optimized for all screen sizes.
- **PDF Export**: Generate and download order details as PDFs.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, MongoDB
- **Authentication**: Clerk
- **Payments**: Stripe
- **Other Libraries**: Radix UI, React Hook Form, Recharts, Nodemailer, html2canvas, jspdf

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/jewelry_admin.git
   ```
2. Navigate to the project folder:
   ```sh
   cd jewelry_admin
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env.local` file and add necessary environment variables:
   ```sh
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-api>
   MONGODB_URI=<your-mongodb-uri>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts
- `npm run dev` – Start the development server.
- `npm run build` – Build the application for production.
- `npm run start` – Run the built application.
- `npm run lint` – Run ESLint to check code quality.

## Dependencies
```json
{
  "@clerk/nextjs": "^5.2.8",
  "@hookform/resolvers": "^3.9.0",
  "@radix-ui/react-alert-dialog": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.1",
  "@tanstack/react-table": "^8.19.3",
  "mongoose": "^8.5.1",
  "next": "^14.2.5",
  "react": "^18.3.1",
  "stripe": "^16.5.0",
  "tailwindcss": "^3.4.1"
}
```



