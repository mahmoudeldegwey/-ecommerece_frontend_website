
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
import { SettingsProvider } from "@/contexts/SettingsContext";


export default async function RootLayout({session,  children, }: { session:any; children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages =  await getMessages();
  const settings = await getSettings();

  return (

 <html lang={locale}>
      <body>
        <SettingsProvider settings={settings}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children} {/* This will include nested layouts */}
          </NextIntlClientProvider>
        </Providers>
        <ToastContainer /> 
        </SettingsProvider>
      </body>
    </html>

  );
}
