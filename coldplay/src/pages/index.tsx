import { GetServerSideProps } from "next";

const APIToken = "b81151201d993dddbf9512fdfe513f490ecdf816a51175fb7a8f30a2a1ac55eadc6562c528e9fd6f00bf7a736e86c9a7ceb95c7f7259bacd373cb87866f1e06542c8021de8711c440e0dc43a2401c949b4b93064eb8d25ff43c7ad7c05625d75ce5d67926207cf03ad8b7156ad74f85ed37bd657a8cc7d81f2913eafc7f60673";

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
  console.log(post)
  return (
    <>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
          <h1>Welkom</h1>
          <p>Welkom bij deze blog-website over de beste band in de wereld: Coldplay</p>
          <p>Op deze website kan je al hun singles, albums en videos bekijken en je kna ook nog veel bijleren over de leden zelf!</p>
          <p>Go and explore my fellow Coldplayers!</p>
          <h2>Nieuwste post</h2>
          {post.content}
          <p><i>- {post.author.firstname} {post.author.lastname}</i></p>
      </div>
    </>
  );
}