"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

import CardPaymentModal from "./CardPaymentModal"
import YapePaymentModal from "./YapePaymentModal"
import PlinPaymentModal from "./PlinPaymentModal"

import { useCartSidebar } from "@/hooks/useCartSidebar"
import { CartPromoSection, CartRegularItems } from "./CartItems"
import { CartSummary, CartOrderTypeSelector, CartCustomerForm, CartPaymentMethodSelector } from "./CartForms"

export default function CartSidebar() {
    const {
        // State
        isOpen, setIsOpen,
        orderType, setOrderType,
        paymentMethod, setPaymentMethod,
        showPaymentModal, setShowPaymentModal,

        // Form Data
        deliveryAddress, setDeliveryAddress,
        customerName, setCustomerName,
        customerLastName, setCustomerLastName,
        customerDNI, setCustomerDNI,
        customerEmail, setCustomerEmail,
        customerPhone, setCustomerPhone,

        // Card Data
        cardNumber, setCardNumber,
        cardName, setCardName,
        cardExpiry, setCardExpiry,
        cardCvv, setCardCvv,

        // Data & Actions
        promoItems, regularItems, displayItems, totals,
        itemsCount, removeItem, updateQuantity,
        selectedPromotion, removePromotion,

        // Handlers
        handleProceedToPayment,
        handleConfirmPayment
    } = useCartSidebar()

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        {itemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {itemsCount}
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="sm:w-[400px] p-0 max-w-full sm:max-w-[400px] bg-gray-800 border-l border-gray-800 shadow-xl">
                    <div className="h-full overflow-y-auto flex flex-col px-6 py-6 custom-scrollbar">
                        <SheetHeader className="pb-4 -mx-6 px-6">
                            <SheetTitle className="text-white flex items-center gap-2">Tu Pedido <ShoppingBag className="h-5 w-5" /></SheetTitle>
                        </SheetHeader>

                        {displayItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-muted-foreground">
                                <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
                                <p>Tu carrito está vacío</p>
                            </div>
                        ) : (
                            <div className="space-y-4 pb-4">
                                {/* Sección de Promoción */}
                                {selectedPromotion && promoItems.length > 0 && (
                                    <CartPromoSection
                                        selectedPromotion={selectedPromotion}
                                        promoItems={promoItems}
                                        removePromotion={removePromotion}
                                        promoOriginalTotal={totals.promoOriginalTotal}
                                        promoDiscount={totals.promoDiscount}
                                        promoNetTotal={totals.promoNetTotal}
                                    />
                                )}

                                {/* Sección de Productos Adicionales */}
                                {regularItems.length > 0 && (
                                    <CartRegularItems
                                        items={regularItems}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                        hasPromo={!!(selectedPromotion && promoItems.length > 0)}
                                    />
                                )}

                                {/* Resumen del pedido */}
                                <CartSummary
                                    subtotal={totals.subtotal}
                                    shipping={totals.shipping}
                                    taxes={totals.taxes}
                                    finalTotal={totals.finalTotal}
                                />

                                {/* Tipo de Entrega/Pago Principal */}
                                <CartOrderTypeSelector
                                    orderType={orderType}
                                    setOrderType={setOrderType}
                                    setPaymentMethod={setPaymentMethod}
                                />

                                {/* Datos del Cliente */}
                                {(orderType === "delivery" || orderType === "online") && (
                                    <CartCustomerForm
                                        name={customerName} setName={setCustomerName}
                                        lastName={customerLastName} setLastName={setCustomerLastName}
                                        dni={customerDNI} setDNI={setCustomerDNI}
                                        email={customerEmail} setEmail={setCustomerEmail}
                                        phone={customerPhone} setPhone={setCustomerPhone}
                                        address={deliveryAddress} setAddress={setDeliveryAddress}
                                        showAddress={orderType === "delivery"}
                                    />
                                )}

                                {/* Métodos de Pago Secundarios */}
                                {(orderType === "delivery" || orderType === "online") && (
                                    <CartPaymentMethodSelector
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                    />
                                )}

                                <Button className="w-full font-bold dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700" size="lg" onClick={handleProceedToPayment}>
                                    Proceder al Pago
                                </Button>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Modal de Pago */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="sm:max-w-[425px] max-w-[90%] max-h-[85vh] overflow-y-auto rounded-2xl bg-background dark:bg-slate-900 border-border dark:border-slate-800">
                    <DialogDescription className="sr-only">
                        Completa la información de pago para finalizar tu pedido
                    </DialogDescription>
                    {paymentMethod === "card" && (
                        <CardPaymentModal
                            cardNumber={cardNumber}
                            setCardNumber={setCardNumber}
                            cardName={cardName}
                            setCardName={setCardName}
                            cardExpiry={cardExpiry}
                            setCardExpiry={setCardExpiry}
                            cardCvv={cardCvv}
                            setCardCvv={setCardCvv}
                            finalTotal={totals.finalTotal}
                            onConfirm={handleConfirmPayment}
                        />
                    )}

                    {paymentMethod === "yape" && (
                        <YapePaymentModal
                            finalTotal={totals.finalTotal}
                            onCancel={() => setShowPaymentModal(false)}
                            onConfirm={handleConfirmPayment}
                        />
                    )}
                    {paymentMethod === "plin" && (
                        <PlinPaymentModal
                            finalTotal={totals.finalTotal}
                            onCancel={() => setShowPaymentModal(false)}
                            onConfirm={handleConfirmPayment}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
