import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QrCode, CheckCircle2 } from "lucide-react"

interface YapePaymentModalProps {
    finalTotal: number
    onCancel: () => void
    onConfirm: () => void
}

export default function YapePaymentModal({ finalTotal, onCancel, onConfirm }: YapePaymentModalProps) {
    return (
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg overflow-hidden">
            <DialogHeader className="space-y-3 p-6 pb-2">
                <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2.5 rounded-xl border border-purple-300 dark:border-purple-500/30 ring-2 ring-purple-200 dark:ring-purple-500/10">
                        <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                    </div>
                    <span className="font-bold bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-200 bg-clip-text text-transparent">
                        Pago con Yape
                    </span>
                </DialogTitle>
                <DialogDescription className="text-slate-600 dark:text-slate-400 text-base">
                    Escanea el código QR desde tu app Yape
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4 space-y-6">
                <div className="flex flex-col items-center justify-center space-y-6">
                    {/* QR Code simulado */}
                    <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] border-4 border-purple-500/20">
                        <div className="w-48 h-48 bg-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-50" />
                            <QrCode className="h-32 w-32 text-purple-700 relative z-10" />
                        </div>
                    </div>

                    <div className="text-center w-full bg-slate-100 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-300 dark:border-slate-800">
                        <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-1">Total a Pagar</p>
                        <p className="font-bold text-3xl text-slate-900 dark:text-white tracking-tight">S/ {finalTotal.toFixed(2)}</p>
                    </div>

                    <div className="w-full text-sm text-slate-600 dark:text-slate-400 space-y-2 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-800">
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/30 text-xs font-bold text-white">1</span>
                            Abre Yape y escanea el QR
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/30 text-xs font-bold text-white">2</span>
                            Verifica el monto y paga
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/30 text-xs font-bold text-white">3</span>
                            Confirma con el botón de abajo
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 pt-2">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="text-slate-600 dark:text-slate-400 bg-slate-200 hover:bg-slate-300 cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-900/20 border-t border-purple-400/20 cursor-pointer"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Ya pagué
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
