export const categoriesList = async (params: any = {}) => {
    try {
        const queryParams = new URLSearchParams({
            ...params,
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories?${queryParams}`, {
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
};

export const categorySingle = async (id: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch category');
        }

        const data = await response.json();

        if (!data.data) {
            throw new Error(`HTTP error! Status:`);
        }
        
        return data.data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
