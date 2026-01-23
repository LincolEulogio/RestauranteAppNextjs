"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api/client";
import { useTableCartStore } from "@/lib/stores/waiterTableStore";
import { Loader2, ArrowLeft, Plus, Minus, Search, ShoppingBag, Bell, Receipt, CheckCircle, Smartphone, UtensilsCrossed, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Types (Reusing interfaces for simplicity)
interface Product {
    id: number;
    name: string;
    price: string;
    image_url?: string;
    category_id: number;
    description?: string;
    is_available: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface TableInfo {
    id: number;
    table_number: string;
    qr_code: string;
}

export default function TableMenuPage({ params }: { params: Promise<{ qrCode: string }> }) {
    const { qrCode } = use(params);
    const router = useRouter();

    // State
    const [table, setTable] = useState<TableInfo | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewCart, setViewCart] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Cart
    const cart = useTableCartStore();

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrCode]);

    const loadData = async () => {
        try {
            setLoading(true);
            // Fetch table info again ensuring validity
            const tableData = await apiClient.get<{ table: TableInfo }>(`/qr/table/${qrCode}`);
            setTable(tableData.table);

            const [catsData, prodsData] = await Promise.all([
                apiClient.get<Category[]>('/categories'),
                apiClient.get<Product[]>('/products')
            ]);
            setCategories(catsData);
            setProducts(prodsData);
        } catch (error) {
            console.error("Error loading data", error);
            router.push(`/table/${qrCode}`); // Redirect back if error
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category_id === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch && product.is_available;
    });

    const handleSubmitOrder = async () => {
        if (cart.items.length === 0 || !table) return;

        setSubmitting(true);
        try {
            await apiClient.post('/qr/orders', {
                table_id: table.id,
                items: cart.items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    notes: item.notes
                }))
            });

            cart.clearCart();
            setOrderSuccess(true);
            setViewCart(false);

            // Auto hide success message after 3s
            setTimeout(() => setOrderSuccess(false), 5000);

        } catch (error) {
            console.error("Error submitting order", error);
            alert("Error al enviar el pedido. Intente nuevamente.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCallWaiter = async () => {
        if (!table) return;
        try {
            await apiClient.post('/qr/call-waiter', { table_id: table.id });
            alert("El mesero ha sido notificado.");
        } catch (error) {
            alert("Error al llamar al mesero");
        }
    };

    const handleRequestBill = async () => {
        if (!table) return;
        try {
            await apiClient.post('/qr/request-bill', { table_id: table.id });
            alert("Se ha solicitado la cuenta.");
        } catch (error) {
            alert("Error al solicitar la cuenta");
        }
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {/* Header Mobile */}
            <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                        {table?.table_number}
                    </div>
                    <h1 className="font-bold text-sm text-gray-900 dark:text-white">Sabor Premium</h1>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleCallWaiter}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                        title="Llamar Mesero"
                    >
                        <Bell className="h-4 w-4" />
                    </button>
                    <button
                        onClick={handleRequestBill}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                        title="Pedir Cuenta"
                    >
                        <Receipt className="h-4 w-4" />
                    </button>
                </div>
            </header>

            {/* Search & Categories */}
            <div className="bg-white dark:bg-gray-800 pb-2 flex-shrink-0">
                <div className="px-4 py-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="¿Qué se te antoja?"
                            className="pl-10 border-none bg-gray-100 dark:bg-gray-700 rounded-xl focus-visible:ring-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex overflow-x-auto px-4 gap-2 no-scrollbar pb-2">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === 'all'
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === cat.id
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
                {orderSuccess && (
                    <div className="bg-green-100 border border-green-200 text-green-800 rounded-xl p-4 flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                            <h3 className="font-bold text-sm">¡Pedido Enviado!</h3>
                            <p className="text-xs">La cocina ha recibido tu orden.</p>
                        </div>
                    </div>
                )}

                {filteredProducts.map(product => (
                    <div key={product.id} className="flex gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                            {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <UtensilsCrossed className="h-6 w-6 opacity-50" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{product.description || "Delicioso plato preparado al momento."}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-blue-600">S/ {parseFloat(product.price).toFixed(2)}</span>
                                <button
                                    onClick={() => cart.addItem(product)}
                                    className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-full hover:opacity-80 transition-opacity"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Cart Bar */}
            {cart.items.length > 0 && (
                <div className="absolute bottom-6 left-4 right-4 z-20">
                    <div className="bg-black dark:bg-white text-white dark:text-black rounded-2xl shadow-xl p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setViewCart(true)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 dark:bg-black/10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                            </div>
                            <span className="font-medium text-sm">Ver mi pedido</span>
                        </div>
                        <span className="font-bold">S/ {cart.total().toFixed(2)}</span>
                    </div>
                </div>
            )}

            {/* Cart Modal / Sheet */}
            {viewCart && (
                <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md h-[80vh] sm:h-[600px] sm:rounded-2xl rounded-t-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 rounded-t-2xl">
                            <h2 className="font-bold text-lg">Tu Pedido</h2>
                            <button onClick={() => setViewCart(false)} className="text-gray-500 hover:text-gray-900">
                                Cerrar
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.items.map(item => (
                                <div key={item.product_id} className="flex gap-3 justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-3 last:border-0">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex flex-col items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                            <button onClick={() => cart.updateQuantity(item.product_id, item.quantity + 1)}><Plus className="h-3 w-3" /></button>
                                            <span className="text-xs font-bold">{item.quantity}</span>
                                            <button onClick={() => cart.updateQuantity(item.product_id, item.quantity - 1)}><Minus className="h-3 w-3" /></button>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-blue-600 text-xs font-bold">S/ {(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => cart.removeItem(item.product_id)} className="text-red-500 bg-red-50 p-1.5 rounded-lg">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-500">Total a pagar</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">S/ {cart.total().toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleSubmitOrder}
                                disabled={submitting}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-center disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
                                {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Ordenar Ahora"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
