"use client"

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

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
        <>
            <DialogHeader className="space-y-3">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                    <div className="bg-blue-500 dark:bg-blue-600 p-2 rounded-lg">
                        <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    Información de Tarjeta
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                    Ingresa los datos de tu tarjeta de crédito o débito
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="font-medium mb-3 block">Número de Tarjeta</Label>
                    <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        className="outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cardName" className="font-medium mb-3 block">Nombre del Titular</Label>
                    <Input
                        id="cardName"
                        placeholder="JUAN PEREZ"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="outline-none"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="cardExpiry" className="font-medium mb-3 block">Fecha de Expiración</Label>
                        <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cardCvv" className="font-medium mb-3 block">CVV</Label>
                        <Input
                            id="cardCvv"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={4}
                            type="password"
                            className="outline-none"
                        />
                    </div>
                </div>
                <div className="p-4 rounded-lg border-2 border-blue-500 dark:border-blue-400">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total a pagar:</span>
                        <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">S/ {finalTotal.toFixed(2)}</span>
                    </div>
                </div>
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    size="lg"
                    onClick={onConfirm}
                >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Confirmar Pago
                </Button>
            </div>
        </>
    )
}
