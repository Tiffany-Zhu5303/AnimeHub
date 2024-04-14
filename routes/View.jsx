import React, {useState, useEffect} from "react";
import "./View.css"
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";

const View = () => {
    const {id} = useParams();
    const [post, setPost] = useState({created_by:"", title:"", author:"", upvotes:"", img:"", content:"", comments:[]});

    useEffect(() => {
        const fetchPost = async() => {
            const {data} = await supabase.from('AnimeForums').select().eq("id", id);
            setPost(data[0]);
        }

        fetchPost();

    }, []);

    return(
        <div className="post-detail">
            <h4>Posted {post.created_by}</h4>
            <h4>By: {post.author}</h4>
            <h4>{post.upvotes} upvotes</h4> 

            <div className="content">
                <h2 id="post-title">{post.title}</h2>
                <br/>
                <img src={post.img}/>
                <br/>
                <h3 id="post-content">{post.content}</h3>
                <br/>
            </div>
            
            <div className="comment-section">
                <h4>Comments: </h4> 
                {post.comments ? (
                    <div className="all-comments">

                    </div>
                ):(<p>No comments yet!</p>)}
                <form className="leave comment">

                </form>
            </div>
        </div>
    );
};

export default View;