import React, {useContext, useEffect, useState} from "react";
import { supabase } from "../client";
import Post from "./Post";
import "../App.css";
import { SearchContext } from "../../routes/Layout";

const Feed = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const searchData = useContext(SearchContext);

    useEffect(()=>{
      const fetchFeed = async() => {
        const {data} = await supabase.from("AnimeForums").select().order(props.filterBy, {ascending: props.ascending});
        setPosts(data);
      }
  
      fetchFeed();
    }, [props]);

    useEffect(() => {
      console.log(searchData.searchInput);
      if(searchData.searchInput != ""){
        if(posts && posts.length > 0){
          if(posts.filter((post) => post.title.includes(searchData.searchInput)) != []){
            console.log("this is it", posts.filter((post) => post.title.includes(searchData.searchInput)));
            setSearchResults(posts.filter((post) => post.title.includes(searchData.searchInput)));
          }else{
            setNoResults(true);
          }
        }
      }
    }, [searchData.searchInput]);
  
    return (
        <div className='posts'>
          <div className="feed">
             {posts && posts.length > 0 ? 
              posts.map((post)=>
              <Post key={post.id} id={post.id} title={post.title} author={post.author}
              timestamp={post.created_at} img={post.img} upvotes={post.upvotes}/>) : <h2>No posts yet 😞</h2>
          }
          </div>
          {/* <div className="search-results">
              {searchResults && searchResults.length > 0 ? searchResults.map((post) => {
              <Post key={post.id} id={post.id} title={post.title} author={post.author}
              timestamp={post.created_at} img={post.img} upvotes={post.upvotes}/>
              }) : <h2>No results for {searchData.searchInput} 😞</h2>}
          </div> */}
        </div>
    )
}

export default Feed;