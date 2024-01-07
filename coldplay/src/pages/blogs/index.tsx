import axios from "axios";
import { Marked } from "marked";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";

const APIToken = process.env.TOKEN

interface PostsProps{
    posts: Post[]
}

export const getServerSideProps : GetServerSideProps<PostsProps> = async () => {

    const response = await fetch("http://localhost:1337/api/posts?populate=*", {
        headers: {
            Authorization: `Bearer ${APIToken}`,
        },
    });
    
    const responseData =  await response.json();
    const posts: Post[] = responseData.data.map((post: any) => post.attributes)
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
 
    return {
        props: {
            posts: Array.isArray(posts) ? posts : []
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
                <Link href={"/blogs/" + index} style={{textDecoration:"none"}}>
                  <button style={{padding:"0px 50px 0px 50px" , display:"flex", flexDirection:"column", backgroundColor:"white", borderColor:"black", borderRadius:"5px",height:"300px"}}>
                    <Link href={"/blogs/" + index} style={{textDecoration:"none", color:"black"}}><h1>{post.title}</h1></Link>
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

//0764aee47b380022a6bab0b4170bcc4a7e461205062b6fcebf044bf2d4bbc2f1e90e4801dcc032735bbbba43016bd27c0cfad835cd10144948a0f6c6d0b6ffbfe7061bca0542fe2d6ccc05d46b30a2e0bbef40d92ae405818ae7bbe68be481fdd21ad2d557c6ab9256df3c6bdc7ed4ac669e00d2cc7097105fce9dc3e54cd63a 