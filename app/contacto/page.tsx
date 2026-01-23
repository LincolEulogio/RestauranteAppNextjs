"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica de envío
        alert("Mensaje enviado! Nos pondremos en contacto pronto.")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }

    const contactInfo = [
        {
            icon: MapPin,
            title: "Dirección",
            content: "Av. Larco 123, Miraflores",
            subtitle: "Lima, Perú",
            color: "bg-blue-500"
        },
        {
            icon: Phone,
            title: "Teléfono",
            content: "+51 987 654 321",
            subtitle: "Lun - Dom: 11:00 AM - 11:00 PM",
            color: "bg-green-500"
        },
        {
            icon: Mail,
            title: "Email",
            content: "contacto@sabor.pe",
            subtitle: "info@sabor.pe",
            color: "bg-purple-500"
        },
        {
            icon: Clock,
            title: "Horario",
            content: "11:00 AM - 11:00 PM",
            subtitle: "Todos los días",
            color: "bg-orange-500"
        }
    ]

    const socialMedia = [
        { icon: Facebook, name: "Facebook", link: "#", color: "hover:bg-blue-600" },
        { icon: Instagram, name: "Instagram", link: "#", color: "hover:bg-pink-600" },
        { icon: Twitter, name: "Twitter", link: "#", color: "hover:bg-sky-500" }
    ]

    return (
        <div className="min-h-screen flex flex-col">
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
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Contáctanos</h1>
                    <p className="text-xl text-white/90">Estamos aquí para atenderte</p>
                </motion.div>
            </section>

            <main className="flex-1">
                {/* Contact Info Cards */}
                <section className="container py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border hover:scale-105 h-full">
                                    <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        <info.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                                    <p className="text-foreground font-medium">{info.content}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{info.subtitle}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form & Map Section */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-card rounded-2xl p-8 shadow-xl border hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-primary/10 rounded-lg animate-pulse">
                                        <MessageSquare className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Envíanos un mensaje</h2>
                                        <p className="text-sm text-muted-foreground">Te responderemos lo antes posible</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nombre completo</Label>
                                            <Input
                                                id="name"
                                                placeholder="Juan Pérez"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+51 987 654 321"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="correo@ejemplo.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Asunto</Label>
                                        <Input
                                            id="subject"
                                            placeholder="¿En qué podemos ayudarte?"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            className="h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Mensaje</Label>
                                        <Textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Escribe tu mensaje aquí..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            className="resize-none"
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full gap-2 h-12 hover:scale-105 transition-transform group">
                                        <Send className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                                        Enviar mensaje
                                    </Button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Map & Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Map */}
                            <div className="bg-card rounded-2xl overflow-hidden shadow-xl border hover:shadow-2xl transition-shadow duration-300 h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3344536984994!2d-77.03195492507895!3d-12.08408188830999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d35662c7%3A0x4a8f4e5f7b5a5f5a!2sMiraflores%2C%20Lima!5e0!3m2!1ses!2spe!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Social Media */}
                            <div className="bg-gradient-to-br from-primary/10 to-orange-50 dark:from-primary/20 dark:to-orange-950/30 rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-xl font-bold mb-4">Síguenos en redes sociales</h3>
                                <p className="text-muted-foreground mb-6">
                                    Mantente al día con nuestras últimas ofertas y eventos especiales
                                </p>
                                <div className="flex gap-4">
                                    {socialMedia.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.link}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-12 h-12 bg-card border rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all ${social.color} hover:text-white group`}
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-card rounded-2xl p-8 shadow-xl border hover:shadow-2xl transition-shadow duration-300">
                                <h3 className="text-xl font-bold mb-4">Información adicional</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                        <p className="text-muted-foreground">
                                            Aceptamos reservas para grupos grandes con 48 horas de anticipación
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                        <p className="text-muted-foreground">
                                            Delivery disponible en un radio de 5km desde el restaurante
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                                        <p className="text-muted-foreground">
                                            Contamos con opciones veganas y sin gluten
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
