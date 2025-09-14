'use client';
import { Heart, Truck, Shield, RotateCcw, Award, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Aadvik Clothing</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              We&apos;re passionate about bringing you the latest fashion trends with uncompromising quality and exceptional customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  Founded in 2020, Aadvik Clothing started as a small family business with a simple mission: 
                  to make high-quality, fashionable clothing accessible to everyone.
                </p>
                <p>
                  What began as a local boutique has grown into a trusted online destination for fashion-forward 
                  individuals who value both style and substance. We believe that great clothing should make you 
                  feel confident, comfortable, and ready to take on the world.
                </p>
                <p>
                  Today, we&apos;re proud to serve customers across the globe, offering a carefully curated selection 
                  of clothing that combines timeless design with modern trends.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
                  <div className="text-slate-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">1000+</div>
                  <div className="text-slate-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">25+</div>
                  <div className="text-slate-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">4.8★</div>
                  <div className="text-slate-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional experiences to our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Passion</h3>
              <p className="text-slate-600">
                We&apos;re passionate about fashion and committed to bringing you the best styles and trends.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Quality</h3>
              <p className="text-slate-600">
                Every piece is carefully selected and crafted to meet our high standards for quality and durability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Community</h3>
              <p className="text-slate-600">
                We believe in building a community where everyone feels welcome and confident in their style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Sustainability</h3>
              <p className="text-slate-600">
                We&apos;re committed to sustainable practices and ethical sourcing throughout our supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Aadvik Clothing?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We go above and beyond to ensure your shopping experience is exceptional in every way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Fast & Free Shipping</h3>
              <p className="text-slate-600">
                Enjoy free shipping on orders over $50 and fast delivery to your doorstep within 2-3 business days.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Secure Shopping</h3>
              <p className="text-slate-600">
                Your personal and payment information is protected with bank-level security and encryption.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Easy Returns</h3>
              <p className="text-slate-600">
                Not satisfied? Return any item within 30 days for a full refund or exchange. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The passionate people behind Aadvik Clothing who work tirelessly to bring you the best fashion experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-600">AG</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Aman Gupta</h3>
              <p className="text-indigo-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-slate-600">
                Visionary leader with 10+ years in fashion retail, passionate about creating inclusive and sustainable fashion.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-pink-600">KKT</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Kavya Kumar Thakur</h3>
              <p className="text-indigo-600 font-medium mb-2">Head of Design</p>
              <p className="text-slate-600">
                Creative director with an eye for trends and a commitment to timeless, versatile designs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-green-600">MJ</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Michael Johnson</h3>
              <p className="text-indigo-600 font-medium mb-2">Customer Experience Lead</p>
              <p className="text-slate-600">
                Dedicated to ensuring every customer has an exceptional shopping experience from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Discover our latest collection and find the perfect pieces to express your unique style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
