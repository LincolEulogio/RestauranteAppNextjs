"use client"

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, AlertCircle, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"

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

// Luhn Algorithm for card validation
const luhnCheck = (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(digits)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

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
    const [errors, setErrors] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: ''
    });

    const [touched, setTouched] = useState({
        cardNumber: false,
        cardName: false,
        cardExpiry: false,
        cardCvv: false
    });

    // Format card number with spaces
    const handleCardNumberChange = (value: string) => {
        const cleaned = value.replace(/\s/g, '');
        const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formatted.slice(0, 19));
    };

    // Format expiry date
    const handleExpiryChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            setCardExpiry(cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4));
        } else {
            setCardExpiry(cleaned);
        }
    };

    // Validate card number
    const validateCardNumber = (number: string): string => {
        const cleaned = number.replace(/\s/g, '');
        if (!cleaned) return 'Número de tarjeta requerido';
        if (cleaned.length < 16) return 'Debe tener 16 dígitos';
        if (!luhnCheck(cleaned)) return 'Número de tarjeta inválido';
        return '';
    };

    // Validate cardholder name
    const validateCardName = (name: string): string => {
        if (!name.trim()) return 'Nombre del titular requerido';
        if (name.trim().length < 3) return 'Nombre muy corto';
        if (!/^[a-zA-Z\s]+$/.test(name)) return 'Solo letras y espacios';
        return '';
    };

    // Validate expiry date
    const validateExpiry = (expiry: string): string => {
        if (!expiry) return 'Fecha de expiración requerida';
        if (expiry.length < 5) return 'Formato: MM/YY';

        const [month, year] = expiry.split('/');
        const monthNum = parseInt(month);
        const yearNum = parseInt('20' + year);

        if (monthNum < 1 || monthNum > 12) return 'Mes inválido';

        const now = new Date();
        const expDate = new Date(yearNum, monthNum - 1);

        if (expDate < now) return 'Tarjeta expirada';
        return '';
    };

    // Validate CVV
    const validateCvv = (cvv: string): string => {
        if (!cvv) return 'CVV requerido';
        if (cvv.length < 3) return 'Debe tener 3-4 dígitos';
        if (!/^\d+$/.test(cvv)) return 'Solo números';
        return '';
    };

    // Update errors on field change
    useEffect(() => {
        if (touched.cardNumber) {
            setErrors(prev => ({ ...prev, cardNumber: validateCardNumber(cardNumber) }));
        }
    }, [cardNumber, touched.cardNumber]);

    useEffect(() => {
        if (touched.cardName) {
            setErrors(prev => ({ ...prev, cardName: validateCardName(cardName) }));
        }
    }, [cardName, touched.cardName]);

    useEffect(() => {
        if (touched.cardExpiry) {
            setErrors(prev => ({ ...prev, cardExpiry: validateExpiry(cardExpiry) }));
        }
    }, [cardExpiry, touched.cardExpiry]);

    useEffect(() => {
        if (touched.cardCvv) {
            setErrors(prev => ({ ...prev, cardCvv: validateCvv(cardCvv) }));
        }
    }, [cardCvv, touched.cardCvv]);

    const isFormValid = () => {
        return !validateCardNumber(cardNumber) &&
            !validateCardName(cardName) &&
            !validateExpiry(cardExpiry) &&
            !validateCvv(cardCvv);
    };

    const getFieldStatus = (field: keyof typeof errors) => {
        if (!touched[field]) return '';
        return errors[field] ? 'error' : 'success';
    };

    return (
        <div className="bg-background text-foreground rounded-lg overflow-hidden">
            <DialogHeader className="space-y-3 p-6 pb-2">
                <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/30">
                        <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
                        Pago con Tarjeta
                    </span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">
                    Ingresa los datos de tu tarjeta para procesar el pago
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4 space-y-4">
                {/* Card Number */}
                <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="font-medium mb-1.5 block text-foreground">
                        Número de Tarjeta
                    </Label>
                    <div className="relative">
                        <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, cardNumber: true }))}
                            maxLength={19}
                            className={`h-11 pr-10 ${getFieldStatus('cardNumber') === 'error'
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : getFieldStatus('cardNumber') === 'success'
                                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                                    : ''
                                }`}
                        />
                        {getFieldStatus('cardNumber') && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {getFieldStatus('cardNumber') === 'error' ? (
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                ) : (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                        )}
                    </div>
                    {errors.cardNumber && touched.cardNumber && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cardNumber}
                        </p>
                    )}
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2">
                    <Label htmlFor="cardName" className="font-medium mb-1.5 block text-foreground">
                        Nombre del Titular
                    </Label>
                    <div className="relative">
                        <Input
                            id="cardName"
                            placeholder="JUAN PEREZ"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            onBlur={() => setTouched(prev => ({ ...prev, cardName: true }))}
                            className={`h-11 pr-10 ${getFieldStatus('cardName') === 'error'
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : getFieldStatus('cardName') === 'success'
                                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                                    : ''
                                }`}
                        />
                        {getFieldStatus('cardName') && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {getFieldStatus('cardName') === 'error' ? (
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                ) : (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                        )}
                    </div>
                    {errors.cardName && touched.cardName && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cardName}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Expiry Date */}
                    <div className="space-y-2">
                        <Label htmlFor="cardExpiry" className="font-medium mb-1.5 block text-foreground">
                            Fecha de Expiración
                        </Label>
                        <div className="relative">
                            <Input
                                id="cardExpiry"
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => handleExpiryChange(e.target.value)}
                                onBlur={() => setTouched(prev => ({ ...prev, cardExpiry: true }))}
                                maxLength={5}
                                className={`h-11 pr-10 ${getFieldStatus('cardExpiry') === 'error'
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : getFieldStatus('cardExpiry') === 'success'
                                        ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                                        : ''
                                    }`}
                            />
                            {getFieldStatus('cardExpiry') && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {getFieldStatus('cardExpiry') === 'error' ? (
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            )}
                        </div>
                        {errors.cardExpiry && touched.cardExpiry && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.cardExpiry}
                            </p>
                        )}
                    </div>

                    {/* CVV */}
                    <div className="space-y-2">
                        <Label htmlFor="cardCvv" className="font-medium mb-1.5 block text-foreground">
                            CVV
                        </Label>
                        <div className="relative">
                            <Input
                                id="cardCvv"
                                placeholder="123"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                                onBlur={() => setTouched(prev => ({ ...prev, cardCvv: true }))}
                                maxLength={4}
                                type="password"
                                className={`h-11 pr-10 ${getFieldStatus('cardCvv') === 'error'
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : getFieldStatus('cardCvv') === 'success'
                                        ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                                        : ''
                                    }`}
                            />
                            {getFieldStatus('cardCvv') && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {getFieldStatus('cardCvv') === 'error' ? (
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            )}
                        </div>
                        {errors.cardCvv && touched.cardCvv && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.cardCvv}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-accent/50 border border-border flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Total a pagar:</span>
                    <span className="font-bold text-2xl text-foreground">S/ {finalTotal.toFixed(2)}</span>
                </div>

                <Button
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11 text-base shadow-lg shadow-blue-900/20 border-t border-blue-400/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onConfirm}
                    disabled={!isFormValid()}
                >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Confirmar Pago
                </Button>
            </div>
        </div>
    )
}
