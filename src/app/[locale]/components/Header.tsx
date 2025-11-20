"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import LanguageSwitcher from "@/app/[locale]/components/LanguageSwitcher";
import { useTranslations,useLocale } from "next-intl";
import CartDrawer from "@/app/[locale]/components/CartDrawer";
import { useSettings } from '@/contexts/SettingsContext';
import { useCartStore } from '@/stores/useCartStore';
import { 
  FiSearch, 
  FiShoppingCart, 
  FiMenu, 
  FiX, 
  FiUser,
  FiHeart,
  FiLogOut,
  FiShoppingBag
} from 'react-icons/fi';
import { MdSupport } from 'react-icons/md';
import { BsPercent, BsTruck } from 'react-icons/bs';
import Slider from './Slider';
import MenuCategories from './MenuCategories';

const cartItems = [];

const Header = () => {
  const { data: session, status } = useSession();
  const t = useTranslations('Header');
  const locale = useLocale();

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const currentLocale = useLocale();

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const settings = useSettings();
  const { items } = useCartStore();

  return (
    <div>
      <CartDrawer cartItems={cartItems} isOpen={cartOpen} onOpenChange={setCartOpen} />
      
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-black text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <BsTruck className="w-4 h-4" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <BsPercent className="w-4 h-4" />
              <span>20% off first order - Use code: WELCOME20</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <MdSupport className="w-4 h-4" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      <header className="header-style-1 bg-white shadow-lg">
        {/* TOP MENU */}
        <div className="animate-dropdown bg-gray-50 py-2">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="hidden md:flex items-center space-x-4">
                {status === 'authenticated' && (
                  <> 
                    <Link href="/account" className="flex items-center space-x-1 text-sm hover:text-blue-600">
                      <FiUser className="w-4 h-4" />
                      <span>{t('my_account')}</span>
                    </Link>
                    <Link href="/wishlist" className="flex items-center space-x-1 text-sm hover:text-blue-600">
                      <FiHeart className="w-4 h-4" />
                      <span>{t('wishlist')}</span>
                    </Link>
                    <Link href="/checkout" className="flex items-center space-x-1 text-sm hover:text-blue-600">
                      <FiShoppingBag className="w-4 h-4" />
                      <span>{t('checkout')}</span>
                    </Link>
                    <button 
                      onClick={() => signOut()} 
                      className="flex items-center space-x-1 text-sm hover:text-red-600"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </>
                )}

                {status === 'unauthenticated' && (
                  <Link href={`/${locale}/login`} className="flex items-center space-x-1 text-sm hover:text-blue-600">
                    <FiUser className="w-4 h-4" />
                    <span>{t('login')}</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="bg-white py-4 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/home" className="flex items-center">
                <Image
                  src={settings.website_logo || '/images/logo.png'}
                  alt="logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>

              {/* Right Section: Search + Cart + Menu */}
              <div className="flex items-center gap-3">
                {/* Search Toggle Button */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FiSearch className="w-6 h-6 text-gray-700" />
                </button>

                {/* Animated Search Input (desktop only) */}
                <div
                  className={`hidden lg:flex items-center transition-all duration-300 overflow-hidden ${
                    searchOpen ? "w-72 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("search_placeholder")}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                      className="flex-1 px-4 py-2 text-sm border-none focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cart Icon */}
                <button
                  onClick={handleCartOpen}
                  className="relative p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiShoppingCart className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                    {items.length}
                  </span>
                </button>

                {/* Mobile Menu */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                >
                  {mobileMenuOpen ? (
                    <FiX className="w-6 h-6" />
                  ) : (
                    <FiMenu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search Input */}
            {searchOpen && (
              <div className="lg:hidden mt-3">
                <div className="flex border border-gray-300 rounded-full overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm border-none outline-none"
                    placeholder={t("search_placeholder")}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION MENU - Desktop */}
        <div className="hidden lg:block bg-black border-b border-gray-200 text-white">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3">
              <Link href={`/${currentLocale}/shop`} className="hover:text-white-400 transition-colors font-medium">
                {t("all_products")}
              </Link>
              <MenuCategories />
            </nav>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                <Link 
                  href={`/${currentLocale}/shop`} 
                  className="block py-2 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("all_products")}
                </Link>
                <MenuCategories />
                
                {status === 'authenticated' && (
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <Link href="/account" className="block py-2 hover:text-blue-600 transition-colors">
                      {t('my_account')}
                    </Link>
                    <Link href="/wishlist" className="block py-2 hover:text-blue-600 transition-colors">
                      {t('wishlist')}
                    </Link>
                    <Link href="/checkout" className="block py-2 hover:text-blue-600 transition-colors">
                      {t('checkout')}
                    </Link>
                    <button 
                      onClick={() => signOut()} 
                      className="block py-2 hover:text-red-600 transition-colors text-left w-full"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      <Slider />

    </div>
  );
};

export default Header;