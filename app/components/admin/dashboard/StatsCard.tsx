// app/components/admin/dashboard/StatsCard.tsx
interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    gradient: string;
    subtitle?: string;
}

export function StatsCard({ title, value, icon, gradient, subtitle }: StatsCardProps) {
    return (
        <div className="card p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${gradient}`}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
                    )}
                </div>
                <div className={`text-4xl ${gradient}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
