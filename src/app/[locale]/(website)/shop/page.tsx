import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import BreadcrumbComponent from "./components/Breadcrumb";
import ShopFilter from "./components/ShopFilter";
import ListProducts from "./components/ListProducts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ShopPage");

  return {
    title: t("title"),
    description: t("title"),
    openGraph: {
      title: t("title"),
      description: t("title"),
    },
  };
}

export default function ShopPage() {
  return (
    <div className=" mx-auto px-4">
      {/* Breadcrumb Section */}
      <div className="mb-6">
        <BreadcrumbComponent />
      </div>

      {/* Filters */}
      <div className="md:col-span-1">
        <ShopFilter />
      </div>

      {/* Products */}
      <div className="md:col-span-1">
        <ListProducts />
      </div>

    </div>
  );
}
