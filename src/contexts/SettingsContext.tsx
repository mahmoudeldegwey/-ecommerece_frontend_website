"use client";
import React, { createContext, useContext, ReactNode } from 'react';

interface Settings {
  website_name: string;
  website_description: string;
  website_description_ar: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
  website_logo: string;
  website_favicon: string;
  default_language: string;
  default_currency: string;
  default_country: string;
  copyrights: string;
  copyrights_ar: string;
  address: string;
  address_ar: string;
  phone_number: string;
//   social_media: {
//     facebook?: string;
//     twitter?: string;
//     instagram?: string;
//     linkedin?: string;
//     youtube?: string;
//     tiktok?: string;
//     pinterest?: string;
//   };
//   seo: {
//     meta_title: string;
//     meta_description: string;
//     meta_keywords: string;
//     og_image: string;
//   };
//   contact: {
//     email: string;
//     phone: string;
//     whatsapp?: string;
//     address: string;
//   };
//   business_hours?: {
//     [key: string]: string;
//   };
//   features?: {
//     free_shipping_threshold?: number;
//     currency?: string;
//     currency_symbol?: string;
//     enable_reviews?: boolean;
//     enable_wishlist?: boolean;
//     enable_multi_language?: boolean;
//   };
}

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ 
  children, 
  settings 
}: { 
  children: ReactNode; 
  settings: Settings;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}