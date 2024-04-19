import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './client'
import Feed from './components/Feed'

function App() {
  const [filter, setFilter] = useState("created_at");
  const [ascending, setAscending] = useState(true);

  const newestPosts = () => {
    setFilter("created_at");
    setAscending(false);
  }

  const mostPopularPosts = () => {
    setFilter("upvotes");
    setAscending(false);
  }

  return (
    <div className='main-page'>
      <div className='filters'>
        <h3>Order by: </h3>
        <button className='filter-buttons' onClick={newestPosts}>Newest</button>
        <button className='filter-buttons' onClick={mostPopularPosts}>Most Popular</button>
      </div>
      <Feed filterBy={filter} ascending={ascending} />
      <br/>
    </div>
  )
}

export default App
