
export interface BookCardProps {
    isbn: number;
    title: string;
    keyProp: string; 
    authors: { name: string }[];
    published: number;
  }
export async function addFavorite(token:string, book: BookCardProps){

    console.log(book)
    book.authors.map((author) => {
        console.log(author);
    })
    const result = await fetch(`/api/favorites/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({book}),

    });
    if(!result.ok){
        throw new Error('Login Failed');
    }
    const data = await result.json();
    console.log(data);
    return data;
}
export async function removeFavorite(token:string, keyProp: string){
    const result = await fetch(`/api/favorites/`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({keyProp}),
        

    });
    if(!result.ok){
        throw new Error('Login Failed');
    }
    const data = await result.json();
    console.log(data);
    return data;
}
export async function getFavorite(token:string){
    const result = await fetch(`/api/favorites/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        

    });
    if(!result.ok){
        throw new Error('Login Failed');
    }
    const data = await result.json();
    console.log(data);
    return data;

}
