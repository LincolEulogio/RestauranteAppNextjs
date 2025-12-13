"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useWaiterAuthStore } from "@/lib/stores/waiterAuthStore";
import { useWaiterCartStore } from "@/lib/stores/waiterCartStore";
import { waiterClient } from "@/lib/api/waiterClient";
import apiClient from "@/lib/api/client";
import Swal from 'sweetalert2';
import { Loader2, ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Search } from "lucide-react";
import Image from "next/image";

// Types
interface Product {
    id: number;
    name: string;
    price: string;
    image?: string;
    category_id: number;
    description?: string;
    is_available: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function WaiterOrderPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params
    const { id: tableId } = use(params);

    const router = useRouter();
    const { isAuthenticated, token } = useWaiterAuthStore();

    // State
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Cart Store
    const cart = useWaiterCartStore();

    useEffect(() => {
        if (!isAuthenticated || !token) {
            router.push("/waiter/login");
            return;
        }
        loadData();
    }, [isAuthenticated, token, router]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [catsData, prodsData] = await Promise.all([
                apiClient.get<Category[]>('/categories'),
                apiClient.get<Product[]>('/products')
            ]);
            setCategories(catsData);
            setProducts(prodsData);
        } catch (error) {
            console.error("Error loading menu data", error);
            // Do NOT force logout on generic loading errors, only on 401 which should be handled by client or catch block
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
        if (cart.items.length === 0) return;

        setSubmitting(true);
        try {
            await waiterClient.post('/orders', {
                table_id: tableId,
                items: cart.items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    notes: item.notes
                }))
            }, token!);

            cart.clearCart();

            await Swal.fire({
                icon: 'success',
                title: 'Pedido Creado',
                text: 'El pedido se ha enviado a cocina correctamente.',
                timer: 1500,
                showConfirmButton: false
            });

            router.push(`/waiter`);

        } catch (error) {
            console.error("Error submitting order", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear el pedido. Por favor intente nuevamente.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>;
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {/* Left Side: Menu */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mesa {tableId}</h1>
                    <div className="flex-1 max-w-md ml-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:placeholder:text-gray-600 dark:focus:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-500 text-gray-600 dark:text-gray-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex overflow-x-auto p-4 gap-2 no-scrollbar">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                }`}
                        >
                            Todos
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                onClick={() => cart.addItem(product)}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                            >
                                <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-700">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <div className={`w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 ${product.image ? 'hidden' : ''}`}>
                                        <div className="text-center">
                                            <div className="bg-gray-200 dark:bg-gray-600 rounded-full p-2 mb-1 mx-auto w-fit">
                                                <ShoppingBag className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-medium uppercase tracking-wide">Sin foto</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight">{product.name}</h3>
                                    </div>
                                    <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">S/ {parseFloat(product.price).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Cart */}
            <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col shadow-xl z-20">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                    <h2 className="font-bold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                        <ShoppingBag className="h-5 w-5" />
                        Pedido Actual
                    </h2>
                    {cart.items.length > 0 && (
                        <button
                            onClick={cart.clearCart}
                            className="text-red-500 text-sm hover:underline flex items-center gap-1"
                        >
                            <Trash2 className="h-3 w-3" /> Limpiar
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <ShoppingBag className="h-12 w-12 mb-2 opacity-50" />
                            <p>El carrito está vacío</p>
                            <p className="text-sm">Selecciona productos del menú</p>
                        </div>
                    ) : (
                        cart.items.map(item => (
                            <div key={item.product_id} className="flex gap-3 items-start bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                                            <ShoppingBag className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate" title={item.name}>{item.name}</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">S/ {(item.price * item.quantity).toFixed(2)}</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => cart.updateQuantity(item.product_id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="text-sm font-medium w-6 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => cart.addItem({ id: item.product_id }, 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-blue-600 dark:text-blue-400">S/ {cart.total().toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleSubmitOrder}
                        disabled={cart.items.length === 0 || submitting}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-blue-500/30"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                Confirmar Pedido
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
