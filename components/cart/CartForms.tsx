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

            <Separator className="bg-border" />
            <div className="flex justify-between items-center font-bold text-lg text-foreground">
                <span>Total</span>
                <span className="text-primary">S/. {finalTotal.toFixed(2)}</span>
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
            <h3 className="font-semibold text-base text-foreground">Tipo de Entrega</h3>

            {/* Delivery - Always selected */}
            <div className="flex items-center gap-3 p-3 border-2 rounded-xl border-primary bg-primary/5 shadow-sm">
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center border-primary">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg">
                        <Bike className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="font-bold text-sm text-foreground">Delivery</p>
                        <p className="text-xs text-muted-foreground">Envío a domicilio con pago digital</p>
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
            <Separator className="bg-border" />
            <div className="space-y-3">
                <h3 className="font-semibold text-base text-foreground mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Datos del Cliente</h3>
                <div className="space-y-2">
                    <Label htmlFor="customerName" className="font-medium mb-1 block text-foreground">Nombres</Label>
                    <Input
                        id="customerName"
                        placeholder="Ingrese sus Nombres"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerLastName" className="font-medium mb-1 block text-foreground">Apellidos</Label>
                    <Input
                        id="customerLastName"
                        placeholder="Ingrese sus Apellidos"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerDNI" className="font-medium mb-1 block text-foreground">DNI</Label>
                    <Input
                        id="customerDNI"
                        placeholder="Ingrese su DNI"
                        value={dni}
                        onChange={(e) => setDNI(e.target.value)}
                        maxLength={8}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="font-medium mb-1 block text-foreground">Email</Label>
                    <Input
                        id="customerEmail"
                        type="email"
                        placeholder="Ingrese su Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="font-medium mb-1 block text-foreground">Teléfono</Label>
                    <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="Ingrese su Teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={9}
                    />
                </div>
            </div>

            {showAddress && (
                <div className="space-y-2 mt-3">
                    <Label htmlFor="address" className="font-medium mb-1 block text-foreground">Dirección de Entrega</Label>
                    <Input
                        id="address"
                        placeholder="Ingrese su Dirección de Entrega"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
            <Separator className="bg-border" />
            <div className="space-y-3">
                <h3 className="font-semibold text-base text-foreground">Método de Pago</h3>

                {/* Tarjeta */}
                <div
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === "card"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                        }`}
                    onClick={() => setPaymentMethod("card")}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-primary" : "border-muted-foreground/30"
                        }`}>
                        {paymentMethod === "card" && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-foreground">Tarjeta</p>
                            <p className="text-xs text-muted-foreground">Crédito o Débito</p>
                        </div>
                    </div>
                </div>

                {/* Yape */}
                <div
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === "yape"
                        ? "border-purple-500 bg-purple-500/5 shadow-sm"
                        : "border-border hover:border-purple-400/50 hover:bg-accent"
                        }`}
                    onClick={() => setPaymentMethod("yape")}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "yape" ? "border-purple-500" : "border-muted-foreground/30"
                        }`}>
                        {paymentMethod === "yape" && (
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-600 p-2 rounded-lg">
                            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-foreground">Yape</p>
                            <p className="text-xs text-muted-foreground">BCP - Pago instantáneo</p>
                        </div>
                    </div>
                </div>

                {/* Plin */}
                <div
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === "plin"
                        ? "border-cyan-500 bg-cyan-500/5 shadow-sm"
                        : "border-border hover:border-cyan-400/50 hover:bg-accent"
                        }`}
                    onClick={() => setPaymentMethod("plin")}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "plin" ? "border-cyan-500" : "border-muted-foreground/30"
                        }`}>
                        {paymentMethod === "plin" && (
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-cyan-500 p-2 rounded-lg">
                            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-foreground">Plin</p>
                            <p className="text-xs text-muted-foreground">Interbank - Pago rápido</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
