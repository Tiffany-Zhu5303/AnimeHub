import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    const sendSearch = (e) => {
        if(e.key == "Enter"){
            console.log(e.target.value);
        }
        
    }

    return(
        <div className="home">
            <nav className="nav">
                <h2 id="page-title">Animehub</h2>
                <input id="search" placeholder="Search Title..." onKeyDown={sendSearch}></input>
                <div className="links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/create">Create</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;