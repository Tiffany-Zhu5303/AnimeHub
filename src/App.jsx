import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './client'
import Feed from './components/Feed'

function App(props) {
  return (
    <div className='main-page'>
      <div className='filters'>
        <h3>Order by: </h3>
      </div>
      <Feed />
      <br/>
    </div>
  )
}

export default App
