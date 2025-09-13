import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import models (using dynamic imports for ES modules)
const { default: User } = await import('../src/models/User.js');
const { default: Product } = await import('../src/models/Product.js');
const { default: Order } = await import('../src/models/Order.js');
const { default: Category } = await import('../src/models/Category.js');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aadvik-clothing');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample data
const categories = [
  {
    name: 'Men\'s Clothing',
    slug: 'mens-clothing',
    description: 'Stylish and comfortable clothing for men',
    image: '/images/categories/mens.jpg'
  },
  {
    name: 'Women\'s Clothing',
    slug: 'womens-clothing',
    description: 'Trendy and elegant clothing for women',
    image: '/images/categories/womens.jpg'
  },
  {
    name: 'Kids\' Clothing',
    slug: 'kids-clothing',
    description: 'Fun and comfortable clothing for kids',
    image: '/images/categories/kids.jpg'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Fashion accessories to complete your look',
    image: '/images/categories/accessories.jpg'
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    description: 'Comfortable and stylish footwear',
    image: '/images/categories/shoes.jpg'
  }
];

const products = [
  // Men's Clothing
  {
    name: 'Classic White T-Shirt',
    slug: 'classic-white-t-shirt',
    description: 'Premium quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
    price: 29.99,
    originalPrice: 39.99,
    images: ['/images/products/mens-white-tshirt-1.jpg', '/images/products/mens-white-tshirt-2.jpg'],
    category: 'mens-clothing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy'],
    stockQuantity: 100,
    inStock: true,
    featured: true,
    tags: ['casual', 'cotton', 'basic']
  },
  {
    name: 'Denim Jacket',
    slug: 'denim-jacket',
    description: 'Classic denim jacket with a modern fit. Made from premium denim fabric.',
    price: 89.99,
    originalPrice: 119.99,
    images: ['/images/products/mens-denim-jacket-1.jpg', '/images/products/mens-denim-jacket-2.jpg'],
    category: 'mens-clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    stockQuantity: 50,
    inStock: true,
    featured: true,
    tags: ['denim', 'jacket', 'casual']
  },
  {
    name: 'Chino Pants',
    slug: 'chino-pants',
    description: 'Versatile chino pants perfect for both casual and semi-formal occasions.',
    price: 69.99,
    originalPrice: 89.99,
    images: ['/images/products/mens-chino-pants-1.jpg', '/images/products/mens-chino-pants-2.jpg'],
    category: 'mens-clothing',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Khaki', 'Navy', 'Black'],
    stockQuantity: 75,
    inStock: true,
    featured: false,
    tags: ['pants', 'chino', 'casual']
  },
  {
    name: 'Hoodie',
    slug: 'mens-hoodie',
    description: 'Comfortable and warm hoodie with a modern design. Perfect for layering.',
    price: 59.99,
    originalPrice: 79.99,
    images: ['/images/products/mens-hoodie-1.jpg', '/images/products/mens-hoodie-2.jpg'],
    category: 'mens-clothing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy'],
    stockQuantity: 60,
    inStock: true,
    featured: true,
    tags: ['hoodie', 'casual', 'warm']
  },

  // Women's Clothing
  {
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description: 'Beautiful floral print dress perfect for summer days. Light and airy fabric.',
    price: 79.99,
    originalPrice: 99.99,
    images: ['/images/products/womens-floral-dress-1.jpg', '/images/products/womens-floral-dress-2.jpg'],
    category: 'womens-clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Blue Floral', 'Pink Floral'],
    stockQuantity: 40,
    inStock: true,
    featured: true,
    tags: ['dress', 'floral', 'summer']
  },
  {
    name: 'High-Waist Jeans',
    slug: 'high-waist-jeans',
    description: 'Trendy high-waist jeans with a flattering fit. Made from premium denim.',
    price: 89.99,
    originalPrice: 119.99,
    images: ['/images/products/womens-jeans-1.jpg', '/images/products/womens-jeans-2.jpg'],
    category: 'womens-clothing',
    sizes: ['24', '26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'Light Blue'],
    stockQuantity: 55,
    inStock: true,
    featured: true,
    tags: ['jeans', 'denim', 'high-waist']
  },
  {
    name: 'Blouse',
    slug: 'womens-blouse',
    description: 'Elegant blouse perfect for office or special occasions. Made from premium fabric.',
    price: 49.99,
    originalPrice: 69.99,
    images: ['/images/products/womens-blouse-1.jpg', '/images/products/womens-blouse-2.jpg'],
    category: 'womens-clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Pink'],
    stockQuantity: 35,
    inStock: true,
    featured: false,
    tags: ['blouse', 'formal', 'elegant']
  },
  {
    name: 'Cardigan',
    slug: 'womens-cardigan',
    description: 'Soft and comfortable cardigan perfect for layering. Available in multiple colors.',
    price: 65.99,
    originalPrice: 85.99,
    images: ['/images/products/womens-cardigan-1.jpg', '/images/products/womens-cardigan-2.jpg'],
    category: 'womens-clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Gray', 'Black', 'Pink'],
    stockQuantity: 45,
    inStock: true,
    featured: true,
    tags: ['cardigan', 'knit', 'layering']
  },

  // Kids' Clothing
  {
    name: 'Kids T-Shirt Set',
    slug: 'kids-t-shirt-set',
    description: 'Comfortable 3-pack t-shirt set for kids. Made from soft, breathable cotton.',
    price: 24.99,
    originalPrice: 34.99,
    images: ['/images/products/kids-tshirt-set-1.jpg', '/images/products/kids-tshirt-set-2.jpg'],
    category: 'kids-clothing',
    sizes: ['2T', '3T', '4T', '5T', '6', '7', '8'],
    colors: ['Multi', 'Blue', 'Pink'],
    stockQuantity: 80,
    inStock: true,
    featured: true,
    tags: ['kids', 'tshirt', 'pack']
  },
  {
    name: 'Kids Jeans',
    slug: 'kids-jeans',
    description: 'Durable and comfortable jeans for active kids. Reinforced knees for extra durability.',
    price: 34.99,
    originalPrice: 44.99,
    images: ['/images/products/kids-jeans-1.jpg', '/images/products/kids-jeans-2.jpg'],
    category: 'kids-clothing',
    sizes: ['2T', '3T', '4T', '5T', '6', '7', '8'],
    colors: ['Blue', 'Black'],
    stockQuantity: 60,
    inStock: true,
    featured: false,
    tags: ['kids', 'jeans', 'durable']
  },

  // Accessories
  {
    name: 'Leather Belt',
    slug: 'leather-belt',
    description: 'Genuine leather belt with classic buckle. Available in multiple sizes.',
    price: 39.99,
    originalPrice: 49.99,
    images: ['/images/products/leather-belt-1.jpg', '/images/products/leather-belt-2.jpg'],
    category: 'accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Brown', 'Black'],
    stockQuantity: 30,
    inStock: true,
    featured: false,
    tags: ['belt', 'leather', 'accessory']
  },
  {
    name: 'Wool Scarf',
    slug: 'wool-scarf',
    description: 'Soft and warm wool scarf perfect for cold weather. Hand-woven design.',
    price: 45.99,
    originalPrice: 59.99,
    images: ['/images/products/wool-scarf-1.jpg', '/images/products/wool-scarf-2.jpg'],
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Gray', 'Navy', 'Cream', 'Red'],
    stockQuantity: 25,
    inStock: true,
    featured: true,
    tags: ['scarf', 'wool', 'warm']
  },

  // Shoes
  {
    name: 'Sneakers',
    slug: 'sneakers',
    description: 'Comfortable and stylish sneakers perfect for everyday wear. Cushioned sole for all-day comfort.',
    price: 89.99,
    originalPrice: 119.99,
    images: ['/images/products/sneakers-1.jpg', '/images/products/sneakers-2.jpg'],
    category: 'shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Navy'],
    stockQuantity: 50,
    inStock: true,
    featured: true,
    tags: ['sneakers', 'casual', 'comfortable']
  },
  {
    name: 'Dress Shoes',
    slug: 'dress-shoes',
    description: 'Classic dress shoes perfect for formal occasions. Made from premium leather.',
    price: 129.99,
    originalPrice: 159.99,
    images: ['/images/products/dress-shoes-1.jpg', '/images/products/dress-shoes-2.jpg'],
    category: 'shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown'],
    stockQuantity: 20,
    inStock: true,
    featured: false,
    tags: ['dress', 'formal', 'leather']
  }
];

