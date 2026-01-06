// app/(admin)/dashboard/page.tsx
import { getDashboardStats } from "@/app/services/dashboard.server";
import { StatsCard } from "@/app/components/admin/dashboard/StatsCard";
import { RecentOrders } from "@/app/components/admin/dashboard/RecentOrders";
import { LowStockAlert } from "@/app/components/admin/dashboard/LowStockAlert";
import { QuickActions } from "@/app/components/admin/dashboard/QuickActions";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Panel de Control
                </h1>
                <p className="text-gray-600 mt-2">Resumen general de tu tienda</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Productos"
                    value={stats.totalProducts}
                    icon="📦"
                    gradient="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                />
                <StatsCard
                    title="Total Usuarios"
                    value={stats.totalUsers}
                    icon="👥"
                    gradient="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                />
                <StatsCard
                    title="Total Pedidos"
                    value={stats.totalOrders}
                    icon="📋"
                    gradient="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
                />
                <StatsCard
                    title="Ingresos Totales"
                    value={`$${stats.totalRevenue.toFixed(2)}`}
                    icon="💰"
                    gradient="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                />
            </div>

            {/* Alerts and Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <RecentOrders orders={stats.recentOrders} />
                </div>
                <div>
                    <LowStockAlert items={stats.lowStockItems} count={stats.lowStockProducts} />
                </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />
        </div>
    );
}
