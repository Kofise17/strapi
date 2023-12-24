import axios from "axios";
import { Marked } from "marked";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const marked = new Marked();
const APIToken = "cff29613ffc48c09f6469828c6cdad8349d8600a8bbffa822a1b253941189f487262732256ed0321a8b89a42d35ea57f3464ad58fc2b974eac3e99d7ff5ebc7442862cbb66da374196e939d719360256042976b664516437c8d6626cd40bc13b419b19e3f58874c656a04288069e8af24098340fe3492a339cbf413d17d926d2";

interface PostsProps{
    posts: Post[]
}

export const getServerSideProps : GetServerSideProps<PostsProps> = async () => {

    try {
        const response = await fetch("http://localhost:1337/api/posts?populate=*", {
            headers: {
                Authorization: `Bearer ${APIToken}`,
            },
        });
    
        const responseData =  await response.json();
        const posts: Post[] = responseData.data.map((post: any) => post.attributes)
        console.log("Posts:", posts);
        return {
            props: {
                posts: Array.isArray(posts) ? posts : []
            },
        };    
    } catch (error) {
        console.error("Error fetching posts:", error);

        return{
            props: {
                posts: [],
            }
        }
    }

};

export default function BlogsPage({posts}: { posts: Post[] }){
    console.log("posts length",posts.length)
    return (
    <>
        <h1>Dit is de blogpagina</h1>
        <ul>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Link href={"/blogs/" + index} key={index}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.author.firstname}</p>
              {/* Accessing author properties */}
              {/* Adjust 'name' based on the property of the 'Author' interface */}
            </Link>
          ))
        ) : (
          <li>No posts available</li>
        )}        </ul>
    </>
    );
};

//0764aee47b380022a6bab0b4170bcc4a7e461205062b6fcebf044bf2d4bbc2f1e90e4801dcc032735bbbba43016bd27c0cfad835cd10144948a0f6c6d0b6ffbfe7061bca0542fe2d6ccc05d46b30a2e0bbef40d92ae405818ae7bbe68be481fdd21ad2d557c6ab9256df3c6bdc7ed4ac669e00d2cc7097105fce9dc3e54cd63a 