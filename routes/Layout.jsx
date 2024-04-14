import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <div className="main-page">
            <nav className="nav">
                <h2 id="page-title">Animehub</h2>
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