const users = [
  {
    firstName: 'Aadvik',
    lastName: 'Kumar',
    email: 'admin@aadvikclothing.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1-555-0101',
    address: {
      street: '123 Fashion Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'admin2@aadvikclothing.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1-555-0102',
    address: {
      street: '456 Style Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'customer1@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+1-555-0103',
    address: {
      street: '789 Main Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'customer2@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+1-555-0104',
    address: {
      street: '321 Oak Avenue',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    }
  },
  {
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'customer3@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+1-555-0105',
    address: {
      street: '654 Pine Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    }
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create products with category references
    const productsWithCategories = products.map(product => ({
      ...product,
      category: createdCategories.find(cat => cat.slug === product.category)?._id
    }));
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create sample orders
    const sampleOrders = [
      {
        user: createdUsers[2]._id, // John Doe
        items: [
          {
            product: createdProducts[0]._id, // White T-Shirt
            quantity: 2,
            size: 'M',
            color: 'White'
          },
          {
            product: createdProducts[1]._id, // Denim Jacket
            quantity: 1,
            size: 'L',
            color: 'Blue'
          }
        ],
        totalAmount: 149.97,
        status: 'delivered',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '789 Main Street',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        paymentMethod: 'card',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        user: createdUsers[3]._id, // Jane Smith
        items: [
          {
            product: createdProducts[4]._id, // Floral Dress
            quantity: 1,
            size: 'M',
            color: 'Floral'
          }
        ],
        totalAmount: 79.99,
        status: 'shipped',
        paymentStatus: 'paid',
        shippingAddress: {
          street: '321 Oak Avenue',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA'
        },
        paymentMethod: 'upi',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        user: createdUsers[4]._id, // Mike Wilson
        items: [
          {
            product: createdProducts[8]._id, // Kids T-Shirt Set
            quantity: 1,
            size: '4T',
            color: 'Multi'
          },
          {
            product: createdProducts[12]._id, // Sneakers
            quantity: 1,
            size: '10',
            color: 'White'
          }
        ],
        totalAmount: 114.98,
        status: 'pending',
        paymentStatus: 'pending',
        shippingAddress: {
          street: '654 Pine Street',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        },
        paymentMethod: 'cod',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`✅ Created ${createdOrders.length} orders`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Users: ${createdUsers.length}`);
    console.log(`- Products: ${createdProducts.length}`);
    console.log(`- Orders: ${createdOrders.length}`);
    console.log('\n🔑 Admin Login Credentials:');
    console.log('Email: admin@aadvikclothing.com');
    console.log('Password: admin123');
    console.log('\nEmail: admin2@aadvikclothing.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the seed function
connectDB().then(() => {
  seedDatabase();
});
