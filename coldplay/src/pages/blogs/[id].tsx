import { Marked } from "marked";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const APIToken = process.env.TOKEN
const marked = new Marked();
interface Paths extends ParsedUrlQuery{
    id: string
}

export const getStaticPaths : GetStaticPaths<Paths> = async () => {
    
          //Authors
  const responseAuthors = await fetch("http://localhost:1337/api/authors?populate=*", {
    headers: {
    Authorization: `Bearer ${APIToken}`}});
    const responseAuthorsData = await responseAuthors.json();
    let authors: Author[] = [];

    //Posts
    const response = await fetch("http://localhost:1337/api/posts?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        },
    });
    
        const responseData =  await response.json();
    let posts: Post[] = []; 

    if (responseAuthorsData && responseAuthorsData.data && responseAuthorsData.data.length > 0) {
        authors = responseAuthorsData.data.map((authorData: any)=> {
            const author: Author = {
                firstname: authorData.attributes.firstname,
                lastname: authorData.attributes.lastname,
                email: authorData.attributes.email,
                shortBio: authorData.attributes.shortBio,
                posts: posts
            }
            return author;
        })
    }

    if (responseData && responseData.data && responseData.data.length > 0) {
        posts = responseData.data.map((postData: any)=> {
            const post: Post = {
                title: postData.attributes.title,
                content: postData.attributes.content,
                author: authors[0],
                previewText: postData.attributes.previewText
                        }
            return post;
        })
    }

    const paths = responseData.data.map((post: any) => ({
        params: {id: post.id.toString()}
    }));
    return {
        paths: paths,
        fallback: false
    };    

}

interface PostProps {
    post: Post
  }
  
  export const getStaticProps : GetStaticProps<PostProps, Paths> = async (context) => {
    let author : Author = {
        firstname: "John",
                        lastname: "Doe",
                        email: "johndoe@example.com",
                        shortBio: "Author of multiple best selling novels",
                        posts:[]
    }
      const response =await fetch (`http://localhost:1337/api/posts/${context.params?.id}`, {
        headers: {
            Authorization:`Bearer ${APIToken}`
        }
    });
    const responseData =  await response.json();
    const post : Post = {
        title: responseData.data.attributes.title,
        content: responseData.data.attributes.content,
        author: author,
        previewText: responseData.data.attributes.previewText
        }
    return {
        props: {
            post: post
        },
    };    
  
  };
  

export default function BlogPage({post} : PostProps){
    return (
        <>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h1>{post.title}</h1>
                <div  dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }} style={{width:"750px"}}/>
            </div>
        </>
    );
}