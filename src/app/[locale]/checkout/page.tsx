"use client"

import { useState } from "react";
import CheckoutUserInfo from '@/app/[locale]/components/CheckoutUserInfo';
import CheckoutProducts from '@/app/[locale]/components/CheckoutProducts';
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/useCartStore";
import { createOrder } from "@/utils/actions/orders/actions";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useLocale } from "next-intl";
import Image from "next/image";
import { useSettings } from "@/contexts/SettingsContext";

export default function Checkout() {
  const t = useTranslations('CheckoutUserInfo');
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const locale = useLocale();
  const settings = useSettings();

  const [shippingCost, setShippingCost] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [useDifferentBillingAddress, setUseDifferentBillingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    username: "",
    phone: "",
    address: "",
    cityId: 0,
    countryId: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    if (!username || !email || !phone || !address || !cityId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createOrder({
        total_price: parseFloat(totalPrice).toFixed(1),
        final_cost: parseFloat(finalTotal).toFixed(1),
        shipping_cost: shippingCost,
        products: items.map(item => ({
          product_id: item.id,
          product_quantity: item.quantity,
          properties: {
            size: item.size ? item.size.name : null,
            color: item.color ? item.color.name : null,
          }
        })),
        customer_name: username,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        country_id: countryId,
        city_id: cityId,
        payment_method: paymentMethod,
        use_different_billing_address: useDifferentBillingAddress,
        billing_address: useDifferentBillingAddress ? {
          username: billingAddress.username,
          phone: billingAddress.phone,
          address: billingAddress.address,
          city_id: billingAddress.cityId,
          country_id: billingAddress.countryId,
        } : [],
        coupon_applied: couponApplied,
        coupon_code: couponCode,
        discounted_price: discountedPrice,
      });

      if (response.data.order_number) {
        toast.success(`Order placed successfully: ${response.data.order_number}`);
        clearCart();
        router.push(
          `/${locale}/order-success?orderId=${encodeURIComponent(response.data.order_number)}&total=${encodeURIComponent(response.data.final_cost)}&message=${encodeURIComponent(t('thank_you'))}`
        );
      } else {
        toast.error("Error placing order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header with Logo */}
      <div className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-6 flex items-center justify-center">
          <Image
            src={settings.website_logo}
            alt={settings.website_name}
            width={180}
            height={60}
            className="h-16 w-auto"
          />
        </div>
      </div>

      {/* Checkout Content */}
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{t('checkout')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info */}
          <div className="lg:col-span-2">
            <CheckoutUserInfo
              onShippingCostChange={setShippingCost}
              onErrorChange={setError}
              onUsernameChange={setUsername}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onAddressChange={setAddress}
              onCityIdChange={setCityId}
              onCountryIdChange={setCountryId}
              onPaymentMethodChange={setPaymentMethod}
              onUseDifferentBillingAddressChange={setUseDifferentBillingAddress}
              onBillingAddressChange={setBillingAddress}
            />
          </div>

          {/* Products & Total */}
          <div className="lg:col-span-1">
            <CheckoutProducts
              shippingCost={shippingCost}
              onFinalTotalChange={setFinalTotal}
              onDiscountedPriceChange={setDiscountedPrice}
              onDiscountAmountChange={setDiscountAmount}
              onCouponAppliedChange={setCouponApplied}
              onErrorChange={setError}
              onCouponCodeChange={setCouponCode}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || items.length === 0}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : t('place_order')}
          </button>
        </div>
      </div>
    </div>
  );
}