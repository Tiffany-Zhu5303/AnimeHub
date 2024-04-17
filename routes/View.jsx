import React, {useState, useEffect} from "react";
import "./View.css"
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const View = () => {
    const {id} = useParams();
    const [count, setCount] = useState(0);
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({id:-1, created_by:"", title:"", author:"", upvotes:0, img:"", content:"", comments:[]});

    useEffect(() => {
        const fetchPost = async() => {
            const {data} = await supabase.from('AnimeForums').select().eq("id", id);
            setPost(data[0]);
            setCount(data[0].upvotes);
        }

        fetchPost();

    }, []);

    const handleComment = (event) => {
        const {name, value} = event.target;
        console.log(comments);
        console.log(name, value);
        setComments((prev) => {
            return{
                ...prev, [name]:value
            }
        });
    }

    const upvote = async() => {
        await supabase.from("AnimeForums")
        .update({
            upvotes: count+1
        }).eq("id", id);
        setCount(count+1);
    }

    const comment = async() => {
        console.log(comments)
        await supabase.from("AnimeForums")
        .update({
            comments: ([...post.comments, {
                ["user"]: comments.user,
                ["comment"]: comments.comment,
            }])
        }).eq("id", id);
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
                <img id="post-image" src={post.img}/>
                <br/>
                <h3 id="post-content">{post.content}</h3>
                <p></p>
                <br/>
                <button onClick={upvote}>Upvote!</button>
            </div>
            
            <div className="comment-section">
                <h4>Comments: </h4> 
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => <p key={comment.user} className="comment-display">- {comment.user}: {comment.comment}</p>)
                ):(<p>No comments yet!</p>)}
                <br/>
                <form className="makeComment">
                    <input type="text" className="comment-input" id="user-comment" name="user" placeholder="Name" onChange={handleComment}></input>
                    <br/>
                    <textarea id="new-comment" name="comment" placeholder="Leave a comment..." onChange={handleComment}></textarea>
                    <button onClick={comment}>Comment</button>
                </form>
            </div>
        </div>
    );
};

export default View;