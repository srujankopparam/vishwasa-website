"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  CalendarDays,
  TrendingUp,
  BarChart3,
  Package,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  monthOrders: number;
  avgOrderValue: number;
  topProducts: { product_name: string; units_sold: number }[];
  dailyOrders: { day: string; orders_count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const statCards = data
    ? [
        {
          label: "Total Revenue",
          value: formatCurrency(data.totalRevenue),
          icon: DollarSign,
          color: "bg-emerald-500/10 text-emerald-600",
          accent: "border-emerald-500/20",
        },
        {
          label: "All-Time Orders",
          value: data.totalOrders.toLocaleString("en-IN"),
          icon: ShoppingCart,
          color: "bg-blue-500/10 text-blue-600",
          accent: "border-blue-500/20",
        },
        {
          label: "This Month",
          value: data.monthOrders.toLocaleString("en-IN"),
          icon: CalendarDays,
          color: "bg-violet-500/10 text-violet-600",
          accent: "border-violet-500/20",
        },
        {
          label: "Avg Order Value",
          value: formatCurrency(data.avgOrderValue),
          icon: TrendingUp,
          color: "bg-orange/10 text-orange",
          accent: "border-orange/20",
        },
      ]
    : [];

  // Chart data formatted
  const chartData = (data?.dailyOrders || []).map((d) => ({
    ...d,
    label: formatDate(d.day),
  }));

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brown">
            Business Analytics
          </h1>
          <p className="text-brown/50 font-medium">
            Track revenue, orders and product performance.
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange text-white rounded-2xl font-bold text-sm 
            hover:bg-orange/90 transition-all duration-300 shadow-md shadow-orange/20
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-orange/20 border-t-orange rounded-full animate-spin" />
          <p className="text-brown/40 font-medium">Loading analytics...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-bold mb-2">Failed to load data</p>
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="mt-4 px-4 py-2 bg-red-100 text-red-600 font-bold rounded-xl text-sm hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Data Loaded */}
      {data && !loading && (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-3xl p-7 border ${stat.accent} shadow-sm 
                  hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.color}`}
                >
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl font-bold text-brown mb-1 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-brown/40 font-semibold text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Daily Orders Chart */}
          <div className="bg-white rounded-3xl p-8 border border-brown/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <BarChart3 size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-brown">
                  Daily Orders — Last 30 Days
                </h2>
                <p className="text-brown/40 text-sm">
                  Order volume trend over the past month
                </p>
              </div>
            </div>

            {chartData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorOrders"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#E8772E"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#E8772E"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f0ebe6"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 12, fill: "#8B7355" }}
                      tickLine={false}
                      axisLine={{ stroke: "#f0ebe6" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#8B7355" }}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        border: "1px solid #f0ebe6",
                        borderRadius: "16px",
                        padding: "12px 16px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      }}
                      labelStyle={{
                        color: "#3D2B1F",
                        fontWeight: "bold",
                        marginBottom: 4,
                      }}
                      itemStyle={{ color: "#E8772E" }}
                      formatter={(value: any) => [
                        `${value} orders`,
                        "Orders",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders_count"
                      stroke="#E8772E"
                      strokeWidth={3}
                      fill="url(#colorOrders)"
                      dot={{ fill: "#E8772E", r: 4, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6, stroke: "#E8772E", strokeWidth: 2, fill: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-brown/5 rounded-2xl flex items-center justify-center mb-4">
                  <BarChart3 size={28} className="text-brown/20" />
                </div>
                <p className="text-brown/40 font-bold">No order data yet</p>
                <p className="text-brown/30 text-sm mt-1">
                  Chart will appear once you start receiving orders.
                </p>
              </div>
            )}
          </div>

          {/* Top Products Table */}
          <div className="bg-white rounded-3xl p-8 border border-brown/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center">
                <Package size={20} className="text-violet-600" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-brown">
                  Top Products
                </h2>
                <p className="text-brown/40 text-sm">
                  Best-selling products by units sold
                </p>
              </div>
            </div>

            {data.topProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brown/10">
                      <th className="text-left py-4 px-4 text-[11px] font-bold text-brown/40 uppercase tracking-widest">
                        #
                      </th>
                      <th className="text-left py-4 px-4 text-[11px] font-bold text-brown/40 uppercase tracking-widest">
                        Product Name
                      </th>
                      <th className="text-right py-4 px-4 text-[11px] font-bold text-brown/40 uppercase tracking-widest">
                        Units Sold
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topProducts.map((product, i) => (
                      <tr
                        key={product.product_name}
                        className="border-b border-brown/5 last:border-b-0 hover:bg-cream/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              i === 0
                                ? "bg-orange/10 text-orange"
                                : i === 1
                                ? "bg-brown/10 text-brown/60"
                                : i === 2
                                ? "bg-amber-500/10 text-amber-600"
                                : "bg-brown/5 text-brown/30"
                            }`}
                          >
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-bold text-brown">
                          {product.product_name}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="bg-orange/10 text-orange font-bold text-sm px-3 py-1 rounded-lg">
                            {product.units_sold.toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-brown/5 rounded-2xl flex items-center justify-center mb-4">
                  <Package size={28} className="text-brown/20" />
                </div>
                <p className="text-brown/40 font-bold">No products sold yet</p>
                <p className="text-brown/30 text-sm mt-1">
                  Top products will appear here once you start fulfilling
                  orders.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
