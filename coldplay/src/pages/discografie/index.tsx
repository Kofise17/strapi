import { GetServerSideProps, GetStaticProps } from "next";

const APIToken = process.env.TOKEN


interface DiscographyProps{
    albums: Album[],
    singles: Single[],
    videos: Video[]
}

export const getStaticProps : GetStaticProps<DiscographyProps> = async () => {
    let fakeLabel: Label= {
        name:"randomLabel",
        albums: [],
        singles: [],
        videos: []
    }
    // Getting albums
    const responseAlbums = await fetch("http://localhost:1337/api/albums?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        }
    });

    const responseAlbumData = await responseAlbums.json();
    let albums: Album[] = [];

    if (responseAlbumData && responseAlbumData.data && responseAlbumData.data.length > 0) {
        albums = responseAlbumData.data.map((albumData: any) => {
            const album: Album = {
                title: albumData.attributes.title,
                releaseYear: albumData.attributes.releaseYear,
                label: fakeLabel        
            };
            return album;
        })
    }

    //Getting Singles
    const responseSingles = await fetch("http://localhost:1337/api/singles?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        }
    });

    const responseSingleData = await responseSingles.json();
    let singles: Single[] = [];
     
    if (responseSingleData && responseSingleData.data && responseSingleData.data.length) {
        singles = responseSingleData.data.map((singleData: any) => {
            const single : Single = {
                title: singleData.attributes.title,
                label: fakeLabel,
                releaseYear: singleData.attributes.releaseYear         
            }
            return single;
        })
    }

    //Getting videos
    const responseVideos = await fetch("http://localhost:1337/api/videos?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`
        }
    });

    const responseVideosData = await responseVideos.json();
    let videos: Video[] = [];

    if (responseVideosData && responseVideosData.data && responseVideosData.data.length > 0) {
        videos = responseVideosData.data.map((videoData:any) => {
            const video : Video = {
                title: videoData.attributes.title,
                label: fakeLabel,
                url: videoData.attributes.url,
                releaseYear: videoData.attributes.releaseYear    
            }
            return video;
        })
    }

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
            <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                <h1>Welcome to Coldplay's Musical Journey 🎶✨</h1>
                <p>Explore the sonic evolution of Coldplay through their discography – a mesmerizing collection of albums that encapsulate the band's artistic growth, emotional depth, and timeless melodies.</p>
                <p>From their debut album 'Parachutes' to the chart-topping hits of 'A Head Full of Dreams,' dive into each album's unique soundscapes, heartfelt lyrics, and captivating narratives that have touched millions of hearts worldwide.</p>
                <p>Discover the stories behind the music, track listings, and the profound impact each album has had on Coldplay's illustrious career. Join us as we celebrate the brilliance, innovation, and musical genius of Coldplay across their acclaimed discography.</p>
                <p>Let the melodies guide you through an unforgettable journey of passion, inspiration, and the magic that defines Coldplay's extraordinary musical legacy.</p>
                <p>Start exploring and let the music speak to your soul. 🌈🎵</p>
            </div>
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