import "./NavbarStyles.css"
import React, { useState } from 'react'
import { Link } from "react-router-dom"


const Navbar = () => {

    const [click, setClick] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="header">
            <Link to='/'>
                <img src='Logo' alt="Logo.jpg" />
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to='/home'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/blog'>
                        Blog
                    </Link>
                </li>
                <li>
                    <Link to='/aboutus'>
                        About Us
                    </Link>
                </li>
                <li onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
                    <Link to='/'>
                        All About Me
                    </Link>
                    {showDropdown && (
                        <ul className="dropdown-menu">
                            <li>
                                <Link to='/profile'>
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to='/myevents'>
                                    My Events
                                </Link>
                            </li>
                            <li>
                                <Link to='/mycourses'>
                                    My Courses
                                </Link>
                            </li>
                            <li>
                                <Link to='/bot'>
                                    Choose STEM Field
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default Navbar
