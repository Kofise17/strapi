import { GetServerSideProps } from "next";

const APIToken = "5fd0008e632b90a8105c8a1dba55dd9f62da211212eb8db32bceebe5e7622b94deedf06130e968b6d9cce98c1b3168dfc63ff5338bfabe57738c7e93d4be18e063af053e830ded1d7bf5fc95a68edb0af5fe0036a7cef3fdf7cc649cafabd84af0d9a4f6fc51f333e0a2bd7cff992a70bad90255cbb523702efdce8349196c4a";


interface AlbumsProps{
    albums: Album[]
}

export const getServerSideProps : GetServerSideProps<AlbumsProps> = async () => {
    const response = await fetch("http://localhost:1337/api/albums?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        }
    });

    const responseData = await response.json();
    const albums: Album[] = responseData.data.map((album: any) => album.attributes)
    return{
        props: {
            albums: albums
        }
    }
}

export default function DiscoPage({albums}: {albums: Album[]}){
    return (
        <>
            <h1>Dit is de discografie pagina</h1>
            <ul>
            {albums.map((album, index)=>(
                <li key={index}>{album.title} {album.releaseYear}</li>    
            ))}    
            </ul>
        </>
    );
}