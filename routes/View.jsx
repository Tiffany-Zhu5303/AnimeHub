import React, {useState, useEffect} from "react";
import "./View.css"
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const View = () => {
    const {id} = useParams();
    const [count, setCount] = useState(0);
    const [post, setPost] = useState({id:-1, created_by:"", title:"", author:"", upvotes:"", img:"", content:"", upvotes:0, comments:[]});

    useEffect(() => {
        const fetchPost = async() => {
            const {data} = await supabase.from('AnimeForums').select().eq("id", id);
            setPost(data[0]);
            setCount(data[0].upvotes);
        }

        fetchPost();

    }, []);

    const upvote = async() => {
        await supabase.from("AnimeForums")
        .update({
            upvotes: count+1
        }).eq("id", id);
        setCount(count+1);
    }

    const deletePost = async(event) => {
        event.preventDefault();

        await supabase.from('AnimeForums').delete().eq('id', id);
        window.location = "/";
    }

    return(
        <div className="post-detail">
            <div className="info">
                <div className="displayed-info">
                    <h4>Posted {post.created_by}</h4>
                    <h4>By: {post.author}</h4>
                    {count === 1 ? <h4>{count} upvote</h4> : <h4>{count} upvotes</h4>}  
                </div>
                <div className="post-editing">
                    <Link to={"/edit/"+post.id}><img id="edit-icon" className="icons" src="../src/assets/edit-icon.png" /></Link>
                    <img id="delete-icon" className="icons" src="../src/assets/delete-icon.png" onClick={deletePost}/>
                </div>
            </div>
            

            <div className="content">
                <h2 id="post-title">{post.title}</h2>
                <br/>
                <img src={post.img}/>
                <br/>
                <h3 id="post-content">{post.content}</h3>
                <br/>
            </div>

            <button onClick={upvote}>Upvote!</button>
            
            <div className="comment-section">
                <h4>Comments: </h4> 
                {post.comments ? (
                    <div className="all-comments">

                    </div>
                ):(<p>No comments yet!</p>)}
                <form className="makeComment">

                </form>
            </div>
        </div>
    );
};

export default View;