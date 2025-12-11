import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QrCode, CheckCircle2 } from "lucide-react"

interface PlinPaymentModalProps {
    finalTotal: number
    onCancel: () => void
    onConfirm: () => void
}

export default function PlinPaymentModal({ finalTotal, onCancel, onConfirm }: PlinPaymentModalProps) {
    return (
        <>
            <DialogHeader className="space-y-3">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                    <div className="bg-cyan-500 dark:bg-cyan-600 p-2 rounded-lg">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    Pago con Plin
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                    Escanea el código QR con tu app Plin para completar el pago
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* QR Code simulado */}
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-2 border-cyan-300 dark:border-cyan-600 shadow-lg">
                        <div className="w-48 h-48 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/50 dark:to-cyan-800/50 rounded-lg flex items-center justify-center">
                            <QrCode className="h-32 w-32 text-cyan-600 dark:text-cyan-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <p className="font-semibold text-lg text-foreground">RestaurantePro</p>
                        <p className="text-sm text-muted-foreground">Número: 987 654 321</p>
                    </div>
                    <div className="p-4 rounded-lg w-full border-2 border-cyan-500 dark:border-cyan-400">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Monto a pagar:</span>
                            <span className="font-bold text-2xl text-cyan-600 dark:text-cyan-400">S/ {finalTotal.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="text-xs text-muted-foreground space-y-1.5 mt-3">
                            <p className="flex items-center gap-2">• Abre tu app Plin</p>
                            <p className="flex items-center gap-2">• Escanea el código QR</p>
                            <p className="flex items-center gap-2">• Realiza el pago por el monto exacto</p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 dark:border-cyan-800 dark:hover:bg-cyan-900/20"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-200 dark:shadow-none"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Ya pagué
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
