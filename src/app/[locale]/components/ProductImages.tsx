'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useTranslations } from 'next-intl';
import {useState,useEffect} from 'react'
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductImages({product}: {product: any}) {

  const t = useTranslations('ProductDetails');
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] =useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000 })]}
      className="w-full max-w-xl mx-auto"
      onApi={setApi}
    >
      <CarouselContent className="ml-2 flex">
        {product.images.length > 0 && product.images.map((item) => (
          <CarouselItem key={item.id} className="pl-2 basis-full">
            <div className="flex items-center justify-center h-96 rounded-md bg-gray-200 text-2xl">
              <Zoom>
                {/* ✅ Image with Zoom Effect */}
                <img
                  width={370}   // Set fixed width & height
                  height={380}
                  src={item.url}
                  alt={item.name}
                  className="object-contain cursor-zoom-in rounded-md"
                  loading="lazy"
                  
                  style={{ objectFit: 'contain' }}
                />
              </Zoom>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

         {/* ✅ Navigation Buttons */}
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />

    </Carousel>
  )
}
