"use client"

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"

interface CardPaymentModalProps {
    cardNumber: string
    setCardNumber: (value: string) => void
    cardName: string
    setCardName: (value: string) => void
    cardExpiry: string
    setCardExpiry: (value: string) => void
    cardCvv: string
    setCardCvv: (value: string) => void
    finalTotal: number
    onConfirm: () => void
}

export default function CardPaymentModal({
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvv,
    setCardCvv,
    finalTotal,
    onConfirm
}: CardPaymentModalProps) {
    return (
        <div className="bg-slate-950 text-slate-100 rounded-lg overflow-hidden">
            <DialogHeader className="space-y-3 p-6 pb-2">
                <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-blue-900/50 p-2.5 rounded-xl border border-blue-500/30 ring-2 ring-blue-500/10">
                        <CreditCard className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                        Pago con Tarjeta
                    </span>
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-base">
                    Ingresa los datos de tu tarjeta para procesar el pago
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="font-medium mb-1.5 block text-slate-300">Número de Tarjeta</Label>
                    <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        className="h-11 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cardName" className="font-medium mb-1.5 block text-slate-300">Nombre del Titular</Label>
                    <Input
                        id="cardName"
                        placeholder="JUAN PEREZ"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="h-11 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="cardExpiry" className="font-medium mb-1.5 block text-slate-300">Fecha de Expiración</Label>
                        <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="h-11 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cardCvv" className="font-medium mb-1.5 block text-slate-300">CVV</Label>
                        <Input
                            id="cardCvv"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={4}
                            type="password"
                            className="h-11 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-400">Total a pagar:</span>
                    <span className="font-bold text-2xl text-white">S/ {finalTotal.toFixed(2)}</span>
                </div>

                <Button
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11 text-base shadow-lg shadow-blue-900/20 border-t border-blue-400/20 mt-2"
                    onClick={onConfirm}
                >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Confirmar Pago
                </Button>
            </div>
        </div>
    )
}
