
export const defaultCountry = async () => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/countries/show`, {
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