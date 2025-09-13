import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    // Calculate date range
    const now = new Date();
    const startDate = new Date();
    
    switch (range) {
      case '1d':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Today's metrics
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [todaySalesResult, todayOrdersResult] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: todayStart, $lte: todayEnd }, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } }),
    ]);

    const todaySales = todaySalesResult.length > 0 ? todaySalesResult[0].total : 0;
    const todayOrders = todayOrdersResult;

    // Previous period for growth calculation
    const prevStart = new Date(startDate);
    const prevEnd = new Date(now);
    const prevPeriodDays = Math.ceil((prevEnd.getTime() - prevStart.getTime()) / (1000 * 60 * 60 * 24));
    const prevStartDate = new Date(prevStart);
    prevStartDate.setDate(prevStartDate.getDate() - prevPeriodDays);

    const [prevSalesResult, prevOrdersResult] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: prevStartDate, $lt: prevStart }, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.countDocuments({ createdAt: { $gte: prevStartDate, $lt: prevStart } }),
    ]);

    const prevSales = prevSalesResult.length > 0 ? prevSalesResult[0].total : 0;
    const prevOrders = prevOrdersResult;

    // Calculate growth percentages
    const salesGrowth = prevSales > 0 ? ((todaySales - prevSales) / prevSales) * 100 : 0;
    const ordersGrowth = prevOrders > 0 ? ((todayOrders - prevOrders) / prevOrders) * 100 : 0;

    // Total customers and products sold
    const [totalCustomers, totalProductsSoldResult] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $unwind: '$items' },
        { $group: { _id: null, total: { $sum: '$items.quantity' } } },
      ]),
    ]);

    const totalProductsSold = totalProductsSoldResult.length > 0 ? totalProductsSoldResult[0].total : 0;

    // Revenue data for chart
    const revenueData = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: now }, paymentStatus: 'paid' } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          revenue: 1,
          _id: 0
        }
      }
    ]);

    // Top products
    const topProducts = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          sales: { $sum: '$items.quantity' }
        }
      },
      { $sort: { sales: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          sales: 1
        }
      }
    ]);

    // Orders by category
    const ordersByCategory = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Orders by payment method
    const ordersByPaymentMethod = await Order.aggregate([
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          method: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        todaySales,
        todayOrders,
        totalCustomers,
        totalProductsSold,
        salesGrowth,
        ordersGrowth,
        revenueData,
        topProducts,
        ordersByCategory,
        ordersByPaymentMethod,
        ordersByStatus,
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
});
