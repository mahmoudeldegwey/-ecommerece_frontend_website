'use client'
import { useSearchParams } from 'next/navigation';
import { useTranslations } from "next-intl";
import Link from 'next/link';
import { useLocale } from "next-intl";

export default function OrderSuccess() {

    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const message = searchParams.get('message');
    
    const t = useTranslations('OrderSuccessPage');
    const locale = useLocale();

    return (
        <div className="container mx-auto flex items-center h-screen px-4 py-8 text-center">
            <div className="w-full">
                <div className="bg-green-100 w-full border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <h1 className="text-2xl font-bold mb-2">✅ {message}</h1>
                    {orderId && <p>{t('order_number')}: #{orderId}</p>}
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                    <Link href={`/${locale}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {t('continue_shopping')}
                    </Link>
                    <Link href={` /${locale}/track-order`}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {t('track_order')}
                    </Link>
                </div>
            </div>
        </div>
    );
}