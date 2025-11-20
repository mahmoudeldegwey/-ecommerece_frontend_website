export const getSettings = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/settings`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
    });

    const data = await response.json();
 console.log(data,'response settings')

    return data;
}