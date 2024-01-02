import { Marked } from "marked";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const APIToken = process.env.TOKEN
const marked = new Marked();

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
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h1>{currentPost.title}</h1>
                <div  dangerouslySetInnerHTML={{ __html: marked.parse(currentPost.content) }} style={{width:"750px"}}/>
            </div>
        </>
    );
}