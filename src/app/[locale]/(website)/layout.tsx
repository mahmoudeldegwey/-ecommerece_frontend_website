
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";


import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { ToastContainer } from "react-toastify";
import Header from "@/app/[locale]/components/Header";
import Footer from "@/app/[locale]/components/Footer";
import Providers from "@/app/[locale]/components/Providers";
import Info from "@/app/[locale]/components/Info";
import Navbar from "@/app/[locale]/components/Navbar";
import { getSettings } from "@/utils/actions/settings/actions";


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages =  await getMessages();
  const settings = await getSettings();

  return {
    title: settings.website_name,
    description: settings.website_description,
    keywords: settings.website_description,
    // icons: {
    //   icon: settings.site_favicon,
    // },
    openGraph: {
      title: settings.website_name,
      description: settings.website_description,
      //images: [settings.seo.og_image],
      siteName: settings.website_name,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.website_name,
      description: settings.website_description,
      //images: [settings.seo.og_image],
    },
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="px-6 pt-10 mb-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
