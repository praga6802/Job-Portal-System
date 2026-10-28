import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    };

    return (
        <>
            <aside className="min-h-screen m-0 bg-blue-950 w-50 text-white flex flex-col justify-between ">
                <div>
                    <div className="p-3">
                        <h5 className="mt-2 text-center text-xl text-sm text-blue-400 font-bold">
                            ADMIN PANEL
                        </h5>
                    </div>

                    <div className="sidebar">
                        <ul className="bg-black p-4 w-full">
                            <li className="sidebar-link">
                                <Link to="/admin/dashboard">
                                    <i className="fa-solid fa-border-all !text-blue-500 bg-blue-50 border border-2 border-blue-200"></i>
                                    Dashboard
                                </Link>
                            </li>

                            <li className="sidebar-link">
                                <Link to="/admin/companies">
                                    <i className="fa-regular fa-building !text-red-500 bg-red-50 border border-2 border-red-200"></i>
                                    Companies
                                </Link>
                            </li>

                            <li className="sidebar-link">
                                <Link to="/admin/candidates">
                                    <i className="fa-solid fa-users !text-green-500 bg-green-50 border border-2 border-green-200"></i>
                                    Candidates
                                </Link>
                            </li>

                            <li className="sidebar-link">
                                <Link to="/admin/admins">
                                    <i className="fa-solid fa-user-tie !text-green-500 bg-green-50 border border-2 border-green-200"></i>
                                    Admins
                                </Link>
                            </li>

                            <li className="sidebar-link">
                                <Link to="/admin/manage-jobs">
                                    <i className="fa-solid fa-briefcase !text-yellow-500 bg-yellow-50 border border-2 border-yellow-200"></i>{" "}
                                    Manage Jobs
                                </Link>
                            </li>

                            <li className="sidebar-link">
                                <Link to="/admin/profile">
                                    <i className="fa-solid fa-gear !text-black bg-blue-50 border border-2"></i>{" "}
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center items-center mr-10 mb-4 hover:text-yellow-400">
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Logout <i className="fa-solid fa-power-off"></i>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
