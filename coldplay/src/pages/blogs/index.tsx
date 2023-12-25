import axios from "axios";
import { Marked } from "marked";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const marked = new Marked();
const APIToken = "5fd0008e632b90a8105c8a1dba55dd9f62da211212eb8db32bceebe5e7622b94deedf06130e968b6d9cce98c1b3168dfc63ff5338bfabe57738c7e93d4be18e063af053e830ded1d7bf5fc95a68edb0af5fe0036a7cef3fdf7cc649cafabd84af0d9a4f6fc51f333e0a2bd7cff992a70bad90255cbb523702efdce8349196c4a";

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
        <h1>Dit is de blogpagina</h1>
        <ul style={{display: "flex", justifyContent:"space-around", alignItems:"center", alignContent:"center"}}>
        {
          posts.map((post, index) => (
            <Link href={"/blogs/" + index} key={index}>
                <button style={{padding:"50px"}}>
                <h2>{post.title}</h2>
                <p><i>{post.author.firstname} {post.author.lastname}</i></p>
                </button>
            </Link>
          ))
        }        
        </ul>
    </>
    );
};

//0764aee47b380022a6bab0b4170bcc4a7e461205062b6fcebf044bf2d4bbc2f1e90e4801dcc032735bbbba43016bd27c0cfad835cd10144948a0f6c6d0b6ffbfe7061bca0542fe2d6ccc05d46b30a2e0bbef40d92ae405818ae7bbe68be481fdd21ad2d557c6ab9256df3c6bdc7ed4ac669e00d2cc7097105fce9dc3e54cd63a 