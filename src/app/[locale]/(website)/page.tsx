"use client";
import Image from "next/image";
import { useSession} from "next-auth/react";
import {useTranslations} from 'next-intl';
import { useLocale } from "next-intl";
import HomePageCategories from '@/app/[locale]/components/HomePageCategories';
import { HomePageLastProducts } from '@/app/[locale]/components/HomePageLastProducts';

export default function index() {
  return (
    <div >
      <div className="w-full relative">
        <div className="row">
          <HomePageCategories />
        </div>

        <div className="row">
          <HomePageLastProducts />
        </div>  

      </div>    
    </div>
  );
}
