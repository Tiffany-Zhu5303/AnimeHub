import React, {useState} from "react";
import "./Create.css";
import { supabase } from "../src/client";

const Create = () => {
    const [post, setPost] = useState({title:"", author:"", content:"", img:""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return{
                ...prev, [name]:value
            }
        });
    }

    const createPost = async(event) => {
        event.preventDefault();

        await supabase.from("AnimeForums").insert({
            title: post.title,
            author: post.author,
            content: post.content,
            img:post.img
        }).select();

        window.location = "/";
    }

    return(
        <div className="form-page">
            <h1>Create a new post!</h1>
            <form className="create-form">
                <input type="text" className="create-input" id="title" name="title" placeholder="Title" onChange={handleChange}></input>
                <br/>
                <input type="text" id="author" className="create-input" name="author" placeholder="Your Name" onChange={handleChange}></input>
                <br/>
                <textarea id="content" className="create-input" name="content" placeholder="Content (optional)" onChange={handleChange}></textarea>
                <br/>
                <input type="text" id="img-url" className="create-input" name="img" placeholder="ImageURL (optional)" onChange={handleChange}></input>
                <br/>
                <button onClick={createPost}>Create Post</button>
            </form>
        </div>
    );
};

export default Create;