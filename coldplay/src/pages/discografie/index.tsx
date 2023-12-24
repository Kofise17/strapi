import { GetServerSideProps } from "next";

const APIToken = "cff29613ffc48c09f6469828c6cdad8349d8600a8bbffa822a1b253941189f487262732256ed0321a8b89a42d35ea57f3464ad58fc2b974eac3e99d7ff5ebc7442862cbb66da374196e939d719360256042976b664516437c8d6626cd40bc13b419b19e3f58874c656a04288069e8af24098340fe3492a339cbf413d17d926d2";


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