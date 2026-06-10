# OIBSIP - Level 3 Task
# Pizza Delivery Application

## Internship Details

- Internship: Oasis Infobyte Web Development & Designing Internship
- Task Level: Level 3
- Project Title: Pizza Delivery Application

---

## Project Overview

A full-stack Pizza Delivery Application built using the MERN Stack.

The application allows users to:

- Register and Login
- Browse available pizzas
- Add pizzas to cart
- Manage cart items
- Calculate total order amount
- Place orders
- View order history

---

## Tech Stack

### Frontend
- React.js
- Vite
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JSON Web Token (JWT)

---

## Features Implemented

### User Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Pizza Menu
- View available pizzas
- Display pizza details and pricing

### Cart Management
- Add items to cart
- Update quantity
- View cart items
- Calculate total price

### Order Management
- Place orders
- Store orders in MongoDB
- View user orders

---

## Project Structure

```text
Pizza_Delivery
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── server.js
│   │
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── context
│   │
│   └── public
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/palpriyadarshini-pixel/OIBSIP.git>
cd Pizza_Delivery
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Running the Application

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Cart

```http
POST /api/cart
GET /api/cart
PUT /api/cart/:id
DELETE /api/cart/:id
```

### Orders

```http
POST /api/orders
GET /api/orders/my-orders
```

---

## Future Enhancements

- Custom Pizza Builder
- Razorpay Payment Gateway
- Admin Dashboard
- Inventory Management
- Email Verification
- Forgot Password Functionality
- Order Status Tracking

---

## Author

Priyadarshini Pal

Oasis Infobyte Internship Project (OIBSIP)
