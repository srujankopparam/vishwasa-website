import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isAuthenticated(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  return authHeader.split(" ")[1] === process.env.ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure tables exist before querying
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255),
        customer_phone VARCHAR(50),
        total_amount NUMERIC(10,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_name VARCHAR(255) NOT NULL,
        quantity INTEGER DEFAULT 1,
        unit_price NUMERIC(10,2) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Total revenue (all time, confirmed orders)
    const revenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as total_revenue
      FROM orders WHERE status = 'confirmed';
    `;

    // Total orders (all time)
    const totalOrdersResult = await sql`
      SELECT COUNT(*) as total_orders FROM orders;
    `;

    // Total orders this month
    const monthOrdersResult = await sql`
      SELECT COUNT(*) as month_orders
      FROM orders
      WHERE created_at >= date_trunc('month', now());
    `;

    // Average order value (confirmed)
    const avgOrderResult = await sql`
      SELECT COALESCE(AVG(total_amount), 0) as avg_order_value
      FROM orders WHERE status = 'confirmed';
    `;

    // Top 5 products by units sold
    const topProductsResult = await sql`
      SELECT product_name, COALESCE(SUM(quantity), 0) as units_sold
      FROM order_items
      GROUP BY product_name
      ORDER BY units_sold DESC
      LIMIT 5;
    `;

    // Daily orders for last 30 days
    const dailyOrdersResult = await sql`
      SELECT DATE(created_at) as day, COUNT(*) as orders_count
      FROM orders
      WHERE created_at >= now() - interval '30 days'
      GROUP BY day
      ORDER BY day;
    `;

    return NextResponse.json({
      totalRevenue: Number(revenueResult.rows[0]?.total_revenue || 0),
      totalOrders: Number(totalOrdersResult.rows[0]?.total_orders || 0),
      monthOrders: Number(monthOrdersResult.rows[0]?.month_orders || 0),
      avgOrderValue: Number(Number(avgOrderResult.rows[0]?.avg_order_value || 0).toFixed(2)),
      topProducts: topProductsResult.rows.map((row: any) => ({
        product_name: row.product_name,
        units_sold: Number(row.units_sold),
      })),
      dailyOrders: dailyOrdersResult.rows.map((row: any) => ({
        day: row.day,
        orders_count: Number(row.orders_count),
      })),
    });
  } catch (error) {
    console.error("Analytics query failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
