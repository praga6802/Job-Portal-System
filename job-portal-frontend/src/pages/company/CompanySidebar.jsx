import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../styles/company-sidebar.css";

const CompanySidebar = () => {
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
                            COMPANY PANEL
                        </h5>

                    </div>

                    <div className="company-sidebar">
                        <ul className="bg-black p-4 w-full">
                            <li className="company-sidebar-link">
                                <Link to="/company/dashboard">
                                    <i className="fa-solid fa-border-all"></i>
                                    Dashboard
                                </Link>
                            </li>

                            <li className="company-sidebar-link">
                                <Link to="/company/profile">
                                    <i className="fa-regular fa-building"></i>
                                    Company Profile
                                </Link>
                            </li>

                            <li className="company-sidebar-link">
                                <Link to="/company/post-job">
                                    <i className="fa-solid fa-circle-plus"></i>{" "}
                                    Post Job
                                </Link>
                            </li>

                            <li className="company-sidebar-link">
                                <Link to="/company/manage-jobs">
                                    <i className="fa-solid fa-chart-gantt"></i>{" "}
                                    Manage Jobs
                                </Link>
                            </li>

                            <li className="company-sidebar-link">
                                <Link to="/company/applicants">
                                    <i className="fa-solid fa-user"></i>{" "}
                                    Applicants
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
                        Logout <i className="fa-solid fa-power-off"></i>{" "}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default CompanySidebar;
