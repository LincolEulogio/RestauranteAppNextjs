import { CartItem, Promotion } from "@/store/useCartStore";

export interface CartTotals {
  promoOriginalTotal: number;
  regularTotal: number;
  promoDiscount: number;
  promoNetTotal: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  finalTotal: number;
}

export interface ProcessedCartItems {
  promoItems: CartItem[];
  regularItems: CartItem[];
  displayItems: CartItem[];
}

export const processCartItems = (
  items: CartItem[],
  selectedPromotion: Promotion | null
): ProcessedCartItems => {
  // Derived Promo Items
  const promoItems =
    selectedPromotion?.products?.map((prod) => ({
      id: `promo-${prod.id}`,
      name: prod.name,
      price: prod.price,
      quantity: 1,
      image: prod.image,
    })) || [];

  // Regular Items (filter out potential residual promo items)
  const regularItems = items.filter(
    (item) => !item.id.toString().startsWith("promo-")
  );

  const displayItems = [...promoItems, ...regularItems];

  return { promoItems, regularItems, displayItems };
};

export const calculateCartTotals = (
  promoItems: CartItem[],
  regularItems: CartItem[],
  selectedPromotion: Promotion | null,
  deliveryFee: number = 0
): CartTotals => {
  const promoOriginalTotal = promoItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const regularTotal = regularItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let promoDiscount = 0;
  if (
    selectedPromotion &&
    selectedPromotion.discount &&
    selectedPromotion.discount.includes("%")
  ) {
    const percentage = parseFloat(selectedPromotion.discount.replace("%", ""));
    if (!isNaN(percentage)) {
      promoDiscount = promoOriginalTotal * (percentage / 100);
    }
  }

  const promoNetTotal = promoOriginalTotal - promoDiscount;
  const subtotal = promoNetTotal + regularTotal;
  const shipping = deliveryFee;
  const taxes = 0; // Tax is included in price or calculated differently in backend
  const finalTotal = subtotal + shipping + taxes;

  return {
    promoOriginalTotal,
    regularTotal,
    promoDiscount,
    promoNetTotal,
    subtotal,
    shipping,
    taxes,
    finalTotal,
  };
};
