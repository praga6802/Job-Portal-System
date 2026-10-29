import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";

const CompanySidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    };

    const isActive = ({ isActive }) => (isActive ? "active" : "");

    return (
        <>
            <aside className="min-h-screen m-0 bg-blue-950 w-50 text-white flex flex-col justify-between ">
                <div>
                    <div className="p-3">
                        <h5 className="mt-2 text-center text-xl text-sm text-blue-400 font-bold">
                            COMPANY PANEL
                        </h5>
                    </div>

                    <div className="sidebar">
                        <ul className="bg-black p-4 w-full">
                            <li className="sidebar-link">
                                <NavLink
                                    to="/company/dashboard"
                                    className={isActive}
                                >
                                    <i className="fa-solid fa-border-all !text-blue-500 bg-blue-50 border border-2 border-blue-200"></i>
                                    Dashboard
                                </NavLink>
                            </li>

                            <li className="sidebar-link">
                                <NavLink
                                    to="/company/profile"
                                    className={isActive}
                                >
                                    <i className="fa-regular fa-building !text-green-500 bg-green-50 border border-2 border-green-600"></i>
                                    Company Profile
                                </NavLink>
                            </li>

                            <li className="sidebar-link">
                                <NavLink
                                    to="/company/post-job"
                                    className={isActive}
                                >
                                    <i className="fa-solid fa-circle-plus !text-yellow-500 bg-yellow-50 border border-2 border-yellow-200"></i>{" "}
                                    Post Job
                                </NavLink>
                            </li>

                            <li className="sidebar-link">
                                <NavLink
                                    to="/company/manage-jobs"
                                    className={isActive}
                                >
                                    <i className="fa-solid fa-chart-gantt !text-orange-500 bg-orange-50 border border-2 border-orange-200"></i>{" "}
                                    Manage Jobs
                                </NavLink>
                            </li>

                            <li className="sidebar-link">
                                <NavLink
                                    to="/company/manage-applicants"
                                    className={isActive}
                                >
                                    <i className="fa-solid fa-users !text-green-500 bg-green-50 border border-2 border-green-600"></i>{" "}
                                    Applicants
                                </NavLink>
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

export default CompanySidebar;
