"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Filter, X, Check, ChevronDown } from 'lucide-react';
import {categorySingle} from '@/utils/actions/categories/actions';

export default function ShopFilter() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        inStock: null, // null = all, true = in stock, false = out of stock
        priceRange: { min_price: '', max_price: '' },
        sortBy: 'default' 
    });
    
    const t = useTranslations('Filter');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const categoryId = searchParams.get('category_id');
    const [categoryImage, setCategoryImage] = useState('/images/categories/default-bg.jpg');
    const [categoryName, setCategoryName] = useState('All Products');

    const getCategoryById = async (categoryId) => {
        try {
            return await categorySingle(categoryId);
        } catch (err) {
            console.error("Error fetching category:", err);
        }
    };

    // Load filters from URL on component mount
    useEffect(() => {
        const stockParam = searchParams.get('stock');
        const minPrice = searchParams.get('min_price');
        const maxPrice = searchParams.get('max_price');
        const sortBy = searchParams.get('sort_by');

        if (categoryId) {
            getCategoryById(categoryId).then(category => {
                setCategoryName(category.name)
                setCategoryImage(category.image || '/images/categories/default-bg.jpg');
            });
        }

        // Set initial filter states based on URL params
        setFilters({
            inStock: stockParam === 'in' ? true : stockParam === 'out' ? false : null,
            priceRange: {
                min: minPrice || '',
                max: maxPrice || ''
            },
            sortBy: sortBy || 'default'
        });
    }, [searchParams]);

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };

    const handleStockFilter = (stockStatus) => {
        setFilters(prev => ({
            ...prev,
            inStock: stockStatus
        }));
    };

    const handlePriceChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            priceRange: {
                ...prev.priceRange,
                [type]: value
            }
        }));
    };

    const handleSortChange = (sortValue) => {
        console.log("Selected sort:", sortValue);
        setFilters(prev => ({
            ...prev,
            sortBy: sortValue
        }));

        // Apply sort immediately
        const params = new URLSearchParams(searchParams);
        if (sortValue && sortValue !== 'default') {
            params.set('sort_by', sortValue);
        } else {
            params.delete('sort_by');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);
        console.log("Applying filters with params:", params.toString());
        // Stock filter
        if (filters.inStock === true) {
            params.set('stock', 'in');
        } else if (filters.inStock === false) {
            params.set('stock', 'out');
        } else {
            params.delete('stock');
        }

        // Price range
        if (filters.priceRange.min) {
            params.set('min_price', filters.priceRange.min);
        } else {
            params.delete('min_price');
        }

        if (filters.priceRange.max) {
            params.set('max_price', filters.priceRange.max);
        } else {
            params.delete('max_price');
        }

        // Sort by
        if (filters.sortBy && filters.sortBy !== 'default') {
            params.set('sort_by', filters.sortBy);
        } else {
            params.delete('sort_by');
        }

        router.push(`${pathname}?${params.toString()}`);
        setFilterOpen(false);
    };

    const clearFilters = () => {
        setFilters({
            inStock: null,
            priceRange: { min: '', max: '' },
            sortBy: 'default'
        });
        
        const params = new URLSearchParams();
        if (categoryId) params.set('category_id', categoryId);
        if (categoryName) params.set('category_name', categoryName);
        
        router.push(`${pathname}?${params.toString()}`);
        setFilterOpen(false);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.inStock !== null) count++;
        if (filters.priceRange.min || filters.priceRange.max) count++;
        if (filters.sortBy !== 'default') count++;
        return count;
    };

    return (
        <div className="w-full">
            {/* Category Header with Background Image */}
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ 
                        backgroundImage: `url(${categoryImage})` 
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-center justify-center text-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">{t('shop')}</h1>
                        <h2 className="text-2xl font-light">{categoryName}</h2>
                    </div>
                </div>
            </div>
            
            {/* Filter Controls */}
            <div className="row mb-6">
                <div className='flex justify-between items-center'>
                    <div className="flex items-center space-x-4">
                        <button 
                            className='flex items-center space-x-2 border-2 border-solid px-4 py-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors relative' 
                            onClick={handleFilterOpen}
                        >
                            <Filter className="w-4 h-4" />
                            <span>{t('show_filter')}</span>
                            {getActiveFiltersCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {getActiveFiltersCount()}
                                </span>
                            )}
                        </button>
                    </div>
                    
                    {/* Quick Sort */}
                    <div className="relative">
                        <select 
                            value={filters.sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
                        >
                            <option value="default">{t('sort_by')}</option>
                            <option value="best_selling"> {t('best_selling')} </option>
                            <option value="date_desc">{t('date')}: {t('new_to_old')} </option>
                            <option value="date_asc">{t('date')}: {t('old_to_new')}</option>
                            <option value="price_asc">{t('price')}: {t('low_to_high')}</option>
                            <option value="price_desc">{t('price')}: {t('high_to_low')} </option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-blue-900">{t('active_filters')}:</span>
                        
                        {filters.inStock !== null && (
                            <span className="inline-flex items-center px-2 py-1 rounded bg-blue-200 text-blue-800 text-sm">
                                {filters.inStock ? 'In Stock' : 'Out of Stock'}
                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleStockFilter(null)} />
                            </span>
                        )}
                        
                        {(filters.priceRange.min || filters.priceRange.max) && (
                            <span className="inline-flex items-center px-2 py-1 rounded bg-blue-200 text-blue-800 text-sm">
                                ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }))} />
                            </span>
                        )}
                        
                        {filters.sortBy !== 'default' && (
                            <span className="inline-flex items-center px-2 py-1 rounded bg-blue-200 text-blue-800 text-sm">
                                {filters.sortBy.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleSortChange('default')} />
                            </span>
                        )}
                        
                        <button 
                            onClick={clearFilters}
                            className="text-sm text-blue-600 hover:text-blue-800 underline ml-2"
                        >
                            {t('clear_filters')}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Filter Drawer */}
            <Drawer open={filterOpen} onOpenChange={setFilterOpen} direction="right">
                <DrawerContent className="p-0 max-w-md ml-auto rounded-l-2xl h-screen overflow-y-auto">
                    <DrawerHeader className="border-b px-6 py-4">
                        <DrawerTitle className="text-2xl font-bold flex items-center justify-between">
                            <span>Filters</span>
                            <DrawerClose asChild>
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </DrawerClose>
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="p-6 space-y-6">
                        {/* Stock Status Filter */}
                        <div>
                            <h3 className="font-semibold text-lg mb-3">{t('stock_status')}</h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={filters.inStock === null}
                                        onChange={() => handleStockFilter(null)}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>{t('all_products')}</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={filters.inStock === true}
                                        onChange={() => handleStockFilter(true)}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>{t('in_stock')}</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={filters.inStock === false}
                                        onChange={() => handleStockFilter(false)}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>{t('out_of_stock')}</span>
                                </label>
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                            <h3 className="font-semibold text-lg mb-3">{t('price_range')}</h3>
                            <div className="space-y-3">
                                <div className="flex space-x-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('min_price')}</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={filters.priceRange.min}
                                            onChange={(e) => handlePriceChange('min', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('max_price')}</label>
                                        <input
                                            type="number"
                                            placeholder="1000"
                                            value={filters.priceRange.max}
                                            onChange={(e) => handlePriceChange('max', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sort By Filter */}
                        {/* <div>
                            <h3 className="font-semibold text-lg mb-3">Sort By</h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'default'}
                                        onChange={() => handleSortChange('default')}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Default</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'name_asc'}
                                        onChange={() => handleSortChange('name_asc')}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Name: A to Z</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'name_desc'}
                                        onChange={() => handleSortChange('name_desc')}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Name: Z to A</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'price_asc'}
                                        onChange={() => handleSortChange('price_asc')}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Price: Low to High</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'price_desc'}
                                        onChange={() => handleSortChange('price_desc')}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Price: High to Low</span>
                                </label>
                            </div>
                        </div> */}
                    </div>

                    {/* Filter Actions */}
                    <div className="border-t p-6 mt-auto">
                        <div className="flex space-x-3">
                            <button
                                onClick={clearFilters}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {t('clear_filters')}
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {t('apply_filters')}
                            </button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}