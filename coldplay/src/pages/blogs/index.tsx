import axios from "axios";
import { Marked } from "marked";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const marked = new Marked();
const APIToken = "b81151201d993dddbf9512fdfe513f490ecdf816a51175fb7a8f30a2a1ac55eadc6562c528e9fd6f00bf7a736e86c9a7ceb95c7f7259bacd373cb87866f1e06542c8021de8711c440e0dc43a2401c949b4b93064eb8d25ff43c7ad7c05625d75ce5d67926207cf03ad8b7156ad74f85ed37bd657a8cc7d81f2913eafc7f60673";

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
  
    console.log("Posts:", posts);
    return {
        props: {
            posts: Array.isArray(posts) ? posts : []
        },
    };    

};

export default function BlogsPage({posts}: { posts: Post[] }){
    console.log("posts length",posts.length)
    return (
    <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1>Al onze beschikbare posts</h1>
        <p>Klik op de titels van de post en je kan de volledige post bekijken</p>
      </div>
      <div>
          <ul style={{display: "flex", justifyContent:"space-around", alignItems:"center", alignContent:"center"}}>
          {
            posts.map((post, index) => (
              <div key={index} style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                  <button style={{padding:"0px 50px 0px 50px" , display:"flex", flexDirection:"column"}}>
                    <Link href={"/blogs/" + index}><h1>{post.title}</h1></Link>
                    <p><i>{post.author.firstname} {post.author.lastname}</i></p>
                  </button>
              </div>
            ))
          }        
          </ul>
      </div>
    </>
    );
};

//0764aee47b380022a6bab0b4170bcc4a7e461205062b6fcebf044bf2d4bbc2f1e90e4801dcc032735bbbba43016bd27c0cfad835cd10144948a0f6c6d0b6ffbfe7061bca0542fe2d6ccc05d46b30a2e0bbef40d92ae405818ae7bbe68be481fdd21ad2d557c6ab9256df3c6bdc7ed4ac669e00d2cc7097105fce9dc3e54cd63a 