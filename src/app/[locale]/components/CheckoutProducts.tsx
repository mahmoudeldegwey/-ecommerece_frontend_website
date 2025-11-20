"use client";

import React, { useState, useEffect } from 'react';
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import { TbMoodEmpty } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import CheckoutProductItem from "./CheckoutProductItem";
import applyCoupon from "@/utils/actions/coupons/actions";
import parsePrice from '@/utils/helpers';

type Props = {
  shippingCost: number;
  onDiscountedPriceChange: (price: number | null) => void;
  onDiscountAmountChange: (amount: number | null) => void;
  onFinalTotalChange: (total: number) => void;
  onCouponAppliedChange: (applied: boolean) => void;
  onErrorChange: (error: string | null) => void;
  onCouponCodeChange: (code: string) => void;
};

export default function CheckoutProducts({
  shippingCost,
  onDiscountedPriceChange,
  onDiscountAmountChange,
  onFinalTotalChange,
  onCouponAppliedChange,
  onErrorChange,
  onCouponCodeChange
}: Props) {
  const { items } = useCartStore();
  const t = useTranslations("CheckoutProducts");

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subTotalCost, setSubTotalCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleTotalPrice = () => {
    const total = items.reduce((acc, item) => {
      const price = item.sale_price ?? item.price;
      const numericPrice = parsePrice(price);
      return acc + numericPrice * item.quantity;
    }, 0);
    setSubTotalCost(total);
    setTotalPrice(total);
  };

  const handleApplyCoupon = async (coupon_code: string, total_price: number) => {
    try {
      const response = await applyCoupon(coupon_code, total_price);

      if (response.check && response.data) {
        setDiscountedPrice(response.data.price);
        setDiscountAmount(response.data.discount);
        setCouponApplied(true);
        setError(null);
        setCouponCodeInput("");
        setCouponCode(coupon_code);
        onCouponAppliedChange(true);
        onDiscountedPriceChange(response.data.price);
        onDiscountAmountChange(response.data.discount);
        onCouponCodeChange(coupon_code);
      } else {
        setDiscountedPrice(null);
        setDiscountAmount(null);
        setCouponApplied(false);
        setError(response.message || "Coupon is not valid");
        setCouponCodeInput("");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Something went wrong");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountedPrice(null);
    setDiscountAmount(null);
    setCouponCode("");
    setCouponApplied(false);
    setError(null);
  };

  const finalTotal = Number(discountedPrice ?? totalPrice) + Number(shippingCost);

  useEffect(() => {
    onFinalTotalChange(finalTotal?.toFixed(2));
  }, [subTotalCost, totalPrice, finalTotal, onFinalTotalChange]);

  useEffect(() => {
    handleTotalPrice();
  }, [items]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{t("products")}</h2>
      </div>

      <div className="p-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <TbMoodEmpty size={80} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t("empty")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Products List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {items.map((item, index) => (
                <CheckoutProductItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Coupon Section */}
            <div className="border-t pt-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">{t("enter_coupon")}</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder={t("enter_coupon")}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    disabled={couponApplied}
                  />

                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      couponCodeInput && !couponApplied
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                        : "bg-gray-200 text-gray-600 cursor-not-allowed"
                    }`}
                    onClick={() => handleApplyCoupon(couponCodeInput, totalPrice)}
                    disabled={!couponCodeInput || couponApplied}
                  >
                    {t("apply_coupon")}
                  </button>
                </div>

                {couponApplied && (
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {t("coupon_applied")}: {couponCode.toUpperCase()}
                    </span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="ml-auto text-red-600 hover:text-red-700 transition-colors"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{t("subtotal")}</span>
                <span className="font-semibold text-gray-900">${subTotalCost.toFixed(2)}</span>
              </div>

              {couponApplied && discountAmount !== null && (
                <div className="flex justify-between items-center p-3 bg-green-100/50 rounded-lg border border-green-200">
                  <span className="flex items-center gap-2 text-green-700 font-medium">
                    <span className="inline-block bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {couponCode.toUpperCase()}
                    </span>
                    {t("discount")}
                  </span>
                  <span className="text-green-700 font-semibold">–${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-700">{t("shipping")}</span>
                <span className="font-semibold text-gray-900">${shippingCost.toFixed(2)}</span>
              </div>

              <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">{t("total")}</span>
                <span className="text-3xl font-bold text-blue-600">${finalTotal?.toFixed(2)}</span>
              </div>

              {couponApplied && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-semibold">
                    🎉 {t("total_savings")}: <span className="text-green-600">${discountAmount?.toFixed(2)}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}