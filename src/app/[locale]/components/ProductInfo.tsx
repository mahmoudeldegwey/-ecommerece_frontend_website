"use client";
import { useState, useEffect } from "react";
import { singleProduct } from "@/utils/actions/products/actions";
import { FaRegHeart, FaCartArrowDown } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/useCartStore";

export default function ProductInfo({ id }: { id: number }) {
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const t = useTranslations("ProductDetails");

  useEffect(() => {
    async function fetchProduct() {
      const res = await singleProduct(id);
      setProduct(res);
      if (res.sizes?.length) setSelectedSize(res.sizes[0]);
      if (res.colors?.length) setSelectedColor(res.colors[0]);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-6 text-gray-500">Loading...</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      sale_price: product.sale_price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="w-full space-y-5">
      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <IoStarSharp key={i} className="text-yellow-400 text-xl" />
        ))}
        <p className="text-gray-600 text-sm">(13 {t("reviews")})</p>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="font-semibold text-gray-600">{t("availability")}:</span>
        <span
          className={`font-medium ${
            product.quantity > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.quantity > 0 ? t("in_stock") : t("out_of_stock")}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Price */}
      <div className="flex items-center gap-3 mt-2">
        <span className="font-semibold text-gray-600">{t("price")}:</span>
        {product.sale_price ? (
          <>
            <span className="text-2xl font-bold text-red-500">
              E£{product.sale_price}
            </span>
            <span className="text-gray-400 line-through text-lg">
              E£{product.price}
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold text-red-500">E£{product.price}</span>
        )}
      </div>

      {/* Wishlist & Compare */}
      <div className="flex items-center gap-3 mt-2">
        <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
          <FaRegHeart className="text-xl text-gray-700" />
        </button>
        <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
          <IoIosGitCompare className="text-xl text-gray-700" />
        </button>
      </div>

      {/* SKU & Quantity Info */}
      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-semibold">{t("sku")}:</span> {product.sku}
        </p>
        <p>
          <span className="font-semibold">{t("quantity")}:</span> {product.quantity}
        </p>
      </div>

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div className="mt-3">
          <span className="font-semibold text-gray-600">{t("sizes")}:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {product.sizes.map((size: any) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded-md text-sm font-medium transition ${
                  selectedSize?.id === size.id
                    ? "border-black text-black bg-gray-100"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {product.colors?.length > 0 && (
        <div className="mt-3">
          <span className="font-semibold text-gray-600">{t("colors")}:</span>
          <div className="flex gap-2 mt-2">
            {product.colors.map((color: any) => (
              <button
                key={color.id}
                title={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition ${
                  selectedColor?.id === color.id ? "ring-2 ring-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Input */}
      <div className="mt-3 w-28">
        <Input
          type="number"
          min={1}
          max={product.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border-gray-300"
        />
      </div>

      {/* Buttons */}
      {product.quantity > 0 ? (
        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FaCartArrowDown className="text-xl" />
            {t("add_to_cart")}
          </button>

          <Link
            href="#"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            {t("buy_now")}
          </Link>
        </div>
      ) : (
        <span className="bg-gray-300 text-gray-600 px-6 py-3 rounded-lg inline-block mt-4">
          {t("out_of_stock")}
        </span>
      )}
    </div>
  );
}
