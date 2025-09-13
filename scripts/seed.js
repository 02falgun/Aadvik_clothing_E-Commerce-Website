const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Order = require('../src/models/Order');
const Category = require('../src/models/Category');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aadvik-clothing');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample data
const categories = [
  { name: 'T-Shirts', description: 'Comfortable and stylish t-shirts for every occasion' },
  { name: 'Jeans', description: 'Classic and modern denim jeans' },
  { name: 'Dresses', description: 'Elegant dresses for women' },
  { name: 'Hoodies', description: 'Warm and cozy hoodies' },
  { name: 'Shirts', description: 'Formal and casual shirts' },
  { name: 'Shorts', description: 'Comfortable shorts for summer' },
  { name: 'Jackets', description: 'Stylish jackets and outerwear' },
  { name: 'Sweaters', description: 'Warm sweaters for cold weather' },
  { name: 'Skirts', description: 'Fashionable skirts for women' },
  { name: 'Accessories', description: 'Fashion accessories and add-ons' },
];

const products = [
  // T-Shirts
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
    price: 29.99,
    images: ['/placeholder-product.jpg'],
    category: 'T-Shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
    inStock: true,
    stockQuantity: 50,
    featured: true,
  },
  {
    name: 'Vintage Graphic Tee',
    description: 'Retro-inspired graphic t-shirt with vintage design. Perfect for casual outings.',
    price: 24.99,
    images: ['/placeholder-product.jpg'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Cream'],
    inStock: true,
    stockQuantity: 30,
    featured: false,
  },
  {
    name: 'Athletic Performance Tee',
    description: 'Moisture-wicking athletic t-shirt designed for sports and workouts.',
    price: 34.99,
    images: ['/placeholder-product.jpg'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Red', 'Green'],
    inStock: true,
    stockQuantity: 40,
    featured: true,
  },
  {
    name: 'Oversized Comfort Tee',
    description: 'Relaxed fit t-shirt for ultimate comfort. Perfect for lounging or casual wear.',
    price: 27.99,
    images: ['/placeholder-product.jpg'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray', 'Pink', 'Blue'],
    inStock: true,
    stockQuantity: 35,
    featured: false,
  },

  // Jeans
  {
    name: 'Classic Blue Jeans',
    description: 'Timeless blue denim jeans with a perfect fit. Made from premium denim.',
    price: 79.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: ['Blue', 'Dark Blue', 'Black'],
    inStock: true,
    stockQuantity: 25,
    featured: true,
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans for a contemporary look. Comfortable and stylish.',
    price: 89.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Gray'],
    inStock: true,
    stockQuantity: 20,
    featured: true,
  },
  {
    name: 'Distressed Jeans',
    description: 'Trendy distressed jeans with a worn-in look. Perfect for casual style.',
    price: 95.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    inStock: true,
    stockQuantity: 15,
    featured: false,
  },
  {
    name: 'High-Waist Jeans',
    description: 'Flattering high-waist jeans for women. Comfortable and stylish.',
    price: 85.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jeans',
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    stockQuantity: 18,
    featured: true,
  },

  // Dresses
  {
    name: 'Elegant Summer Dress',
    description: 'Beautiful summer dress perfect for special occasions. Light and airy fabric.',
    price: 89.99,
    images: ['/placeholder-product.jpg'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Navy', 'Black', 'Pink'],
    inStock: true,
    stockQuantity: 22,
    featured: true,
  },
  {
    name: 'Little Black Dress',
    description: 'Classic little black dress for any occasion. Timeless and elegant.',
    price: 99.99,
    images: ['/placeholder-product.jpg'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    inStock: true,
    stockQuantity: 20,
    featured: true,
  },
  {
    name: 'Casual Midi Dress',
    description: 'Comfortable midi dress perfect for everyday wear. Versatile and stylish.',
    price: 75.99,
    images: ['/placeholder-product.jpg'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Green', 'Pink', 'Gray'],
    inStock: true,
    stockQuantity: 25,
    featured: false,
  },
  {
    name: 'Maxi Evening Dress',
    description: 'Stunning maxi dress for evening events. Elegant and sophisticated.',
    price: 129.99,
    images: ['/placeholder-product.jpg'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Gold'],
    inStock: true,
    stockQuantity: 12,
    featured: true,
  },

  // Hoodies
  {
    name: 'Comfortable Hoodie',
    description: 'Soft and warm hoodie perfect for cool weather. Cozy and comfortable.',
    price: 59.99,
    images: ['/placeholder-product.jpg'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy', 'Green', 'Red'],
    inStock: true,
    stockQuantity: 30,
    featured: true,
  },
  {
    name: 'Zip-Up Hoodie',
    description: 'Versatile zip-up hoodie with front pockets. Perfect for layering.',
    price: 69.99,
    images: ['/placeholder-product.jpg'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'White'],
    inStock: true,
    stockQuantity: 25,
    featured: false,
  },
  {
    name: 'Oversized Hoodie',
    description: 'Trendy oversized hoodie for a relaxed look. Comfortable and stylish.',
    price: 64.99,
    images: ['/placeholder-product.jpg'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream', 'Black', 'Pink', 'Blue'],
    inStock: true,
    stockQuantity: 28,
    featured: true,
  },

  // Shirts
  {
    name: 'Classic White Shirt',
    description: 'Crisp white dress shirt perfect for formal occasions. Professional and elegant.',
    price: 79.99,
    images: ['/placeholder-product.jpg'],
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink'],
    inStock: true,
    stockQuantity: 35,
    featured: true,
  },
  {
    name: 'Casual Flannel Shirt',
    description: 'Warm flannel shirt perfect for casual wear. Soft and comfortable.',
    price: 54.99,
    images: ['/placeholder-product.jpg'],
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red/Black', 'Blue/White', 'Green/Black', 'Gray/White'],
    inStock: true,
    stockQuantity: 20,
    featured: false,
  },
  {
    name: 'Linen Summer Shirt',
    description: 'Lightweight linen shirt perfect for summer. Breathable and comfortable.',
    price: 69.99,
    images: ['/placeholder-product.jpg'],
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Beige', 'Light Blue', 'Pink'],
    inStock: true,
    stockQuantity: 18,
    featured: true,
  },

  // Shorts
  {
    name: 'Classic Denim Shorts',
    description: 'Comfortable denim shorts perfect for summer. Classic and versatile.',
    price: 39.99,
    images: ['/placeholder-product.jpg'],
    category: 'Shorts',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    stockQuantity: 40,
    featured: true,
  },
  {
    name: 'Athletic Shorts',
    description: 'Moisture-wicking athletic shorts perfect for sports and workouts.',
    price: 34.99,
    images: ['/placeholder-product.jpg'],
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray', 'Red'],
    inStock: true,
    stockQuantity: 30,
    featured: false,
  },
  {
    name: 'Cargo Shorts',
    description: 'Practical cargo shorts with multiple pockets. Perfect for outdoor activities.',
    price: 49.99,
    images: ['/placeholder-product.jpg'],
    category: 'Shorts',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Black', 'Green', 'Navy'],
    inStock: true,
    stockQuantity: 25,
    featured: true,
  },

  // Jackets
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket perfect for layering. Versatile and stylish.',
    price: 89.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'White'],
    inStock: true,
    stockQuantity: 20,
    featured: true,
  },
  {
    name: 'Leather Moto Jacket',
    description: 'Edgy leather moto jacket for a bold look. Premium quality leather.',
    price: 199.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Navy'],
    inStock: true,
    stockQuantity: 8,
    featured: true,
  },
  {
    name: 'Bomber Jacket',
    description: 'Stylish bomber jacket perfect for casual wear. Lightweight and comfortable.',
    price: 79.99,
    images: ['/placeholder-product.jpg'],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Green', 'Gray'],
    inStock: true,
    stockQuantity: 15,
    featured: false,
  },

  // Sweaters
  {
    name: 'Cable Knit Sweater',
    description: 'Warm cable knit sweater perfect for cold weather. Classic and cozy.',
    price: 89.99,
    images: ['/placeholder-product.jpg'],
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream', 'Gray', 'Navy', 'Burgundy'],
    inStock: true,
    stockQuantity: 22,
    featured: true,
  },
  {
    name: 'Turtleneck Sweater',
    description: 'Elegant turtleneck sweater for a sophisticated look. Warm and stylish.',
    price: 79.99,
    images: ['/placeholder-product.jpg'],
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy', 'White'],
    inStock: true,
    stockQuantity: 18,
    featured: true,
  },
  {
    name: 'Oversized Cardigan',
    description: 'Comfortable oversized cardigan perfect for layering. Soft and cozy.',
    price: 69.99,
    images: ['/placeholder-product.jpg'],
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream', 'Gray', 'Pink', 'Blue'],
    inStock: true,
    stockQuantity: 25,
    featured: false,
  },

  // Skirts
  {
    name: 'A-Line Midi Skirt',
    description: 'Flattering A-line midi skirt perfect for any occasion. Elegant and versatile.',
    price: 59.99,
    images: ['/placeholder-product.jpg'],
    category: 'Skirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Burgundy'],
    inStock: true,
    stockQuantity: 20,
    featured: true,
  },
  {
    name: 'Pleated Mini Skirt',
    description: 'Trendy pleated mini skirt for a modern look. Fun and stylish.',
    price: 49.99,
    images: ['/placeholder-product.jpg'],
    category: 'Skirts',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Pink', 'Blue'],
    inStock: true,
    stockQuantity: 15,
    featured: false,
  },
  {
    name: 'Maxi Skirt',
    description: 'Elegant maxi skirt perfect for special occasions. Flowing and beautiful.',
    price: 69.99,
    images: ['/placeholder-product.jpg'],
    category: 'Skirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Green'],
    inStock: true,
    stockQuantity: 12,
    featured: true,
  },

  // Accessories
  {
    name: 'Leather Belt',
    description: 'Genuine leather belt with classic buckle. Durable and stylish.',
    price: 39.99,
    images: ['/placeholder-product.jpg'],
    category: 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
    stockQuantity: 50,
    featured: false,
  },
  {
    name: 'Silk Scarf',
    description: 'Luxurious silk scarf perfect for accessorizing. Soft and elegant.',
    price: 29.99,
    images: ['/placeholder-product.jpg'],
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Floral', 'Geometric', 'Solid', 'Striped'],
    inStock: true,
    stockQuantity: 30,
    featured: true,
  },
  {
    name: 'Wool Beanie',
    description: 'Warm wool beanie perfect for cold weather. Soft and comfortable.',
    price: 24.99,
    images: ['/placeholder-product.jpg'],
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy', 'Cream', 'Red'],
    inStock: true,
    stockQuantity: 40,
    featured: false,
  },
  {
    name: 'Canvas Tote Bag',
    description: 'Eco-friendly canvas tote bag perfect for everyday use. Durable and spacious.',
    price: 19.99,
    images: ['/placeholder-product.jpg'],
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Natural', 'Black', 'Navy', 'Green'],
    inStock: true,
    stockQuantity: 60,
    featured: true,
  },
];

const users = [
  {
    email: 'admin@aadvikclothing.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1-555-0101',
    role: 'admin',
    address: {
      street: '123 Admin Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  },
  {
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0102',
    role: 'user',
    address: {
      street: '456 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
  },
  {
    email: 'jane.smith@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1-555-0103',
    role: 'user',
    address: {
      street: '789 Oak Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
  },
  {
    email: 'mike.wilson@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Wilson',
    phone: '+1-555-0104',
    role: 'user',
    address: {
      street: '321 Pine Street',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA',
    },
  },
  {
    email: 'sarah.johnson@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1-555-0105',
    role: 'user',
    address: {
      street: '654 Elm Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
  },
];

// Generate sample orders
const generateOrders = (users, products) => {
  const orders = [];
  const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
  const paymentMethods = ['card', 'upi', 'bank', 'cod'];

  for (let i = 0; i < 30; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
    const items = [];
    let totalAmount = 0;

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
      const size = product.sizes[Math.floor(Math.random() * product.sizes.length)];
      const color = product.colors[Math.floor(Math.random() * product.colors.length)];

      items.push({
        product: product._id,
        quantity,
        size,
        color,
      });

      totalAmount += product.price * quantity;
    }

    // Add shipping and tax
    const shipping = totalAmount >= 50 ? 0 : 9.99;
    const tax = totalAmount * 0.08;
    const finalTotal = totalAmount + shipping + tax;

    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days

    orders.push({
      user: user._id,
      items,
      totalAmount: finalTotal,
      status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      shippingAddress: user.address,
      createdAt: orderDate,
      updatedAt: orderDate,
    });
  }

  return orders;
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        return { ...user, password: hashedPassword };
      })
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Generate and create orders
    const orders = generateOrders(createdUsers, createdProducts);
    const createdOrders = await Order.insertMany(orders);
    console.log(`Created ${createdOrders.length} orders`);

    console.log('Database seeding completed successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@aadvikclothing.com / admin123');
    console.log('User: john.doe@example.com / password123');
    console.log('User: jane.smith@example.com / password123');
    console.log('User: mike.wilson@example.com / password123');
    console.log('User: sarah.johnson@example.com / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
connectDB().then(() => {
  seedDatabase();
});
