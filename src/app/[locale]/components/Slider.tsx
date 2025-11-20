// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
// Import react-icons

// Sample slider data - replace with your actual data
const sliderData = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Up to 50% Off",
    description: "Discover the latest trends in fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    textColor: "text-black",
    backgroundColor: "bg-white"
  },
  {
    id: 2,
    title: "Tech Sale Event",
    subtitle: "Best Deals on Electronics",
    description: "Latest gadgets at unbeatable prices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=500&fit=crop",
    buttonText: "Explore",
    buttonLink: "/shop?category_id=1&category_name=Electronics",
    textColor: "text-white",
    backgroundColor: "bg-gray-900"
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Fresh & Trendy",
    description: "Check out our newest products",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=500&fit=crop",
    buttonText: "View All",
    buttonLink: "/shop",
    textColor: "text-black",
    backgroundColor: "bg-gray-100"
  }
];

export default function Slider() {
  return (
    <div>

      {/* HERO SLIDER */}
      <div className="hero-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="h-[400px] md:h-[500px]"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`relative h-full ${slide.backgroundColor}`}>
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                      <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${slide.textColor}`}>
                        {slide.title}
                      </h1>
                      <h2 className={`text-2xl md:text-3xl font-light mb-4 ${slide.textColor}`}>
                        {slide.subtitle}
                      </h2>
                      <p className={`text-lg mb-8 ${slide.textColor} opacity-90`}>
                        {slide.description}
                      </p>
                      <Link
                        href={slide.buttonLink}
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev !text-white !left-4 !w-12 !h-12 !mt-[-24px] after:!text-lg after:!font-bold bg-black/20 !rounded-full hover:bg-black/40 transition-colors"></div>
          <div className="swiper-button-next !text-white !right-4 !w-12 !h-12 !mt-[-24px] after:!text-lg after:!font-bold bg-black/20 !rounded-full hover:bg-black/40 transition-colors"></div>
        </Swiper>
        
      </div>

     {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        
        .swiper-pagination-bullet-active {
          background: white !important;
        }
        
        .swiper-pagination {
          bottom: 20px !important;
        }
        
        .hero-slider .swiper-slide {
          transition: all 0.6s ease-in-out;
        }
      `}</style>

    </div>
  );
}