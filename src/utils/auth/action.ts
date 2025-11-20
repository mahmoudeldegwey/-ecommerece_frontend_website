export const register = async (username:string, email:string, password:string, password_confirmation:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
        method: "POST",
        headers: {  
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username, 
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }),
    });
    
    return await response.json();
}