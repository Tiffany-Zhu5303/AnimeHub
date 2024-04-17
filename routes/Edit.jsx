import React, {useEffect, useState} from "react";
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";

const Edit = () => {
    const {id} = useParams();
    const [post, setPost] = useState({title:"", author:"", content:"", img:""});

    useEffect(() => {
        const fetchPost = async() => {
            const {data} = await supabase.from('AnimeForums').select().eq("id", id);
            setPost(data[0]);
        }

        fetchPost();
        console.log(post);

    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value);
        setPost((prev) => {
            return{
                ...prev, [name]:value
            }
        });
    }

    const editPost = async(event) => {
        event.preventDefault();
        console.log(post)

        await supabase.from("AnimeForums").update({
            title: post.title,
            author: post.author,
            content: post.content,
            img:post.img
        }).eq("id", id);

        window.location = "/"
    }

    return(
        <div className="form-page">
            <h1>Edit this post!</h1>
            <form className="create-form">
                <input type="text" className="create-input" id="title" name="title" placeholder="Title" value={post.title} onChange={handleChange}></input>
                <br/>
                <input type="text" id="author" className="create-input" name="author" placeholder="Author" value={post.author} onChange={handleChange}></input>
                <br/>
                <textarea id="content" className="create-input" name="content" placeholder="Content (optional)" value={post.content} onChange={handleChange}></textarea>
                <br/>
                <input type="text" id="img-url" className="create-input" name="img" placeholder="ImageURL (optional)" value={post.img} onChange={handleChange}></input>
                <br/>
                <button onClick={editPost}>Edit Post</button>
            </form>
        </div>
    );
};

export default Edit;