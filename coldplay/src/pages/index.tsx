import { GetServerSideProps } from "next";

const APIToken = "cff29613ffc48c09f6469828c6cdad8349d8600a8bbffa822a1b253941189f487262732256ed0321a8b89a42d35ea57f3464ad58fc2b974eac3e99d7ff5ebc7442862cbb66da374196e939d719360256042976b664516437c8d6626cd40bc13b419b19e3f58874c656a04288069e8af24098340fe3492a339cbf413d17d926d2";

interface PostProps {
  post: Post
}

export const getServerSideProps : GetServerSideProps<PostProps> = async () => {
    const response = await fetch("http://localhost:1337/api/posts?populate=*", {
      headers: {
          Authorization: `Bearer ${APIToken}`,
      },
  });

  const responseDate =  await response.json();
  const posts: Post[] = responseDate.data.map((post: any) => post.attributes)
  const lastIndex = posts.length - 1;
  const latestPost = posts[lastIndex]
  console.log("Post:", latestPost);
  return {
      props: {
          post: latestPost
      },
  };    

};


export default function Home ({post} : {post: Post}) {
  return (
    <>
      <h1>Home pagina</h1>
      <p>Op deze pagina komt de meest recentstse blogpost</p>
      {post.content}
    </>
  );
}