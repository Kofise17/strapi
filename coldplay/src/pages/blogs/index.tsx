import axios from "axios";
import { Marked } from "marked";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";

const APIToken = process.env.TOKEN

interface PostsProps{
    posts: Post[]
}

export const getStaticProps : GetStaticProps<PostsProps> = async () => {

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
    return {
        props: {
            posts: posts
        },
    };    

};

export default function BlogsPage({posts}: { posts: Post[] }){
  posts = posts.reverse();
    return (
    <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1>All our available posts</h1>
        <p>Click on the posts' title to read the full post</p>
      </div>
      <div style={{display:"flex"}}>
          <ul style={{columnCount:"3", padding:"5px 15px 5px 15px"}}>
          {
            posts.map((post, index) => (
              <li key={index} style={{ listStyleType:"none", display:"inline"}}>
                <Link href={"/blogs/" + (index + 7)} style={{textDecoration:"none"}}>
                  <button style={{padding:"0px 50px 0px 50px" , display:"flex", flexDirection:"column", backgroundColor:"white", borderColor:"black", borderRadius:"5px",height:"300px"}}>
                    <Link href={"/blogs/" + (index + 7)} style={{textDecoration:"none", color:"black"}}><h1>{post.title}</h1></Link>
                    <p>{post.previewText}</p>
                    <p><i>{post.author.firstname} {post.author.lastname}</i></p>
                  </button>
                  <br />
                  </Link>
              </li>
            ))
          }        
          </ul>
      </div>
    </>
    );
};

