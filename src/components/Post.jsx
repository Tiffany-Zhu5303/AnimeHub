import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = (props) => {
    return(
        <Link to={"/view/"+props.id}>
            <div className="post">
                <div className="post-info">
                    <p>Posted {props.timestamp}</p>
                    <h2>{props.title}</h2>
                    <p>By: {props.author}</p>
                    <p>{props.upvotes} upvotes</p> 
                </div>
                <img className="view-image" src={props.img} />
            </div>
        </Link>
    );
};

export default Post;