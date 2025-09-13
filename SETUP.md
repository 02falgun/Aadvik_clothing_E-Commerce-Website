# Aadvik Clothing - E-commerce Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/aadvik-clothing
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadvik-clothing

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env.local` file

3. **Set up Stripe** (for payments)
   - Create a Stripe account
   - Get your API keys from the Stripe dashboard
   - Update the Stripe keys in your `.env.local` file

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Implemented

### ✅ Completed

- Project structure with TypeScript
- MongoDB models (User, Product, Order, Category)
- API routes for authentication and products
- Responsive UI components (Header, Footer, ProductCard)
- Modern homepage with hero section and featured products
- Database connection utility

### 🚧 In Progress

- User authentication system
- Product management
- Shopping cart functionality
- Stripe payment integration

### 📋 TODO

- User registration/login pages
- Product detail pages
- Shopping cart page
- Checkout process
- Order management
- Admin dashboard
- Email notifications
- Search and filtering
- Image upload functionality

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── products/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/
│   └── mongodb.ts
├── models/
│   ├── User.ts
│   ├── Product.ts
│   ├── Order.ts
│   └── Category.ts
└── types/
    └── index.ts
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Payments**: Stripe
- **UI Components**: Lucide React, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Email**: Nodemailer
- **Charts**: Chart.js, Recharts

## Next Steps

1. Set up your environment variables
2. Create a MongoDB database
3. Run the development server
4. Start building additional features as needed

For any questions or issues, please refer to the individual component documentation or create an issue in the repository.
