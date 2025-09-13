# 🚀 Quick Start Guide

## 1. Environment Setup

Create a `.env.local` file in the root directory with this content:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/aadvik-clothing

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-for-production
JWT_EXPIRES_IN=7d

# Stripe Payment Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@aadvikclothing.com

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 2. Generate JWT Secret

Visit https://generate-secret.vercel.app/32 to generate a secure JWT secret and replace `your-super-secret-jwt-key-here-make-it-long-and-random-for-production` with the generated value.

## 3. MongoDB Setup

### Option A: Local MongoDB

If you have MongoDB installed locally, the default URI will work.

### Option B: MongoDB Atlas (Recommended)

1. Go to https://cloud.mongodb.com/
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace the MONGODB_URI with your Atlas connection string

## 4. Restart Development Server

After setting up the environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## 5. Seed the Database

Once the server is running without errors:

```bash
npm run seed
```

## 6. Test the Application

- Visit http://localhost:3000
- Try registering a new user
- Browse products
- Test the admin dashboard (admin@aadvikclothing.com / admin123)

## 7. Optional: Stripe Setup (for payments)

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the dashboard
3. Update STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY in .env.local

## 8. Optional: Email Setup (for notifications)

1. Use Gmail with App Password:
   - Enable 2-factor authentication
   - Generate an app password
   - Use your Gmail address and app password in .env.local

---

**That's it! Your e-commerce platform should now be fully functional.**
