"use client"

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QrCode } from "lucide-react"

interface YapePaymentModalProps {
    finalTotal: number
    onCancel: () => void
}

export default function YapePaymentModal({ finalTotal, onCancel }: YapePaymentModalProps) {
    return (
        <>
            <DialogHeader className="space-y-3">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                    <div className="bg-purple-600 dark:bg-purple-700 p-2 rounded-lg">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                    </div>
                    Pago con Yape
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                    Escanea el código QR con tu app Yape para completar el pago
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* QR Code simulado */}
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-600 shadow-lg">
                        <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-lg flex items-center justify-center">
                            <QrCode className="h-32 w-32 text-purple-600 dark:text-purple-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <p className="font-semibold text-lg text-foreground">RestaurantePro</p>
                        <p className="text-sm text-muted-foreground">Número: 987 654 321</p>
                    </div>
                    <div className="p-4 rounded-lg w-full border-2 border-purple-500 dark:border-purple-400">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Monto a pagar:</span>
                            <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">S/ {finalTotal.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="text-xs text-muted-foreground space-y-1.5 mt-3">
                            <p className="flex items-center gap-2">• Abre tu app Yape</p>
                            <p className="flex items-center gap-2">• Escanea el código QR</p>
                            <p className="flex items-center gap-2">• Confirma el pago</p>
                        </div>
                    </div>
                    <Button
                        className="w-full border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/50"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </>
    )
}
