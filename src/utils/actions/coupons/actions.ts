export default async function applyCoupon(coupon_code: string, total_price: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/coupon-apply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coupon_code:coupon_code, total_price:total_price }),
    });

    if (!response.ok) {
        return await response.json();
        
    }

    return response.json();
}
