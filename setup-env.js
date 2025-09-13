const fs = require('fs');
const path = require('path');

const envContent = `# Database
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
`;

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file with default configuration');
  console.log('📝 Please update the environment variables with your actual values:');
  console.log('   - MONGODB_URI: Your MongoDB connection string');
  console.log('   - JWT_SECRET: A random secret key for JWT tokens');
  console.log('   - STRIPE_SECRET_KEY: Your Stripe secret key');
  console.log('   - STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key');
  console.log('   - EMAIL_USER: Your email address');
  console.log('   - EMAIL_PASS: Your email app password');
} else {
  console.log('⚠️  .env.local file already exists');
}
