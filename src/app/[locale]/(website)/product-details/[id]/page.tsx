import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Suspense } from "react";
import ProductImages from "../components/ProductImages";
import ProductInfo from "../components/ProductInfo";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import { singleProduct } from "@/utils/actions/products/actions";
import BreadcrumbComponent from "../components/Breadcrumb";
import { useTranslations, useLocale } from 'next-intl';
import { FiHeart,} from "react-icons/fi";

async function fetchProduct(id: number) {
  return await singleProduct(id);
}

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  const t = await getTranslations("ProductDetails");
  const id = Number(params.id);
  const product = await fetchProduct(id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

// Loading components for better UX
function ProductImagesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-md animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

function ProductInfoSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export default async function ProductDetails({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  const product = await fetchProduct(id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <BreadcrumbComponent product={product} />
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <Suspense fallback={<ProductImagesSkeleton />}>
                <ProductImages product={product} />
              </Suspense>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <Suspense fallback={<ProductInfoSkeleton />}>
                <ProductInfo id={id} />
              </Suspense>

              {/* Trust Badges */}
              {/* <div className="border-t pt-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="p-2 bg-green-100 rounded-full">
                      <FiShield className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FiTruck className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <FiRotateCcw className="w-4 h-4 text-orange-600" />
                    </div>
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <FiHeadphones className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          {/* <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button className="py-4 px-2 border-b-2 border-blue-500 text-blue-600 font-semibold">
                Description
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-gray-700 transition-colors">
                Specifications
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-gray-700 transition-colors">
                Shipping & Returns
              </button>
            </div>
          </div> */}

          {/* Tab Content */}
          
          {/* <div className="p-6 lg:p-8">
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Product Description</h3>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Premium quality materials</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Durable construction</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Easy to use and maintain</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Satisfaction guaranteed</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Main product</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>User manual</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Warranty card</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Original packaging</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}


        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 lg:p-8">

            
            <Suspense fallback={
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            }>
              <ProductReviews productId={id} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 lg:p-8">
           
            
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            }>
              <RelatedProducts productId={id} categoryId={product?.categories[0]?.id} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">{product.name}</p>
            <p className="text-lg font-bold text-blue-600">
              ${product.sale_price || product.price}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="p-3 bg-gray-100 rounded-lg">
              <FiHeart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}