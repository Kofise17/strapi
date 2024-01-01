import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const APIToken = "b81151201d993dddbf9512fdfe513f490ecdf816a51175fb7a8f30a2a1ac55eadc6562c528e9fd6f00bf7a736e86c9a7ceb95c7f7259bacd373cb87866f1e06542c8021de8711c440e0dc43a2401c949b4b93064eb8d25ff43c7ad7c05625d75ce5d67926207cf03ad8b7156ad74f85ed37bd657a8cc7d81f2913eafc7f60673";

interface PostProps {
    posts: Post[]
  }
  
  export const getServerSideProps : GetServerSideProps<PostProps> = async () => {
      const response = await fetch("http://localhost:1337/api/posts?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        },
    });
    const responseDate =  await response.json();
    const posts: Post[] = responseDate.data.map((post: any) => post.attributes)
    return {
        props: {
            posts: posts
        },
    };    
  
  };
  

export default function BlogPage({posts} : {posts : Post[]}){
    const router = useRouter();
    const currentId = parseInt(router.query.id as string);
    let currentPost : Post = posts[currentId]; 
    return (
        <>
            <h1>{currentPost.title}</h1>
            <p>{currentPost.content}</p>
        </>
    );
}