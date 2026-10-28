import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/candidate/current",
                );

                setCandidate(response.data.data);
                console.log(response.data);
            } catch (error) {
                setCandidate(null);
            }
        };
        fetchCandidate();
    }, []);

    return (
        <nav className="relative flex items-center bg-blue-950 px-8 py-4 text-white">
            <Link to="/" className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="Company Logo"
                    className="h-10 w-10 object-contain"
                />
                <span className="text-xl font-bold hover:text-yellow-500">
                    Job Portal
                </span>
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

            <div className="ml-auto">
                {candidate ? (
                    <select defaultValue="hello"
                        onChange={(e) => {
                            const value = e.target.value;

                            if (value === "profile") {
                                navigate("/candidate/profile");
                            } else if (value === "logout") {
                                handleLogout();
                            }

                            e.target.value = "hello";
                        }}
                        className="cursor-pointer rounded-lg border-2 border-yellow-400 bg-blue-950 px-3 py-2 font-semibold text-yellow-400 outline-none"
                    >
                        <option value="hello">
                            Hello, {candidate.firstname}
                        </option>
                        <option value="profile">Candidate Profile</option>
                        <option value="logout">Logout</option>
                    </select>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/candidate/signup"
                            className="rounded-lg border-2 border-green-400 p-2 text-green-400"
                        >
                            SignUp
                        </Link>
                        <Link
                            to="/login"
                            className="rounded-lg border-2 border-yellow-400 p-2 text-yellow-400"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
