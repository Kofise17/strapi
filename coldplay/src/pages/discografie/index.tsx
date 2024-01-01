import { GetServerSideProps } from "next";

const APIToken = "b81151201d993dddbf9512fdfe513f490ecdf816a51175fb7a8f30a2a1ac55eadc6562c528e9fd6f00bf7a736e86c9a7ceb95c7f7259bacd373cb87866f1e06542c8021de8711c440e0dc43a2401c949b4b93064eb8d25ff43c7ad7c05625d75ce5d67926207cf03ad8b7156ad74f85ed37bd657a8cc7d81f2913eafc7f60673";


interface DiscographyProps{
    albums: Album[],
    singles: Single[],
    videos: Video[]
}

export const getServerSideProps : GetServerSideProps<DiscographyProps> = async () => {
    // Getting albums
    const responseAlbums = await fetch("http://localhost:1337/api/albums?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        }
    });

    const responseAlbumData = await responseAlbums.json();
    const albums: Album[] = responseAlbumData.data.map((album: any) => album.attributes)
    //Getting Singles
    const responseSingles = await fetch("http://localhost:1337/api/singles?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        }
    });

    const responseSingleData = await responseSingles.json();
    const singles: Single[] = responseSingleData.data.map((single: any) => single.attributes)

    //Getting videos
    const responseVideos = await fetch("http://localhost:1337/api/videos?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`
        }
    });

    const responseVideosData = await responseVideos.json();
    const videos: Video[] = responseVideosData.data.map((video: any) => video.attributes);
    return{
        props: {
            albums: albums,
            singles: singles,
            videos: videos
        }
    }
}

export default function DiscoPage({albums, singles, videos}: {albums: Album[], singles: Single[], videos: Video[]}){
     return (
        <>
            <h1>Dit is de discografie pagina</h1>
            <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                    <ul>
                        <h2>Albums</h2>
                            {albums.map((album, index)=>(
                                <li key={index}>{album.title} {album.releaseYear}</li>    
                            ))}    
                    </ul>
                    <ul>
                        <h2>Singles</h2>
                            {singles.map((single, index) => (
                                <li key={index}>{single.title} {single.releaseYear}</li>
                            ))}
                    </ul>
                </div>
                <ul style={{display:"flex", flexDirection:"column"}}>
                    <h2>Videos</h2>
                        {videos.map((video, index) => (
                            <>
                                <iframe key={index}width="400" height="200" src={video.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{paddingBottom:"10px"}}></iframe>
                            </>
                        ))}
                </ul>
            </div>
            
        </>
    );
}