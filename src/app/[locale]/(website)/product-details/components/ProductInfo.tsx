"use client";

import React, { useState, useEffect } from 'react';
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from 'next-intl';
import { singleProduct } from "@/utils/actions/products/actions";
import parsePrice from '@/utils/helpers';
import { 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiMinus, 
  FiPlus,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiCheck,
  FiX,
  FiInfo,
  FiShare2, 
  FiFacebook,
  FiAlertCircle
} from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import SocialShare from '@/utils/SocialShare';
import { useLocale } from "next-intl";

async function fetchProduct(id: number) {
  return await singleProduct(id);
}

export default function ProductInfo({ id }: { id: number }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareUrls, setShareUrls] = useState({});

  const { addToCart } = useCartStore();
  const t = useTranslations('ProductInfo');

  const currentLocale = useLocale();

  // Fetch product on component mount
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProduct(id);

        if (!productData) {
          setError('Product not found');
          setProduct(null);
          return;
        }

        setProduct(productData);

        // Set default selections
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Prepare social share URLs
  useEffect(() => {
    if (!product) return;

    try {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      const socialShare = new SocialShare(
        currentUrl,
        product?.name || 'Check out this product',
        product?.main_image,
        product?.description
      );

      setShareUrls({
        facebook: socialShare.getShareUrl('facebook'),
        twitter: socialShare.getShareUrl('twitter'),
        whatsapp: socialShare.getShareUrl('whatsapp'),
        linkedin: socialShare.getShareUrl('linkedin'),
        telegram: socialShare.getShareUrl('telegram'),
      });
    } catch (err) {
      console.error('Error generating share URLs:', err);
    }
  }, [product]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="w-5 h-5 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      image: product.main_image,
      price: product.price,
      sale_price: product.sale_price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      discount_rate: product.discount_rate
    });
  };

  const handleBuyNow = () => {

    handleAddToCart();

    window.location.href = `/${currentLocale}/checkout`;
    // Implement navigation to checkout page
  }

  const increaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Loading State
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Product</h3>
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiX className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Success State - Product Loaded
  return (
    <div className="space-y-8">
      {/* Product Title and Rating */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            SKU: {product.sku || `PRD-${product.id}`}
          </p>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          {product.sale_price ? (
            <>
              <span className="text-4xl font-bold text-red-500">
                {parsePrice(product.sale_price)}
              </span>
              <span className="text-2xl text-gray-400 line-through">
                {parsePrice(product.price)}
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                <span>{t('save')} </span>
                {(
                  Number(parsePrice(product?.price)) -
                  Number(parsePrice(product?.sale_price))
                ).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-4xl font-bold text-gray-900">
              {parsePrice(product.price)}
            </span>
          )}
        </div>

        {product.discount_rate && (
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-red-500 text-white rounded text-sm font-bold">
              -{product.discount_rate}% {t('off')}
            </span>
            <span className="text-sm text-gray-600">{t('limited_time_offer')}</span>
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-3">
        {product.quantity > 0 ? (
          <>
            <div className="flex items-center space-x-2 text-green-600">
              <FiCheck className="w-5 h-5" />
              <span className="font-semibold">{t('in_stock')}</span>
            </div>
            <span className="text-gray-500">
              ({product.quantity} {t('items_available')})
            </span>
          </>
        ) : (
          <div className="flex items-center space-x-2 text-red-600">
            <FiX className="w-5 h-5" />
            <span className="font-semibold">{t('out_of_stock')}</span>
          </div>
        )}
      </div>

      {/* Product Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{t('description')}</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description || 'No description available'}
        </p>
      </div>

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{t('size')}</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                  selectedSize?.id === size.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('color')}: <span className="font-normal text-gray-600">{selectedColor?.name}</span>
          </h3>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor?.id === color.id
                    ? 'border-gray-800 ring-2 ring-blue-500 ring-offset-2'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{t('quantity')}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="px-4 py-3 font-semibold text-lg min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              disabled={!product.quantity || quantity >= product.quantity}
              className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-gray-500">
            Max: {product.quantity} {t('items')}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          {product.quantity > 0 ? (
            <>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>{t('add_to_cart')}</span>
              </button>
              <button 
                onClick={handleBuyNow} className="flex-1 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                {t('buy_now')}
              </button>
            </>
          ) : (
            <button
              disabled
              className="flex-1 px-8 py-4 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
            >
              {t('out_of_stock')}
            </button>
          )}

          {/* <button
            onClick={handleWishlist}
            className={`p-4 border-2 rounded-xl transition-all ${
              isWishlisted
                ? 'border-red-500 bg-red-50 text-red-500'
                : 'border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button> */}
        </div>
      </div>

      {/* Social Actions */}
      <div className="flex items-center space-x-4 pt-4 border-t w-full">
        <div className="flex space-x-3 items-center text-center w-full justify-center">
          <FiShare2 className="w-5 h-5" />
          <span className="text-sm text-gray-500">{t('share')}:</span>

          {shareUrls.facebook && (
            <Link
              href={shareUrls.facebook}
              rel="noopener noreferrer"
              target="_blank"
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              title="Share on Facebook"
            >
              <FiFacebook className="w-5 h-5" />
            </Link>
          )}

          {shareUrls.whatsapp && (
            <Link
              href={shareUrls.whatsapp}
              rel="noopener noreferrer"
              target="_blank"
              className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
              title="Share on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </Link>
          )}

          {shareUrls.twitter && (
            <Link
              href={shareUrls.twitter}
              rel="noopener noreferrer"
              target="_blank"
              className="p-2 bg-sky-100 text-sky-600 rounded-full hover:bg-sky-200 transition-colors"
              title="Share on Twitter"
            >
              <FiX className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}