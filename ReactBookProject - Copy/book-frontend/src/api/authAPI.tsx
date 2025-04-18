export async function PostRegister(username: string,email:string,password:string){

   
    const result = await fetch(`/api/auth/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,email,password}),

    });
    const data = result.json();
    console.log(data);
    return data;
    
}
export async function PostLogin(username: string, password: string){

   
    const result = await fetch(`/api/auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),

    });
    if(!result.ok){
        throw new Error('Login Failed');
    }
    const data = result.json();
    console.log(data);
    return data;
    
}