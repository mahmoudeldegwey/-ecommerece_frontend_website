"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiUser, 
  FiClock, 
  FiHelpCircle,
  FiStar,
  FiShoppingBag,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiSearch
} from 'react-icons/fi';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPinterestP,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApplePay,
  FaGooglePay
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { useSettings } from '@/contexts/SettingsContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const settings = useSettings();

    return (
        <footer className="bg-gray-900 text-white">
            {/* Newsletter Section */}
            {/* <div className="bg-gray-800 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
                        <p className="text-gray-300 mb-6 text-lg">
                            Subscribe to our newsletter and get 10% off your first order
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center max-w-md mx-auto gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Footer Content */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Contact Information */}
                        <div>
                            <h4 className="text-xl font-bold mb-6 text-white">Get in Touch</h4>
                            <div className="space-y-4">
                                {/* <div className="flex items-start space-x-3">
                                    <FiMapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-300">
                                            123 Business Street<br />
                                            New York, NY 10001<br />
                                            United States
                                        </p>
                                    </div>
                                </div> */}
                                <div className="flex items-center space-x-3">
                                    <FiPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-300">{settings.phone_number}</p>
                                        {/* <p className="text-gray-300">+1 (555) 987-6543</p> */}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <Link 
                                        href="{settings.email || 'support@yourstore.com'}" 
                                        className="text-gray-300 hover:text-blue-400 transition-colors"
                                    >
                                        {settings.email || 'support@yourstore.com'}
                                    </Link>
                                </div>
                                {/* <div className="flex items-center space-x-3">
                                    <FiClock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-300">Sat - Sun: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Customer Service */}
                        {/* <div>
                            <h4 className="text-xl font-bold mb-6 text-white">Customer Service</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link 
                                        href="/account" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiUser className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>My Account</span>
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link 
                                        href="/faq" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiHelpCircle className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>FAQ</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/specials" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiStar className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Specials</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/help" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiHelpCircle className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Help Center</span>
                                    </Link>
                                </li>
                            </ul>
                        </div> */}

                        {/* Company */}
                        {/* <div>
                            <h4 className="text-xl font-bold mb-6 text-white">Company</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link 
                                        href="/about" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiUsers className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>About Us</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/careers" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiTrendingUp className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Careers</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/press" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiFileText className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Press & Media</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/investors" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiTrendingUp className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Investor Relations</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/sustainability" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiUsers className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Sustainability</span>
                                    </Link>
                                </li>
                            </ul>
                        </div> */}

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
                            <ul className="space-y-3">
                                {/* <li>
                                    <Link 
                                        href="/shipping" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiFileText className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Shipping Info</span>
                                    </Link>
                                </li> */}
                                {/* <li>
                                    <Link 
                                        href="/returns" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiFileText className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Returns & Exchanges</span>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link 
                                        href="/orders" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiShoppingBag className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Order History</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/size-guide" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiFileText className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Size Guide</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link 
                                        href="/blog" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiFileText className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Blog</span>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link 
                                        href="/contact" 
                                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                                    >
                                        <FiMail className="w-4 h-4 group-hover:text-blue-400" />
                                        <span>Contact Us</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                        {/* Social Media */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-400 font-medium mr-4">Follow Us:</span>
                            <div className="flex space-x-3">
                                <Link 
                                    href="#" 
                                    className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </Link>
                                <Link 
                                    href="#" 
                                    className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition-colors group"
                                    aria-label="Twitter"
                                >
                                    <FaX className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </Link>
                                <Link 
                                    href="#" 
                                    className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors group"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </Link>
                                {/* <Link 
                                    href="#" 
                                    className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition-colors group"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </Link>
                                <Link 
                                    href="#" 
                                    className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors group"
                                    aria-label="YouTube"
                                >
                                    <FaYoutube className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </Link>
                                <Link 
                                    href="#" 
                                    className="p-2 bg-gray-800 rounded-full hover:bg-black transition-colors group"
                                    aria-label="TikTok"
                                >
                                    <FaTiktok className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </Link> */}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="text-center lg:text-left">
                            <p className="text-gray-400">
                                © {currentYear} {settings.copyrights || 'Your Store. All rights reserved.'}
                                {/* <Link href="/privacy" className="ml-2 hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </Link>
                                <span className="mx-2">|</span>
                                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                                    Terms of Service
                                </Link> */}
                            </p>
                        </div>

                        {/* Payment Methods */}
                        {/* <div className="flex items-center space-x-4">
                            <span className="text-gray-400 font-medium mr-2">We Accept:</span>
                            <div className="flex space-x-2">
                                <div className="p-1 bg-white rounded border">
                                    <FaCcVisa className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="p-1 bg-white rounded border">
                                    <FaCcMastercard className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="p-1 bg-white rounded border">
                                    <FaCcPaypal className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="p-1 bg-white rounded border">
                                    <FaCcAmex className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="p-1 bg-white rounded border">
                                    <FaApplePay className="w-6 h-6 text-black" />
                                </div>
                                <div className="p-1 bg-white rounded border">
                                    <FaGooglePay className="w-6 h-6 text-gray-700" />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Floating Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-50"
                aria-label="Back to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;