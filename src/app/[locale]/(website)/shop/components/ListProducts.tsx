"use client";

import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState, useRef } from "react";
import ProductCard from '@/app/[locale]/components/ProductCard';
import { productsList } from '@/utils/actions/products/actions';
import { useSearchParams } from 'next/navigation';

export default function ListProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

    const searchParams = useSearchParams();    
    
    // Get all filter parameters from URL
    const category_id = searchParams.get('category_id');
    const stock = searchParams.get('stock');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const sortBy = searchParams.get('sort_by');

    const loadProducts = async (page = 1, resetProducts = false) => {
        if (loading || (!resetProducts && page > lastPage)) return;

        setLoading(true);
        try {
            // Build params object with all filters
            const params = {};
            
            if (category_id && category_id.trim() !== '') {
                params.category_id = category_id;
            }
            if (stock) params.stock = stock;
            if (minPrice) params.min_price = minPrice;
            if (maxPrice) params.max_price = maxPrice;
            if (sortBy) params.sort_by = sortBy;

            const res = await productsList(page, params);
            
            // Reset products if it's a new filter search, otherwise append
            if (resetProducts || page === 1) {
                setProducts(res.data);
            } else {
                setProducts((prev) => [...prev, ...res.data]);
            }
            
            setPage(res.meta.current_page + 1);
            setLastPage(res.meta.last_page);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch and refetch when filters change
    useEffect(() => {
        // Reset everything and load first page when filters change
        setProducts([]);
        setPage(1);
        setLastPage(1);
        loadProducts(1, true);
    }, [category_id, stock, minPrice, maxPrice, sortBy]); // Dependencies: all filter parameters

    // Infinite scroll observer
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && currentPage <= lastPage) {
                loadProducts(currentPage);
            }
        });

        if (lastProductRef.current) {
            observer.current.observe(lastProductRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [products, currentPage, lastPage]);

    return (
        <div className="row">
            {/* Loading state for initial load */}
            {loading && products.length === 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-12 text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading products...</span>
                    </div>
                </div>
            )}

            {/* No products found */}
            {!loading && products.length === 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-12 text-center py-4">
                    <p className="text-muted">No products found matching your filters.</p>
                </div>
            )}

                {/* Products Grid */}
                {!loading || products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
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

            {/* Loading more indicator */}
            {loading && products.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-12 text-center py-4">
                    Loading more products...
                </div>
            )}
        </div>
    );
}