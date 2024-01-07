import { GetServerSideProps } from "next";

const APIToken = process.env.TOKEN;

interface PostProps {
  post: Post
}

export const getServerSideProps : GetServerSideProps<PostProps> = async () => {
  //Posts
    const responsePosts = await fetch("http://localhost:1337/api/posts?populate=*", {
      headers: {
          Authorization: `Bearer ${APIToken}`,
      },
  });

  const responsePostsData =  await responsePosts.json();
  const posts: Post[] = responsePostsData.data.map((post: any) => post.attributes)

  //Authors
  const responseAuthors = await fetch("http://localhost:1337/api/authors?populate=*", {
  headers: {
  Authorization: `Bearer ${APIToken}`}});
  const responseAuthorsData = await responseAuthors.json();
  const authors: Author[] = responseAuthorsData.data.map((author: any) => author.attributes);
  //Linking authors to posts
   for (const post of posts) {
     let author = authors.find((author) => post.author.data.attributes.email === author.email);
     if (author) {
       post.author = author;
     } else {
     }
   };
   //Getting the latestpost
  const lastIndex = posts.length - 1;
  const latestPost = posts[lastIndex];
  //setting the latestpost
  return {
      props: {
          post: latestPost
      },
  };    

};


export default function Home ({post} : {post: Post}) {
  return (
    <>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
          <h1>Welcome to our Coldplay Blogpage your ultimate destination for all things Coldplay! 🎵✨</h1>
          <p>Step into the enchanting world of Coldplay with us, where music meets emotions and melodies paint stories. Whether you're a dedicated Coldplay fan or just discovering their mesmerizing tunes, this blog is your go-to hub for the latest news, in-depth analyses, exclusive interviews, and captivating insights into the band's captivating journey.</p>
          <p>Immerse yourself in the kaleidoscope of Coldplay's music, from their groundbreaking albums to their electrifying live performances. Explore behind-the-scenes stories, uncover the inspirations behind their lyrics, and join us as we celebrate the band's innovative spirit and impactful contributions to the world of music.</p>
          <p>Get ready to dive into a symphony of articles, reviews, concert recaps, and everything in between, crafted by fellow Coldplay enthusiasts who share the passion for the band's soul-stirring melodies.</p>
          <p>Join our community of fans as we journey through the colorful and ever-evolving world of Coldplay. Together, let's celebrate the music, the magic, and the endless inspiration that Coldplay brings to our lives.</p>
          <p>Stay tuned for exciting updates, captivating discussions, and a melodious journey that will resonate with your heart and soul.</p>
          <p>Welcome aboard, and let the adventure begin! 🌟🎶</p>
          <h2>Most recent post</h2>
          <p style={{width:"750px"}}>{post.content}</p>
          <p><i>- {post.author.firstname} {post.author.lastname}</i></p>
      </div>
    </>
  );
}