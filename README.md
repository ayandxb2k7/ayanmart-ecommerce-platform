# AyanMart — Full Stack E-Commerce Platform

A production-style full stack e-commerce project built with Next.js, Prisma, SQLite and JWT authentication.

## Features

- User signup/login
- JWT authentication
- Product listing
- Add to cart
- Checkout flow
- Stock decrement during checkout
- Order history
- Admin product creation
- SQLite database using Prisma ORM
- Clean API route structure

## Tech Stack

- Next.js 14
- Prisma ORM
- SQLite
- JWT
- bcryptjs
- React

## Setup

```bash
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Demo Accounts

Admin:

```txt
admin@ayanmart.com
admin123
```

User:

```txt
user@ayanmart.com
user123
```

## Why this project matters

This project demonstrates end-to-end full stack development including authentication, database design, backend APIs, protected routes, order processing and admin functionality.
