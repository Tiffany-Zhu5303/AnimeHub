import React, {useEffect, useState} from "react";
import { supabase } from "../client";
import Post from "./Post";
import "../App.css";

const Feed = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
      const fetchFeed = async() => {
        const {data} = await supabase.from("AnimeForums").select().order('created_at', {ascending: false});
        setPosts(data);
      }
  
      fetchFeed();
    }, [props])
  
    return (
        <div className='posts'>
            {
            posts && posts.length > 0 ?
            posts.map((posts)=>
            <Post key={posts.id} id={posts.id} title={posts.title} author={posts.author}
            timestamp={posts.created_at} img={posts.img} upvotes={posts.upvotes}/>) : <h2>No posts yet 😞</h2>
            }
        </div>
    )
}

export default Feed;