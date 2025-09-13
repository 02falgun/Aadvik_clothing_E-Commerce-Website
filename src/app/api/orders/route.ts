import type { JWTPayload } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const createOrderSchema = z.object({
  items: z.array(z.object({
    product: z.string(),
    quantity: z.number().min(1),
    size: z.string(),
    color: z.string(),
  })),
  totalAmount: z.number().min(0),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.enum(['card', 'upi', 'bank', 'cod']),
});

export const POST = requireAuth(async (request: NextRequest) => {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);
      const user = (request as NextRequest & { user?: JWTPayload }).user;

    // Verify products exist and calculate total
    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of validatedData.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product ${item.product} not found` },
          { status: 400 }
        );
      }

      if (!product.inStock || product.stockQuantity < item.quantity) {
        return NextResponse.json(
          { success: false, message: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      calculatedTotal += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }

    // Add shipping and tax
    const shipping = calculatedTotal >= 50 ? 0 : 9.99;
    const tax = calculatedTotal * 0.08;
    const finalTotal = calculatedTotal + shipping + tax;

    // Create order
      const order = new Order({
        user: user?.userId ?? '',
      items: orderItems,
      totalAmount: finalTotal,
      shippingAddress: validatedData.shippingAddress,
      paymentMethod: validatedData.paymentMethod,
      paymentStatus: validatedData.paymentMethod === 'cod' || validatedData.paymentMethod === 'bank' ? 'pending' : 'pending',
    });

    await order.save();

    // Update product stock
    for (const item of validatedData.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stockQuantity: -item.quantity }
      });
    }

    let paymentUrl = null;

    // Handle payment based on method
    if (validatedData.paymentMethod === 'card' || validatedData.paymentMethod === 'upi') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(finalTotal * 100), // Convert to cents
          currency: 'usd',
          metadata: {
            orderId: order._id.toString(),
             userId: user?.userId ?? '',
          },
        });

        order.stripePaymentIntentId = paymentIntent.id;
        await order.save();

        paymentUrl = `/payment/${paymentIntent.id}`;
      } catch (stripeError) {
        console.error('Stripe error:', stripeError);
        return NextResponse.json(
          { success: false, message: 'Payment processing failed' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order._id,
        paymentUrl,
      },
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Create order error:', error);
    
    if (error instanceof z.ZodError) {
        return NextResponse.json(
          { success: false, message: 'Validation error', error: error.issues },
          { status: 400 }
        );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
});

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

  const query: Record<string, unknown> = {};
    if (userId) query.user = userId;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
