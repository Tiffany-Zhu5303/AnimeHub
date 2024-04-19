import React, { useState, createContext } from "react";
import { Link, Outlet } from "react-router-dom";

export const SearchContext = createContext(undefined);

const Layout = () => {
    const [searchInput, setSearchInput] = useState("");
    const sendSearch = (e) => {
        if(e.key == "Enter"){
            setSearchInput(e.target.value);
        }
    }

    const clearSearch = () => {
        setSearchInput("");
    }

    return(
        <div className="home">
            <SearchContext.Provider value={{searchInput}}>
                <nav className="nav">
                    <h2 id="page-title">Animehub</h2>
                    <input id="search" placeholder="Search Title..." onKeyDown={sendSearch}></input>
                    <div className="links">
                        <Link className="nav-link" to="/" onClick={clearSearch}>Home</Link>
                        <Link className="nav-link" to="/create">Create</Link>
                    </div>
                </nav>
                <Outlet />
            </SearchContext.Provider>
        </div>
    );
};

export default Layout;