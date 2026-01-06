// app/components/admin/dashboard/LowStockAlert.tsx
import Link from "next/link";

interface LowStockItem {
    id: number;
    name: string;
    stock: number;
}

interface Props {
    items: LowStockItem[];
    count: number;
}

export function LowStockAlert({ items, count }: Props) {
    if (count === 0) {
        return (
            <div className="card p-6 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">✅</span>
                    <div>
                        <h3 className="font-semibold text-gray-800">Stock en orden</h3>
                        <p className="text-sm text-gray-600">Todos los productos tienen stock suficiente</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-6 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">⚠️</span>
                    <div>
                        <h3 className="font-semibold text-gray-800">Productos con bajo stock</h3>
                        <p className="text-sm text-gray-600">{count} producto{count !== 1 ? 's' : ''} necesitan reposición</p>
                    </div>
                </div>
                <Link 
                    href="/adminProducts" 
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                    Ver productos →
                </Link>
            </div>
            
            <div className="space-y-2">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-800">{item.name}</span>
                        <span className={`text-sm font-semibold ${
                            item.stock === 0 ? 'text-red-600' : 'text-orange-600'
                        }`}>
                            {item.stock} unidades
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
