import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Layout from '../routes/Layout.jsx'
import Create from '../routes/Create.jsx'
import View from '../routes/View.jsx'
import Edit from '../routes/Edit.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} element={<App />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
