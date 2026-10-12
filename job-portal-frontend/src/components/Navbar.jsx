import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <nav className="relative flex items-center bg-blue-950 px-8 py-4 text-white">
            <Link to="/" className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="Company Logo"
                    className="h-10 w-10 object-contain"
                />
                <span className="text-xl font-bold hover:text-yellow-500">Job Portal</span>
            </Link>

            <ul className="absolute left-1/2 flex -translate-x-1/2 list-none items-center gap-20 font-bold">
                <li>
                    <Link to="/" className="hover:text-yellow-400">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/jobs" className="hover:text-yellow-400">
                        Jobs
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-yellow-400">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:text-yellow-400">
                        Contact
                    </Link>
                </li>
            </ul>
            <div className="flex ml-auto gap-4 items-center font-normal">
                <Link
                    to="/candidate/signup"
                    className="text-green-400 border border-2 rounded-lg p-2"
                >
                    SignUp
                </Link>
                <Link
                    to="/login"
                    className="text-yellow-400 border border-2 rounded-lg p-2"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
