import { GetServerSideProps } from "next";

const APIToken = process.env.TOKEN


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
                <div style={{display:"flex"}}>
                    <ul>
                        <h2>Albums</h2>
                            {albums.map((album, index)=>(
                                <li key={index} style={{listStyleType:"none", paddingTop:"-50px"}}>{album.title} {album.releaseYear}</li>    
                            ))}    
                    </ul>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h2>Singles</h2>
                        <ul style={{columnCount:"3" }}>
                                {singles.map((single, index) => (
                                    <li key={index} style={{listStyleType:"none", maxWidth:"200px", borderStyle:"dotted", borderWidth:"2px"}}>{single.title}-{single.releaseYear}</li>
                                ))}
                        </ul>
                    </div>
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