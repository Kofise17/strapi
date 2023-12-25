import { GetServerSideProps } from "next";

const APIToken = "5fd0008e632b90a8105c8a1dba55dd9f62da211212eb8db32bceebe5e7622b94deedf06130e968b6d9cce98c1b3168dfc63ff5338bfabe57738c7e93d4be18e063af053e830ded1d7bf5fc95a68edb0af5fe0036a7cef3fdf7cc649cafabd84af0d9a4f6fc51f333e0a2bd7cff992a70bad90255cbb523702efdce8349196c4a";

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
      <h1>Home pagina</h1>
      <p>Op deze pagina komt de meest recentstse blogpost</p>
      {post.content}
      <p><i>- {post.author.firstname} {post.author.lastname}</i></p>
    </>
  );
}