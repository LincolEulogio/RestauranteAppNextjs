"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Phone, Mail, MapPin, Check, AlertCircle, Info } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface TimeSlot {
    time: string
    value: string // Added value for backend time format
    table_id: number // Added table_id
    available: "high" | "medium" | "low"
    spots: number
    is_available: boolean
}

interface Table {
    id: number
    table_number: string
    capacity: number
    location: string
    status: string
    is_blocked?: boolean
    block_reason?: string
}

export default function ReservasPage() {
    const [step, setStep] = useState(1)
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
    const [availableTables, setAvailableTables] = useState<Table[]>([]) // Added state
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)
    const [isLoadingTables, setIsLoadingTables] = useState(false) // Added state
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        table_id: 0,
        guests: "",
        preferences: "",
        tableType: "",
        notes: ""
    })

    // Fetch available slots when date or guests change
    const fetchAvailability = async () => {
        if (!formData.date || !formData.guests) return

        setIsLoadingSlots(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/reservations/availability?date=${formData.date}&party_size=${formData.guests}`)
            const data = await response.json()

            if (data.available_slots) {
                const slots = data.available_slots.map((slot: any) => ({
                    time: slot.time,
                    value: slot.value,
                    table_id: slot.table_id,
                    available: slot.is_available ? "high" : "low",
                    spots: slot.remaining_capacity || 0,
                    is_available: slot.is_available
                }))
                setAvailableSlots(slots)
            } else {
                setAvailableSlots([])
            }
        } catch (error) {
            console.error("Error fetching availability:", error)
            setAvailableSlots([])
        } finally {
            setIsLoadingSlots(false)
        }
    }

    const fetchAvailableTables = async (date: string, time: string, guests: string) => {
        if (!date || !time || !guests) return

        setIsLoadingTables(true)
        setAvailableTables([])
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/reservations/available-tables?date=${date}&time=${time}&party_size=${guests}`)
            const data = await response.json()
            if (Array.isArray(data)) {
                setAvailableTables(data)
            } else {
                setAvailableTables([])
            }
        } catch (error) {
            console.error("Error fetching tables:", error)
        } finally {
            setIsLoadingTables(false)
        }
    }

    // Trigger fetch and reset time when date/guests change
    useEffect(() => {
        setFormData(prev => ({ ...prev, time: "", table_id: 0 }))
        fetchAvailability()
    }, [formData.date, formData.guests])

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case "high":
                return "bg-green-500 text-green-500 border-green-500"
            case "medium":
                return "bg-yellow-500 text-yellow-500 border-yellow-500"
            case "low":
                return "bg-red-500 text-red-500 border-red-500"
            default:
                return "bg-muted text-muted-foreground border-muted"
        }
    }

    const getAvailabilityText = (availability: string) => {
        switch (availability) {
            case "high":
                return "Alta disponibilidad"
            case "medium":
                return "Disponibilidad media"
            case "low":
                return "Pocas mesas disponibles"
            default:
                return "No disponible"
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step < 3) {
            setStep(step + 1)
        } else {
            // Submit to Backend
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/reservations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        table_id: formData.table_id,
                        customer_name: formData.name,
                        customer_email: formData.email,
                        customer_phone: formData.phone,
                        reservation_date: formData.date,
                        reservation_time: formData.time,
                        party_size: parseInt(formData.guests),
                        special_request: `${formData.preferences} ${formData.notes} - Zone: ${formData.tableType}`
                    })
                })

                if (response.ok) {
                    setStep(4)
                } else {
                    const error = await response.json()
                    alert("Error: " + (error.message || "Failed to create reservation"))
                }
            } catch (error) {
                console.error("Error submitting reservation:", error)
                alert("Network error. Please try again.")
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[300px] bg-gradient-to-r from-orange-500 via-primary to-orange-600 dark:from-orange-900 dark:via-orange-800 dark:to-orange-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80')] opacity-20 bg-cover bg-center" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Reserva tu Mesa</h1>
                    <p className="text-xl text-white/90">Vive una experiencia gastronómica inolvidable</p>
                </motion.div>
            </section>


            <main className="flex-1 container py-12">
                {/* Progress Steps */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${step >= s
                                            ? "bg-primary text-white shadow-lg scale-110"
                                            : "bg-muted text-muted-foreground dark:bg-gray-800"
                                            }`}
                                    >
                                        {step > s ? <Check className="h-6 w-6" /> : s}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${step >= s ? "text-primary" : "text-muted-foreground"}`}>
                                        {s === 1 ? "Fecha y Hora" : s === 2 ? "Tus Datos" : "Confirmar"}
                                    </span>
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`flex-1 h-1 mx-4 transition-all ${step > s ? "bg-primary" : "bg-muted dark:bg-gray-800"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {step !== 4 ? (
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Form */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-card rounded-2xl shadow-xl border p-8 hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Step 1: Fecha y Hora */}
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold mb-6">Selecciona Fecha y Hora</h2>

                                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="date" className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-primary" />
                                                                Fecha
                                                            </Label>
                                                            <Input
                                                                id="date"
                                                                type="date"
                                                                value={formData.date}
                                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                                min={new Date().toISOString().split('T')[0]}
                                                                required
                                                                className="h-12"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="guests" className="flex items-center gap-2">
                                                                <Users className="h-4 w-4 text-primary" />
                                                                Número de personas
                                                            </Label>
                                                            <Select
                                                                value={formData.guests}
                                                                onValueChange={(value) => setFormData({ ...formData, guests: value })}
                                                                required
                                                            >
                                                                <SelectTrigger className="h-12">
                                                                    <SelectValue placeholder="Selecciona" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                                        <SelectItem key={num} value={String(num)}>
                                                                            {num} {num === 1 ? "persona" : "personas"}
                                                                        </SelectItem>
                                                                    ))}
                                                                    <SelectItem value="9+">9+ personas (grupo)</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-primary" />
                                                            Horario disponible
                                                        </Label>
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                            {isLoadingSlots ? (
                                                                <p className="col-span-full text-center text-muted-foreground py-4">Buscando horarios...</p>
                                                            ) : availableSlots.length === 0 ? (
                                                                <p className="col-span-full text-center text-muted-foreground py-4">
                                                                    {formData.date ? "No hay horarios disponibles." : "Selecciona fecha y personas."}
                                                                </p>
                                                            ) : (
                                                                availableSlots.map((slot) => (
                                                                    <button
                                                                        key={slot.time}
                                                                        type="button"
                                                                        disabled={!slot.is_available}
                                                                        onClick={() => {
                                                                            setFormData({ ...formData, time: slot.value, table_id: slot.table_id }); // Default to auto-assigned table
                                                                            fetchAvailableTables(formData.date, slot.value, formData.guests);
                                                                        }}
                                                                        className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${!slot.is_available
                                                                            ? "bg-red-100 border-red-200 cursor-not-allowed text-red-800 dark:bg-red-800 dark:border-red-800 dark:text-red-50"
                                                                            : formData.time === slot.value
                                                                                ? "border-primary bg-primary text-white shadow-lg transform scale-105"
                                                                                : "border-border bg-card hover:border-primary/50 hover:shadow-md hover:scale-105"
                                                                            }`}
                                                                    >
                                                                        <div className="font-bold text-sm">{slot.time}</div>
                                                                        <div
                                                                            className={`absolute top-2 right-2 w-2 h-2 rounded-full ${!slot.is_available ? "bg-red-500" : getAvailabilityColor(slot.available).split(' ')[0]
                                                                                }`}
                                                                        />
                                                                    </button>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* TABLE SELECTION SECTION */}
                                                    {formData.time && (
                                                        <div className="space-y-3 pt-4 border-t mt-3">
                                                            <Label className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-primary" />
                                                                Selecciona tu Mesa
                                                            </Label>

                                                            {isLoadingTables ? (
                                                                <div className="flex justify-center py-8">
                                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                                </div>
                                                            ) : availableTables.length === 0 ? (
                                                                <div className="text-center py-8 border-2 border-dashed rounded-xl border-muted-foreground/20">
                                                                    <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                                    <p className="text-muted-foreground">No hay mesas disponibles para esta hora exacta.</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">Intenta con otro horario cercano.</p>
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                                    {availableTables.map((table) => {
                                                                        const isBlocked = table.is_blocked;
                                                                        return (
                                                                            <div
                                                                                key={table.id}
                                                                                onClick={() => !isBlocked && setFormData({ ...formData, table_id: table.id, tableType: table.location })}
                                                                                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${isBlocked
                                                                                    ? "border-muted bg-muted/50 opacity-70 cursor-not-allowed"
                                                                                    : "cursor-pointer group hover:border-primary/40 hover:bg-accent/40 hover:scale-[1.01]"
                                                                                    } ${formData.table_id === table.id && !isBlocked
                                                                                        ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                                                                                        : isBlocked ? "" : "border-border/60"
                                                                                    }`}
                                                                            >
                                                                                {/* Selection Indicator */}
                                                                                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.table_id === table.id
                                                                                    ? "bg-primary border-primary"
                                                                                    : "border-muted-foreground/30 bg-background"
                                                                                    }`}>
                                                                                    {formData.table_id === table.id && <Check className="h-3 w-3 text-white" />}
                                                                                </div>

                                                                                {/* Blocked Badge */}
                                                                                {isBlocked && (
                                                                                    <div className="absolute top-3 right-10 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                                                                                        OCUPADO
                                                                                    </div>
                                                                                )}

                                                                                <div className="flex items-start gap-3">
                                                                                    <div className={`p-2.5 rounded-lg ${formData.table_id === table.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                                                                                        }`}>
                                                                                        <MapPin className="h-5 w-5" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <h4 className={`font-bold ${formData.table_id === table.id ? "text-primary" : "text-foreground"}`}>
                                                                                            Mesa {table.table_number}
                                                                                        </h4>
                                                                                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                                                            <span className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded">
                                                                                                <Users className="h-3 w-3" />
                                                                                                {table.capacity} p.
                                                                                            </span>
                                                                                            <span className="flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded capitalize">
                                                                                                {table.location === 'Indoor' ? 'Interior' : 'Exterior'}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}


                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        className="w-full h-12 mt-5"
                                                        disabled={
                                                            !formData.date ||
                                                            !formData.time ||
                                                            !formData.guests ||
                                                            !formData.table_id || // Ensure table is selected
                                                            !availableSlots.find(s => s.value === formData.time && s.is_available)
                                                        }
                                                    >
                                                        Continuar
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Datos personales */}
                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold mb-6">Tus Datos</h2>

                                                    <div className="space-y-5">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="name">Nombre completo</Label>
                                                            <Input
                                                                id="name"
                                                                placeholder="Juan Pérez García"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                required
                                                                className="h-12"
                                                            />
                                                        </div>

                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="phone" className="flex items-center gap-2">
                                                                    <Phone className="h-4 w-4 text-primary" />
                                                                    Teléfono / WhatsApp
                                                                </Label>
                                                                <Input
                                                                    id="phone"
                                                                    type="tel"
                                                                    placeholder="+51 987 654 321"
                                                                    value={formData.phone}
                                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                    required
                                                                    className="h-12"
                                                                />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="email" className="flex items-center gap-2">
                                                                    <Mail className="h-4 w-4 text-primary" />
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    id="email"
                                                                    type="email"
                                                                    placeholder="correo@ejemplo.com"
                                                                    value={formData.email}
                                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                    required
                                                                    className="h-12"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="tableType">Tipo de mesa / Zona</Label>
                                                            <Select
                                                                value={formData.tableType}
                                                                onValueChange={(value) => setFormData({ ...formData, tableType: value })}
                                                            >
                                                                <SelectTrigger className="h-12">
                                                                    <SelectValue placeholder="Selecciona una preferencia" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="interior">Interior - Ambiente acogedor</SelectItem>
                                                                    <SelectItem value="ventana">Junto a la ventana</SelectItem>
                                                                    <SelectItem value="terraza">Terraza - Al aire libre</SelectItem>
                                                                    <SelectItem value="privado">Área privada</SelectItem>
                                                                    <SelectItem value="barra">Barra del bar</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="preferences">Preferencias especiales (opcional)</Label>
                                                            <Input
                                                                id="preferences"
                                                                placeholder="Ej: Celebración, cumpleaños, aniversario..."
                                                                value={formData.preferences}
                                                                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                                                                className="h-12"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                                                            <Textarea
                                                                id="notes"
                                                                rows={3}
                                                                placeholder="Alergias, restricciones dietéticas, solicitudes especiales..."
                                                                value={formData.notes}
                                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                                className="resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="lg"
                                                        onClick={() => setStep(1)}
                                                        className="flex-1 h-12"
                                                    >
                                                        Volver
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        className="flex-1 h-12"
                                                        disabled={!formData.name || !formData.phone || !formData.email}
                                                    >
                                                        Continuar
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Confirmación */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold mb-6">Confirma tu Reserva</h2>

                                                    <div className="space-y-4">
                                                        <div className="bg-white dark:bg-gray-600 dark:text-blue-50  rounded-xl p-6 border">
                                                            <h3 className="font-bold mb-4 text-lg dark:text-white">Detalles de la reserva</h3>
                                                            <div className="space-y-3">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-muted-foreground dark:text-white">Nombre:</span>
                                                                    <span className="font-medium dark:text-white">{formData.name}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-muted-foreground dark:text-white">Fecha:</span>
                                                                    <span className="font-medium dark:text-white">{formData.date}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-muted-foreground dark:text-white">Hora:</span>
                                                                    <span className="font-medium dark:text-white">{formData.time}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-muted-foreground dark:text-white">Personas:</span>
                                                                    <span className="font-medium dark:text-white">{formData.guests}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-muted-foreground dark:text-white">Teléfono:</span>
                                                                    <span className="font-medium dark:text-white">{formData.phone}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-muted-foreground dark:text-white">Email:</span>
                                                                    <span className="font-medium dark:text-white">{formData.email}</span>
                                                                </div>
                                                                {formData.tableType && (
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-muted-foreground dark:text-white">Mesa:</span>
                                                                        <span className="font-medium dark:text-white">{formData.tableType}</span>
                                                                    </div>
                                                                )}
                                                                {formData.preferences && (
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-muted-foreground dark:text-white">Preferencias:</span>
                                                                        <span className="font-medium">{formData.preferences}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
                                                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                                            <div className="text-sm text-blue-900 dark:text-blue-200">
                                                                <p className="font-medium mb-1 dark:text-blue-50">Información importante:</p>
                                                                <ul className="space-y-1 text-blue-800 dark:text-blue-50">
                                                                    <li>• Recibirás confirmación por email y WhatsApp</li>
                                                                    <li>• Te enviaremos un recordatorio 1 hora antes</li>
                                                                    <li>• Puedes cancelar o reprogramar hasta 2 horas antes</li>
                                                                    <li>• Reserva válida por 15 minutos de tolerancia</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="lg"
                                                        onClick={() => setStep(2)}
                                                        className="flex-1 h-12"
                                                    >
                                                        Volver
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        className="flex-1 h-12"
                                                    >
                                                        Confirmar Reserva
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </motion.div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-6 sticky top-6"
                                >
                                    {/* Availability Legend */}
                                    <div className="bg-card rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-shadow duration-300">
                                        <h3 className="font-bold mb-4">Disponibilidad</h3>
                                        <div className="space-y-3">
                                            {["high", "medium", "low"].map((level) => (
                                                <div key={level} className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(level).split(' ')[0]}`} />
                                                    <span className="text-sm">{getAvailabilityText(level)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Restaurant Info */}
                                    <div className="bg-gradient-to-br from-primary to-orange-600 dark:from-orange-900 dark:to-orange-950 rounded-2xl shadow-lg border border-primary/20 p-6 text-white hover:shadow-xl transition-shadow duration-300">
                                        <h3 className="font-bold mb-4">Información</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Dirección</p>
                                                    <p className="text-white/80">Av. Larco 123, Miraflores</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Clock className="h-5 w-5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Horario</p>
                                                    <p className="text-white/80">11:00 AM - 11:00 PM</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Phone className="h-5 w-5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Teléfono</p>
                                                    <p className="text-white/80">+51 987 654 321</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tips */}
                                    <div className="bg-card rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-shadow duration-300">
                                        <h3 className="font-bold mb-4">Consejos</h3>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                                                <p>Para grupos de 9+ personas, contacta directamente</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                                                <p>Horarios pico: 1-2 PM y 7-9 PM</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                                                <p>Consulta por menús especiales</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div >
                    </div >
                ) : (
                    /* Success Screen */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="bg-card rounded-3xl shadow-2xl border p-12">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <Check className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">¡Reserva Confirmada!</h2>
                            <p className="text-muted-foreground mb-8">
                                Hemos enviado la confirmación a tu email y WhatsApp.
                                <br />
                                Te recordaremos tu reserva 1 hora antes.
                            </p>
                            <div className="bg-muted rounded-2xl p-6 mb-8 border">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground mb-1">Fecha</p>
                                        <p className="font-bold">{formData.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1">Hora</p>
                                        <p className="font-bold">{formData.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1">Personas</p>
                                        <p className="font-bold">{formData.guests}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1">Código</p>
                                        <p className="font-bold text-primary">#RSV{Math.floor(Math.random() * 10000)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                    onClick={() => {
                                        setStep(1)
                                        setFormData({
                                            name: "",
                                            phone: "",
                                            email: "",
                                            date: "",
                                            time: "",
                                            table_id: 0,
                                            guests: "",
                                            preferences: "",
                                            tableType: "",
                                            notes: ""
                                        })
                                    }}
                                >
                                    Nueva Reserva
                                </Button>
                                <Button size="lg" className="flex-1">
                                    <Link href="/menu">Ir al Menú</Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )
                }
            </main >

            <Footer />
        </div >
    )
}
