'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCartStore } from "@/stores/useCartStore"
import { 
  FaEye, 
  FaRegHeart, 
  FaHeart, 
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from 'react-icons/fa';
import { 
  FiShoppingBag, 
  FiHeart, 
  FiEye, 
  FiStar,
  FiCheck,
  FiX
} from 'react-icons/fi';
import QuickView from './QuickView';
import { useLocale } from "next-intl";
import parsePrice from '@/utils/helpers';

export default function ProductCard({ product }: { product: any }) {
    const { addToCart } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const t = useTranslations('ProductCard');
    const currentLocale = useLocale();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            sale_price: product.sale_price, 
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
            discount_rate: product.discount_rate
        });
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        setIsQuickViewOpen(true);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }
        
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
        }
        
        return stars;
    };

    return (
        <div 
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                {/* Discount Badge */}
                {product.discount_rate && (
                    <div className="absolute top-3 left-3 z-20">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg">
                            -{product.discount_rate}%
                        </span>
                    </div>
                )}

                {/* Stock Status Badge */}
                <div className="absolute top-3 right-3 z-20">
                    {product.quantity > 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <FiCheck className="w-3 h-3 mr-1" />
                            In Stock
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <FiX className="w-3 h-3 mr-1" />
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                {/* <button
                    onClick={handleWishlist}
                    className={`absolute top-12 right-3 z-20 p-2 rounded-full transition-all duration-300 ${
                        isWishlisted 
                            ? 'bg-red-500 text-white shadow-lg' 
                            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                    } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                    {isWishlisted ? <FaHeart className="w-4 h-4" /> : <FiHeart className="w-4 h-4" />}
                </button> */}

                {/* Product Image */}
                <div className="aspect-square bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                    <button
                        onClick={handleQuickView}
                        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full text-gray-800 hover:bg-gray-50 transition-colors shadow-lg"
                    >
                        <FiEye className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('quick_view')}</span>
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                {/* Product Name */}
                <div>
                    <Link href={`${currentLocale}/product-details/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                            {renderStars(product.rating).map((star, index) => (
                                <span key={index} className="text-sm">{star}</span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.rating})</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-2">
                    {product.sale_price ? (
                        <>
                            <span className="text-xl font-bold text-red-500">
                                ${product.sale_price}
                            </span>
                            <span className="text-base text-gray-400 line-through">
                                ${product.price}
                            </span>
                            {/* <span className="text-sm text-green-600 font-medium">
                                Save         {(
                  Number(parsePrice(product?.price)) -
                  Number(parsePrice(product?.sale_price))
                ).toFixed(2)}
                            </span> */}
                        </>
                    ) : (
                        <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                        </span>
                    )}
                </div>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
                        <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 4).map((size, index) => (
                                <button
                                    key={size.id}
                                    onClick={() => handleSizeSelect(size)}
                                    className={`px-2 py-1 text-xs font-medium rounded border transition-colors ${
                                        selectedSize?.id === size.id || (!selectedSize && index === 0)
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                                    }`}
                                >
                                    {size.name}
                                </button>
                            ))}
                            {product.sizes.length > 4 && (
                                <span className="px-2 py-1 text-xs text-gray-500">
                                    +{product.sizes.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Color:</p>
                        <div className="flex space-x-1">
                            {product.colors.slice(0, 5).map((color, index) => (
                                <button
                                    key={color.id}
                                    onClick={() => handleColorSelect(color)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                                        selectedColor?.id === color.id || (!selectedColor && index === 0)
                                            ? 'border-gray-800 ring-2 ring-blue-500 ring-offset-1'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                            {product.colors.length > 5 && (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs text-gray-600">+{product.colors.length - 5}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                    {product.quantity > 0 ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <FiShoppingBag className="w-4 h-4" />
                                <span className="text-sm">{t('add_to_cart')}</span>
                            </button>
                            {/* <Link
                                href={`/product-details/${product.id}?buy_now=true`}
                                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-center"
                            >
                                <span className="text-sm">{t('buy_now')}</span>
                            </Link> */}
                        </div>
                    ) : (
                        <button
                            disabled
                            className="w-full px-4 py-2.5 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
                        >
                            <span className="text-sm">{t('out_of_stock')}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickView 
                isOpen={isQuickViewOpen} 
                onClose={() => setIsQuickViewOpen(false)} 
                id={product.id}
            />
        </div>
    );
}