export const createOrder = async (orderData: any) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
        });

        if (!response.ok) {
        return await response.json();
        }

        return await response.json();

    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }

}