'use client'

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import { TbMoodEmpty } from "react-icons/tb";
import CartItem from "./CartItem";
import parsePrice from "@/utils/helpers";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function CartDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, updateQuantity, clearCart } = useCartStore();
  const t = useTranslations("Cart");
  const currentLocale = useLocale();

  const handleQuantityChange = (item: any, newQty: number | string) => {
    const quantity = parseInt(newQty as string);
    if (quantity >= 1) {
      updateQuantity(item.id, quantity, item.color?.id, item.size?.id);
    }
  };

  const total = items
    .reduce((acc, item) => {
      const price = item.sale_price ?? item.price;
      const numericPrice = parsePrice(price);
      return acc + numericPrice * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="flex flex-col justify-between h-screen max-w-md ml-auto rounded-l-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <DrawerHeader className="border-b px-6 py-4 bg-gray-50">
          <DrawerTitle className="text-lg font-semibold text-gray-800">
            🛒 {t("title")}
          </DrawerTitle>
        </DrawerHeader>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <TbMoodEmpty size={120} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">{t("empty")}</p>
            </div>
          ) : (
            <>
              {items.map((item, index) => (
                <CartItem key={index} item={item} index={index} />
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t bg-white px-6 py-4 space-y-4">
            {/* Cart Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>{t("cart_total")}</span>
              <span className="text-blue-600">{total}</span>
            </div>

            {/* Checkout Button */}
            <Link 
            href={`/${currentLocale}/checkout`} 
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition">
              {t("checkout")}
            </Link>

            {/* Close Button */}
            <DrawerClose asChild>
              <button className="w-full bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900 transition">
                {t("close")}
              </button>
            </DrawerClose>
          </div>
        )}

        {/* Footer when empty */}
        {items.length === 0 && (
          <DrawerClose asChild>
            <button className="m-4 bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900 transition">
              {t("close")}
            </button>
          </DrawerClose>
        )}
      </DrawerContent>
    </Drawer>
  );
}
