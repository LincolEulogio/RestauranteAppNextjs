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
        <div className="bg-slate-950 text-slate-100 rounded-lg overflow-hidden">
            <DialogHeader className="space-y-3 p-6 pb-2">
                <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-cyan-900/50 p-2.5 rounded-xl border border-cyan-500/30 ring-2 ring-cyan-500/10">
                        <svg className="h-6 w-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <span className="font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                        Pago con Plin
                    </span>
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-base">
                    Escanea el código QR desde tu app Plin
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4 space-y-6">
                <div className="flex flex-col items-center justify-center space-y-6">
                    {/* QR Code simulado */}
                    <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] border-4 border-cyan-500/20">
                        <div className="w-48 h-48 bg-cyan-100 rounded-lg flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-50" />
                            <QrCode className="h-32 w-32 text-cyan-600 relative z-10" />
                        </div>
                    </div>

                    <div className="text-center w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-1">Total a Pagar</p>
                        <p className="font-bold text-3xl text-white tracking-tight">S/ {finalTotal.toFixed(2)}</p>
                    </div>

                    <div className="w-full text-sm text-slate-400 space-y-2 bg-slate-900/30 p-4 rounded-lg border border-dashed border-slate-800">
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-900/30 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/50">1</span>
                            Abre Plin y escanea el QR
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-900/30 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/50">2</span>
                            Verifica el monto y paga
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-900/30 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/50">3</span>
                            Confirma con el botón de abajo
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 pt-2">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-900/20 border-t border-cyan-400/20"
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
