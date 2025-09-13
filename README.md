# Aadvik Clothing - Complete E-commerce Platform

A full-stack, production-ready e-commerce website built with Next.js 15, React 19, TypeScript, and MongoDB. This platform includes all essential e-commerce features, admin dashboard, analytics, and payment processing.

## 🚀 Features

### Customer Features

- **Modern Homepage** with hero banner, featured products, and newsletter subscription
- **Product Catalog** with advanced filtering, sorting, and search functionality
- **Product Details** with image carousel, size/color selection, and reviews
- **Shopping Cart** with persistent storage and real-time updates
- **Checkout Process** with multiple payment methods (Stripe, UPI, Bank Transfer, COD)
- **User Authentication** with JWT-based login, registration, and password reset
- **Order Management** with order history and tracking
- **Wishlist** functionality for saving favorite products
- **Contact Form** with email notifications and Google Maps integration
- **Newsletter Subscription** with automated email responses
- **Responsive Design** optimized for mobile, tablet, and desktop

### Admin Features

- **Admin Dashboard** with comprehensive analytics and KPIs
- **Product Management** with CRUD operations and bulk actions
- **Order Management** with status updates and customer communication
- **User Management** with role-based access control
- **Analytics Dashboard** with interactive charts and reports
- **Shop Management** with sales analytics, top products, and performance metrics
- **Email Notifications** for orders, users, and system events

### Technical Features

- **TypeScript** for type safety and better development experience
- **MongoDB** with Mongoose for data persistence
- **Stripe Integration** for secure payment processing
- **JWT Authentication** with role-based access control
- **Email System** with Nodemailer for notifications
- **Image Optimization** with Next.js Image component
- **SEO Optimization** with meta tags and structured data
- **Performance Optimization** with code splitting and lazy loading
- **Security** with input validation, CSRF protection, and rate limiting

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Recharts** - Chart library for analytics

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **Stripe** - Payment processing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Testing Library** - React testing utilities

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account
- Email service (Gmail, SendGrid, etc.)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd aadvik-clothing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/aadvik-clothing
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aadvik-clothing

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Stripe Payment Configuration
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

# Optional: Cloudinary for image uploads
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Optional: Mailchimp for newsletter
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_LIST_ID=your-mailchimp-list-id
```

### 4. Database Setup

```bash
# Seed the database with sample data
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄 Database Seeding

The seed script creates:

- **40+ Sample Products** across different categories
- **5 Sample Users** (2 admins, 3 customers)
- **30 Sample Orders** with various statuses and payment methods
- **10 Product Categories** with descriptions
- **Sample Reviews** and ratings

### Seed Data Credentials

- **Admin**: admin@aadvikclothing.com / admin123
- **Users**: john.doe@example.com / password123

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint
```

### Test Coverage

- Authentication endpoints
- Product CRUD operations
- Order processing
- Payment integration
- User management

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**

- Connect your GitHub repository to Vercel
- Set environment variables in Vercel dashboard
- Deploy automatically on push

3. **Environment Variables in Vercel**

- Add all variables from `.env.example`
- Use production MongoDB Atlas URI
- Use production Stripe keys

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

### Stripe Setup

1. Create Stripe account
2. Get API keys from dashboard
3. Set up webhooks for payment processing
4. Update Stripe keys in environment variables

## 📊 Admin Dashboard

### Access

- URL: `/admin`
- Login with admin credentials from seed data
- Role-based access control

### Features

- **Overview**: Key metrics and recent orders
- **Products**: Manage product catalog
- **Orders**: Process and track orders
- **Users**: Manage customer accounts
- **Analytics**: Detailed performance metrics

### Analytics Dashboard

- Revenue trends and growth
- Top-selling products
- Order status distribution
- Payment method analysis
- Category performance
- Export functionality

## 💳 Payment Integration

### Supported Methods

- **Credit/Debit Cards** (Stripe)
- **UPI Payments** (Stripe)
- **Bank Transfer** (Manual processing)
- **Cash on Delivery** (COD)

### Stripe Setup

1. Create Stripe account
2. Get API keys
3. Set up webhooks
4. Test with Stripe test cards

### Test Cards

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-factor authentication
2. Generate app password
3. Use app password in `EMAIL_PASS`

### Email Templates

- Welcome emails
- Order confirmations
- Password reset
- Newsletter subscription
- Contact form responses

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Products

- `GET /api/products` - Get products with filtering
- `POST /api/products` - Create product (admin)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders

- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order
- `PUT /api/orders/[id]` - Update order (admin)

### Admin

- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/analytics` - Analytics data

### Other

- `POST /api/contact` - Contact form
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `POST /api/webhooks/stripe` - Stripe webhooks

## 🛡 Security Features

- **JWT Authentication** with secure tokens
- **Password Hashing** with bcrypt
- **Input Validation** with Zod schemas
- **CSRF Protection** on forms
- **Rate Limiting** on API endpoints
- **SQL Injection Prevention** with Mongoose
- **XSS Protection** with input sanitization
- **Secure Headers** with Next.js security

## 📱 Mobile Responsiveness

- **Mobile-First Design** approach
- **Responsive Grid** layouts
- **Touch-Friendly** interactions
- **Optimized Images** for different screen sizes
- **Progressive Web App** features

## 🔍 SEO Optimization

- **Meta Tags** for social sharing
- **Structured Data** for search engines
- **Sitemap** generation
- **Image Optimization** with Next.js
- **Performance Optimization** with Core Web Vitals

## 🚨 Error Handling

- **Global Error Boundary** for React errors
- **API Error Responses** with proper status codes
- **User-Friendly** error messages
- **Logging** for debugging
- **Fallback UI** for failed states

## 📈 Performance

- **Code Splitting** with dynamic imports
- **Image Optimization** with Next.js Image
- **Lazy Loading** for components
- **Caching** strategies
- **Bundle Analysis** tools

## 🧹 Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **Conventional Commits** for commit messages

## 📝 Changelog

### v1.0.0 (Initial Release)

- ✅ Complete e-commerce platform
- ✅ User authentication and authorization
- ✅ Product catalog with filtering and search
- ✅ Shopping cart and checkout process
- ✅ Multiple payment methods (Stripe, UPI, Bank, COD)
- ✅ Admin dashboard with analytics
- ✅ Order management system
- ✅ Email notifications and newsletter
- ✅ Contact form with Google Maps
- ✅ Responsive design for all devices
- ✅ SEO optimization
- ✅ Comprehensive testing suite
- ✅ Production-ready deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact: info@aadvikclothing.com
- Documentation: [Link to docs]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Stripe for payment processing
- MongoDB for the database
- All open-source contributors

---

**Built with ❤️ by the Aadvik Clothing Team**
