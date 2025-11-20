export const productsList = async (page: number = 1, params: any = {}) => {
    try {
        const queryParams = new URLSearchParams({
            ...params,
            page: page.toString()
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!data.data) {
            throw new Error(`HTTP error! Status:`);
        }

        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const singleProduct = async (id: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!data.data) {
            throw new Error(`HTTP error! Status:`);
        }

        return data.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const saveProductReview = async (productId: number, 
    reviewData: { rate: string; message: string; phone_number: string; email: string; username: string; image: File | null }
) => {
    try {
        
        const formData = new FormData();

        formData.append('rate', reviewData.rate)
        formData.append('message', reviewData.message)
        formData.append('phone_number', reviewData.phone_number) 
        formData.append('email', reviewData.email) 
        formData.append('username', reviewData.username) 
        formData.append('image', reviewData.image) 


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product-reviews/${productId}`, {
            method: 'POST',
            headers: {
               
            },
            body: formData
        });
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const productReviews = async (productId: number, page: number = 1) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product-reviews/${productId}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!data.data) {
            throw new Error(`HTTP error! Status:`);
        }

        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}