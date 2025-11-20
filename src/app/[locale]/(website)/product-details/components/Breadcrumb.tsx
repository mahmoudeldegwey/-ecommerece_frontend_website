"use client";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react"
import { useTranslations } from "next-intl";
import { singleProduct } from "@/utils/actions/products/actions";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

export  default function BreadcrumbComponent({product}:{product: any}){
    
    const currentLocale = useLocale();

    return <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2">
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${currentLocale}`}
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <Slash className="w-3 h-3 text-gray-400" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">
              {product?.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>;
}



