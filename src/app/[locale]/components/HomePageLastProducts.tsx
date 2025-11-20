"use client";
import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState, useRef } from "react";
import ProductCard from '@/app/[locale]/components/ProductCard';
import { productsList } from '@/utils/actions/products/actions';
import { FiShoppingBag, FiTrendingUp, FiStar } from 'react-icons/fi';
import { Link } from "lucide-react";

export const HomePageLastProducts = () => {
    const t = useTranslations("HomePage");  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentLocale = useLocale();
    
    const loadProducts = async (page = 1) => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await productsList(page, { order_by: "DESC", paginate: 8 });
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        loadProducts(1);
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
                            <FiTrendingUp className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                                {t('new_arrivals')}
                            </span>
                        </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t('last_products')}
                    </h2>
                    
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('latest_products_description')}
                    </p>
                    
                    {/* Decorative line */}
                    <div className="flex items-center justify-center mt-6">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <FiShoppingBag className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
                        </div>
                        <p className="mt-4 text-gray-600 font-medium">{t('loading_products')}</p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading || products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map((productInfo, index) => (
                            <div
                                key={productInfo.id || index}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <ProductCard 
                                    product={{
                                        id: productInfo.id,
                                        name: productInfo?.name,
                                        price: productInfo.price,
                                        sale_price: productInfo.sale_price,
                                        rating: productInfo.rating || 4.5,
                                        image: productInfo.main_image,
                                        sizes: productInfo.sizes,
                                        colors: productInfo.colors,
                                        quantity: productInfo.quantity,
                                        discount_rate: productInfo.discount_rate,
                                    }} 
                                />
                            </div>
                        ))}
                    </div>
                ) : null}

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingBag className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('no_products_found')}</h3>
                        <p className="text-gray-600 mb-6">    
                            {t('no_products_found_description')}
                        </p>
                        <button 
                            onClick={() => loadProducts(1)}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {t('refresh_products')}
                        </button>
                    </div>
                )}

                {/* View All Button */}
                {products.length > 0 && (
                    <div className="text-center mt-12">
                        <a href={`${currentLocale}/shop`}
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg group"
                        >
                            <span>{t('view_all_products')}</span>
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                )}

                {/* Stats Section */}
                {/* {products.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiShoppingBag className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">{products.length}+</h4>
                                <p className="text-gray-600">New Products</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiStar className="w-8 h-8 text-green-600" />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">4.8</h4>
                                <p className="text-gray-600">Average Rating</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiTrendingUp className="w-8 h-8 text-purple-600" />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">98%</h4>
                                <p className="text-gray-600">Customer Satisfaction</p>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* Loading More Indicator */}
                {loading && products.length > 0 && (
                    <div className="text-center mt-12">
                        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-lg shadow-sm">
                            <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <span className="text-gray-600 font-medium">{t('loading_products')}</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}