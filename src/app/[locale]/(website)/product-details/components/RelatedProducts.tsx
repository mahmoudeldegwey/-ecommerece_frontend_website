"use client";

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { productsList } from '@/utils/actions/products/actions';
import ProductCard from '@/app/[locale]/components/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function RelatedProducts({ productId, categoryId }: { productId: number; categoryId?: number }) {
  console.log("RelatedProducts rendered with productId:", productId, "and categoryId:", categoryId);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const t = useTranslations("RelatedProducts")
  const currentLocale = useLocale();

  const fetchRelatedProducts = async () => {
    setLoading(true);
    try {
      productsList(1, { category_id: categoryId, paginate: 10 }).then(res => {
        setProducts(res.data || []);
      }).catch(err => {
        console.error("Error fetching related products:", err);
      }).finally(() => {
        setLoading(false);
      });

    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId, categoryId]);

  return (
    <div className="relative">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t('you_may_also_like')}</h2>
        <Link href={`/${currentLocale}/shop?category_id=${categoryId}`} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          {t("view_all")}
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
      
      {products.length === 0 && <p className="text-gray-600 text-center">{t("no_products_found")}</p>}

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="px-4">

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">            
            {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard  key={product.id} product={product} />
            </SwiperSlide>
            ))}
          </div>
      </Swiper>
        </>
      )}
    </div>
  );
}