"use client";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiHeart, FiShoppingBag, FiLogOut, FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { useTranslations } from "next-intl";


export default function Header({
  status,
  locale,
  categories = [],
  handleCartOpen,
  handleSearch,
  toggleMobileMenu,
  mobileMenuOpen,
  signOut,
}) {
  const t = useTranslations("Header");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="header bg-white shadow-lg">
      {/* 🔹 TOP BAR */}
      <div className="bg-gray-50 py-2 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Account Links */}
          <div className="hidden md:flex items-center space-x-5 text-sm">
            {status === "authenticated" ? (
              <>
                <Link href="/account" className="flex items-center hover:text-blue-600 gap-1">
                  <FiUser /> <span>{t("my_account")}</span>
                </Link>
                <Link href="/wishlist" className="flex items-center hover:text-blue-600 gap-1">
                  <FiHeart /> <span>{t("wishlist")}</span>
                </Link>
                <Link href="/checkout" className="flex items-center hover:text-blue-600 gap-1">
                  <FiShoppingBag /> <span>{t("checkout")}</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center hover:text-red-500 gap-1"
                >
                  <FiLogOut /> <span>{t("logout")}</span>
                </button>
              </>
            ) : (
              <Link href={`/${locale}/login`} className="flex items-center hover:text-blue-600 gap-1">
                <FiUser /> <span>{t("login")}</span>
              </Link>
            )}
          </div>

          {/* Language & Cart */}
          <div className="flex items-center gap-4">
            
            <button
              onClick={handleCartOpen}
              className="relative flex items-center hover:text-blue-600 transition"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline ml-1">{t("my_cart")}</span>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 MAIN HEADER */}
      <div className="py-4 bg-white">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center">
            <Image src="/images/logo.png" alt="logo" width={150} height={40} className="h-10 w-auto" />
          </Link>


          {/* Right Side (Cart + Mobile Menu) */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className="w-6 h-6 text-gray-700" />
            </button>

            {/* Cart */}
            <button
              onClick={handleCartOpen}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                2
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search (Visible when open) */}
        {searchOpen && (
          <div className="lg:hidden mt-3 px-4">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 outline-none"
                placeholder={t("search_placeholder")}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              />
              <button
                onClick={handleSearch}
                className="px-4 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <FiSearch />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 NAVIGATION MENU */}
      <div className="hidden lg:block bg-black text-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 py-3">
            <Link href="/shop" className="hover:text-blue-400 transition font-medium">
              {t("all_products")}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="hover:text-blue-400 transition"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 🔹 MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-3">
              <Link
                href="/shop"
                className="block py-2 hover:text-blue-600 font-medium"
                onClick={toggleMobileMenu}
              >
                {t("all_products")}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="block py-2 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
