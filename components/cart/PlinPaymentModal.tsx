import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { QrCode, CheckCircle2, Smartphone } from "lucide-react"
import { useState } from "react"

interface PlinPaymentModalProps {
    finalTotal: number
    onCancel: () => void
    onConfirm: () => void
}

export default function PlinPaymentModal({ finalTotal, onCancel, onConfirm }: PlinPaymentModalProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const validatePhone = (phone: string): boolean => {
        if (!phone) {
            setPhoneError('Número de teléfono requerido');
            return false;
        }
        if (phone.length !== 9) {
            setPhoneError('Debe tener 9 dígitos');
            return false;
        }
        if (!phone.startsWith('9')) {
            setPhoneError('Debe iniciar con 9');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handlePhoneChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        setPhoneNumber(cleaned.slice(0, 9));
        if (cleaned.length === 9) {
            validatePhone(cleaned);
        }
    };

    const isFormValid = () => {
        return phoneNumber.length === 9 &&
            phoneNumber.startsWith('9') &&
            paymentConfirmed;
    };

    return (
        <div className="bg-background text-foreground rounded-lg overflow-hidden">
            <DialogHeader className="space-y-3 p-6 pb-2">
                <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/30">
                        <svg className="h-6 w-6 text-cyan-600 dark:text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <span className="font-bold bg-gradient-to-r from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-200 bg-clip-text text-transparent">
                        Pago con Plin
                    </span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">
                    Escanea el código QR desde tu app Plin
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4 space-y-4">
                {/* Phone Number Input */}
                <div className="space-y-2">
                    <Label htmlFor="plinPhone" className="font-medium text-foreground flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" />
                        Número de Plin
                    </Label>
                    <Input
                        id="plinPhone"
                        placeholder="987654321"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onBlur={() => validatePhone(phoneNumber)}
                        maxLength={9}
                        className={`h-11 ${phoneError ? 'border-red-500' : phoneNumber.length === 9 ? 'border-green-500' : ''}`}
                    />
                    {phoneError && (
                        <p className="text-sm text-red-500">{phoneError}</p>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* QR Code simulado */}
                    <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] border-4 border-cyan-500/10">
                        <div className="w-48 h-48 bg-cyan-50 rounded-lg flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50" />
                            <QrCode className="h-32 w-32 text-cyan-500 relative z-10" />
                        </div>
                    </div>

                    <div className="text-center w-full bg-accent/50 p-4 rounded-xl border border-border">
                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-1">Total a Pagar</p>
                        <p className="font-black text-3xl text-foreground tracking-tight">S/ {finalTotal.toFixed(2)}</p>
                    </div>

                    <div className="w-full text-sm text-muted-foreground space-y-2 bg-accent/20 p-4 rounded-xl border border-dashed border-border">
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-black text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">1</span>
                            Abre Plin y escanea el QR
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-black text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">2</span>
                            Verifica el monto y paga
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-black text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">3</span>
                            Marca la casilla y confirma
                        </p>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="w-full bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={paymentConfirmed}
                                onChange={(e) => setPaymentConfirmed(e.target.checked)}
                                className="mt-1 h-5 w-5 rounded border-cyan-500/30 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                            />
                            <span className="text-sm font-bold text-foreground/80 group-hover:text-cyan-600 transition-colors">
                                Confirmo que he realizado el pago mediante Plin
                            </span>
                        </label>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 pt-2">
                        <Button
                            variant="ghost"
                            onClick={onCancel}
                            className="bg-accent hover:bg-accent/80 text-foreground cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={!isFormValid()}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-900/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
