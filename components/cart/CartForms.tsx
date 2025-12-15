import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bike, CreditCard, User } from "lucide-react"

interface CartSummaryProps {
    subtotal: number
    shipping: number
    taxes: number
    finalTotal: number
}

export const CartSummary = ({ subtotal, shipping, taxes, finalTotal }: CartSummaryProps) => {
    return (
        <>
            <div className="space-y-2">
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">Resumen del Pedido</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                        <span className="text-slate-900 dark:text-slate-200">S/. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Envío</span>
                        <span className="text-slate-900 dark:text-slate-200">S/. {shipping.toFixed(2)}</span>
                    </div>


                </div>
            </div>

            <Separator className="bg-slate-200 dark:bg-slate-700 from-transparent" />

            <div className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white">
                <span>Total</span>
                <span>S/. {finalTotal.toFixed(2)}</span>
            </div>
        </>
    )
}

interface CartOrderTypeSelectorProps {
    orderType: "delivery" | "online" | null
    setOrderType: (type: "delivery" | "online") => void
    setPaymentMethod: (method: any) => void
}

export const CartOrderTypeSelector = ({ orderType, setOrderType, setPaymentMethod }: CartOrderTypeSelectorProps) => {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">Tipo de Entrega</h3>

            {/* Delivery - Always selected */}
            <div className="flex items-center gap-3 p-3 border-2 rounded-lg border-blue-500 dark:border-blue-400 shadow-sm bg-blue-50/50 dark:bg-blue-900/10">
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-blue-500 dark:border-blue-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-blue-500 p-1.5 rounded">
                        <Bike className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-white">Delivery</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Envío a domicilio con pago digital</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

interface CartCustomerFormProps {
    name: string; setName: (v: string) => void
    lastName: string; setLastName: (v: string) => void
    dni: string; setDNI: (v: string) => void
    email: string; setEmail: (v: string) => void
    phone: string; setPhone: (v: string) => void
    address: string; setAddress: (v: string) => void
    showAddress: boolean
}

export const CartCustomerForm = ({
    name, setName,
    lastName, setLastName,
    dni, setDNI,
    email, setEmail,
    phone, setPhone,
    address, setAddress,
    showAddress
}: CartCustomerFormProps) => {
    return (
        <>
            <Separator className="bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-3">
                <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-900 dark:text-white" />
                    Datos del Cliente</h3>
                <div className="space-y-2">
                    <Label htmlFor="customerName" className="font-medium mb-3 block text-slate-900 dark:text-white">Nombres</Label>
                    <Input
                        id="customerName"
                        placeholder="Ingrese sus Nombres"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="dark:placeholder:text-slate-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerLastName" className="font-medium mb-3 block text-slate-900 dark:text-white">Apellidos</Label>
                    <Input
                        id="customerLastName"
                        placeholder="Ingrese sus Apellidos"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="dark:placeholder:text-slate-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerDNI" className="font-medium mb-3 block text-slate-900 dark:text-white">DNI</Label>
                    <Input
                        id="customerDNI"
                        placeholder="Ingrese su DNI"
                        value={dni}
                        onChange={(e) => setDNI(e.target.value)}
                        maxLength={8}
                        className="dark:placeholder:text-slate-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="font-medium mb-3 block text-slate-900 dark:text-white">Email</Label>
                    <Input
                        id="customerEmail"
                        type="email"
                        placeholder="Ingrese su Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="dark:placeholder:text-slate-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="font-medium mb-3 block text-slate-900 dark:text-white">Teléfono</Label>
                    <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="Ingrese su Teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={9}
                        className="dark:placeholder:text-slate-500"
                    />
                </div>
            </div>

            {showAddress && (
                <div className="space-y-2 mt-3">
                    <Label htmlFor="address" className="font-medium mb-3 block text-slate-900 dark:text-white">Dirección de Entrega</Label>
                    <Input
                        id="address"
                        placeholder="Ingrese su Dirección de Entrega"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="dark:placeholder:text-slate-500"
                    />
                </div>
            )}
        </>
    )
}

interface CartPaymentMethodSelectorProps {
    paymentMethod: "card" | "yape" | "plin" | null
    setPaymentMethod: (method: "card" | "yape" | "plin") => void
}

export const CartPaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: CartPaymentMethodSelectorProps) => {
    return (
        <>
            <Separator className="bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-3">
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">Método de Pago</h3>

                {/* Tarjeta */}
                <div
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === "card"
                        ? "border-blue-500 dark:border-blue-400 shadow-sm bg-blue-50/50 dark:bg-blue-900/10"
                        : "border-gray-200 dark:border-slate-700 hover:border-blue-300 hover:bg-slate-50 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                        }`}
                    onClick={() => setPaymentMethod("card")}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-blue-500 dark:border-blue-400" : "border-muted-foreground/30"
                        }`}>
                        {paymentMethod === "card" && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 p-1.5 rounded">
                            <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-sm text-slate-900 dark:text-white">Tarjeta</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Crédito o Débito</p>
                        </div>
                    </div>
                </div>

                {/* Yape */}
                <div
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === "yape"
                        ? "border-purple-500 dark:border-purple-600 shadow-sm"
                        : "border-border hover:border-purple-300"
                        }`}
                    onClick={() => setPaymentMethod("yape")}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "yape" ? "border-purple-500 dark:border-purple-600" : "border-muted-foreground/30"
                        }`}>
                        {paymentMethod === "yape" && (
                            <div className="w-2 h-2 rounded-full bg-purple-200 dark:bg-purple-600" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-600 p-1.5 rounded">
                            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-sm text-slate-900 dark:text-white">Yape</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">BCP - Pago instantáneo</p>
                        </div>
                    </div>
                </div>

                {/* Plin */}
                <div
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === "plin"
                        ? "border-cyan-500 dark:border-cyan-600 shadow-sm"
                        : "border-border hover:border-cyan-300 hover:bg-slate-50 dark:hover:border-gray-600 dark:hover:bg-slate-800"
                        }`}
                    onClick={() => setPaymentMethod("plin")}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "plin" ? "border-cyan-500 dark:border-cyan-600" : "border-muted-foreground/30"
                        }`}>
                        {paymentMethod === "plin" && (
                            <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-600" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-cyan-500 p-1.5 rounded">
                            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-sm text-slate-900 dark:text-white">Plin</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Interbank - Pago rápido</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
