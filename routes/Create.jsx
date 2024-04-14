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
            <form>
                <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange}></input>
                <br/>
                <input type="text" id="author" name="author" placeholder="Your Name" onChange={handleChange}></input>
                <br/>
                <input type="text" id="content" name="content" placeholder="Content (optional)" onChange={handleChange}></input>
                <br/>
                <input type="text" id="img-url" name="img" placeholder="ImageURL (optional" onChange={handleChange}></input>
                <br/>
                <button onClick={createPost}>Create Post</button>
            </form>
        </div>
    );
};

export default Create;