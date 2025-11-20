"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { categoriesList } from "@/utils/actions/categories/actions";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const HomePageCategories = () => {
  const currentLocale = useLocale();
  const t = useTranslations("HomePage");

  const [categories, setCategories] = useState<
    Array<{ id: number; name: string; image: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoriesList({
        paginate: 20,
        is_home: 1,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="my-16">
      {/* Section title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        {t("categories")}
      </h1>

      {/* Swiper Slider */}
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
        className="px-4"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="group relative cursor-pointer">
              {/* Category card */}
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative">
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <Link
                    href={`/${currentLocale}/shop?category_id=${category.id}&category_name=${category.name}`}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow font-semibold hover:bg-gray-100"
                  >
                    {t("shop_now")}
                  </Link>
                </div>
              </div>

              {/* Category name */}
              <h2 className="text-center text-lg md:text-xl font-semibold mt-4 transition-colors duration-300 group-hover:text-blue-600">
                <Link
                  href={`/${currentLocale}/shop?category_id=${category.id}&category_name=${category.name}`}
                >
                  {category.name}
                </Link>
              </h2>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* Loading state */}
      {loading && (
        <div className="text-center text-gray-500 py-4">
          Loading more Categories...
        </div>
      )}
    </section>
  );
};

export default HomePageCategories;
