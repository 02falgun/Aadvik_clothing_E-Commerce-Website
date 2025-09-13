'use client';

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import toast from "react-hot-toast";

// Mock data for demonstration
const featuredProducts: Product[] = [
  {
    _id: "1",
    name: "Premium Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt perfect for everyday wear",
    price: 29.99,
    images: ["/placeholder-product.svg"],
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Gray"],
    inStock: true,
    stockQuantity: 50,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "Classic Denim Jeans",
    description: "Classic fit denim jeans made from premium denim fabric",
    price: 79.99,
    images: ["/placeholder-product.svg"],
    category: "Jeans",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black", "Light Blue"],
    inStock: true,
    stockQuantity: 30,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    name: "Elegant Summer Dress",
    description: "Light and airy summer dress perfect for warm weather",
    price: 89.99,
    images: ["/placeholder-product.svg"],
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral", "White", "Pink", "Blue"],
    inStock: true,
    stockQuantity: 25,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    name: "Comfortable Hoodie",
    description: "Cozy and warm hoodie for casual comfort",
    price: 59.99,
    images: ["/placeholder-product.svg"],
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Navy", "White"],
    inStock: false,
    stockQuantity: 0,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        toast.error(result.message || 'Failed to subscribe');
      }
    } catch (_err: unknown) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Premium clothing that reflects your personality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Free Shipping</h3>
              <p className="text-slate-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Payment</h3>
              <p className="text-slate-600">100% secure checkout</p>
            </div>
            <div className="text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Returns</h3>
              <p className="text-slate-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quality Guarantee</h3>
              <p className="text-slate-600">Premium materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600">
              Find exactly what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <Link href="/products?category=mens-clothing" className="group text-center">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-8 mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl font-bold text-slate-700 mb-2">M</div>
                <h3 className="font-semibold text-slate-900">Men&apos;s</h3>
              </div>
            </Link>
            <Link href="/products?category=womens-clothing" className="group text-center">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg p-8 mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl font-bold text-indigo-600 mb-2">W</div>
                <h3 className="font-semibold text-slate-900">Women&apos;s</h3>
              </div>
            </Link>
            <Link href="/products?category=kids-clothing" className="group text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg p-8 mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl font-bold text-emerald-600 mb-2">K</div>
                <h3 className="font-semibold text-slate-900">Kids</h3>
              </div>
            </Link>
            <Link href="/products?category=accessories" className="group text-center">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-8 mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl font-bold text-amber-600 mb-2">A</div>
                <h3 className="font-semibold text-slate-900">Accessories</h3>
              </div>
            </Link>
            <Link href="/products?category=shoes" className="group text-center">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-8 mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl font-bold text-slate-700 mb-2">S</div>
                <h3 className="font-semibold text-slate-900">Shoes</h3>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-flex items-center border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
            >
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600">
              Discover our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Subscribe to our newsletter for the latest fashion trends and exclusive offers
          </p>
          <form onSubmit={handleNewsletterSubscribe} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
