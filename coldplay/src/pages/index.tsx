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
          <h1>Welkom</h1>
          <p>Welkom bij deze blog-website over de beste band in de wereld: Coldplay</p>
          <p>Op deze website kan je al hun singles, albums en videos bekijken en je kna ook nog veel bijleren over de leden zelf!</p>
          <p>Go and explore my fellow Coldplayers!</p>
          <h2>Nieuwste post</h2>
          <p style={{width:"500px"}}>{post.content}</p>
          <p><i>- {post.author.firstname} {post.author.lastname}</i></p>
      </div>
    </>
  );
}