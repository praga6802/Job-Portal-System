import React, { useState, useEffect } from "react";
import CompanySidebar from "./CompanySidebar";
import { Link } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";
import axiosInstance from "../../services/api.js";
const ManageJobs = () => {
    const [company, setCompany] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [jobCount, setJobCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [expiredCount, setExpiredCount] = useState(0);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/company/current",
                );
                console.log(response);

                setCompany(response.data.data);
            } catch (err) {
                const status = err.response?.status;
                if (status === 401) {
                    setMessage("Session Expired. Please login again.");
                } else if (status === 403) {
                    setMessage(
                        "Access Denied. Please check your login and permissions.",
                    );
                } else {
                    setMessage(
                        "Unable to fetch company details. Please try again.",
                    );
                }
                console.error("Company fetch error:", err);
                console.error("Error message:", err.message);
                console.error("Response data:", err.response?.data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCompany();
    }, []);

    useEffect(() => {
        const totalJobs = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/company/job-count",
                );
                setJobCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                const status = err.response?.status;
                if (status === 401) {
                    setMessage("Session Expired. Please login again.");
                } else if (status === 403) {
                    setMessage(
                        "Access Denied. Please check your login and permissions.",
                    );
                } else {
                    setMessage(
                        "Unable to fetch company details. Please try again.",
                    );
                }
                console.error("Company fetch error:", err);
                console.error("Error message:", err.message);
                console.error("Response data:", err.response?.data);
            } finally {
                setIsLoading(false);
            }
        };
        totalJobs();
    }, []);

    const cardStyle =
        "border border-2 border-gray-200 p-6 w-50 rounded-xl flex items-center flex-col justify-center";

    const cardHead = "font-bold text-xl";
    const cardCount = "font-bold text-4xl";

    const status = "rounded-xl bg-black py-1 px-2 text-white";

    return (
        <div className="flex justify-between min-h-screen">
            {isLoading ? (
                <p>Fetching Company Details...</p>
            ) : message ? (
                <p className="m-5 h-fit w-fit mx-auto p-2 rounded-lg text-center border border-1 border-red-500 text-red-600 font-semibold">
                    {message}
                </p>
            ) : company ? (
                <>
                    <div className="m-1 rounded-lg w-full bg-white">
                        <div className="flex justify-between p-5 bg-blue-950 m-2 rounded-xl items-center">
                            <div>
                                <h1 className="font-bold text-2xl text-yellow-500">
                                    Manage Jobs
                                </h1>
                                <h5 className="font-semibold text-blue-100 ">
                                    Manage and track your job listings!
                                </h5>
                            </div>

                            <div>
                                <Link
                                    to="/company/post-job"
                                    className="border border-3 border-green-600 text-green-500 bg-green-50 font-bold p-3 rounded-lg hover:bg-green-600 hover:text-white"
                                >
                                    <i className="fa-solid fa-circle-plus"></i>{" "}
                                    Post New Job
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-around bg-white border border-1 border-gray-300 rounded-xl mt-2 mx-3 p-5">
                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-blue-400">
                                        <i className="fa-solid fa-suitcase"></i>
                                    </p>
                                    <h2 className={cardHead}>Jobs</h2>
                                </div>
                                <h4 className={`${cardCount} text-blue-500`}>
                                    {jobCount}
                                </h4>
                            </div>

                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-green-500">
                                        <i
                                            className="fa fa-check"
                                            aria-hidden="true"
                                        ></i>
                                    </p>
                                    <h2 className={cardHead}>Active</h2>
                                </div>
                                <h4 className={`${cardCount} text-green-500`}>
                                    {activeCount}
                                </h4>
                            </div>

                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-red-500">
                                        <i className="fa-solid fa-xmark"></i>
                                    </p>
                                    <h2 className={cardHead}>Expired</h2>
                                </div>
                                <h4 className={`${cardCount} text-red-500`}>
                                    {expiredCount}
                                </h4>
                            </div>
                        </div>

                        <div className="flex gap-5 mt-5 ms-5">
                            <div className={status}>
                                <Link to="/company/jobs">All</Link>
                            </div>
                            <div className={status}>
                                <Link to="/company/jobs">Active</Link>
                            </div>
                            <div className={status}>
                                <Link to="/company/jobs">Expired</Link>
                            </div>
                        </div>

                        {/* job list */}
                        <div className="card-container m-5">
                            <div className="job-card border border-gray-500 rounded-lg">
                                <div className="flex justify-between mx-auto p-10 rounded-lg">
                                    <div className="flex  gap-3 items-start">
                                        <p className="mt-2 text-xl">
                                            <i className="fa-solid fa-suitcase"></i>
                                        </p>
                                        <div>
                                            <h1 className="font-bold text-lg">
                                                Java Full Stack Developer
                                            </h1>
                                            <h4 className="font-semibold ">
                                                Full-time - Chennai
                                            </h4>
                                            <div className="flex gap-2 items-center mt-1">
                                                <p className="bg-green-100 px-2 py-0 border border-1 border-green-100 rounded-lg text-green-600">
                                                    Active
                                                </p>
                                                <h4 className="text-slate-500">
                                                    28 applicants
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to="/company/update-job">
                                            <div className="font-semibold text-blue-500 border border-1 border-blue-300 px-3 py-1 rounded-lg">
                                                <i className="fa-solid fa-pen-to-square"></i>{" "}
                                                Edit
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 bg-gray-100 p-2 rounded-lg">
                                    <div className="bg-green-50 border border-1 border-green-400 text-green-600 p-1 rounded-lg">
                                        <Link to="/company/jobs">
                                            View Details
                                        </Link>
                                    </div>
                                    <div className="bg-red-50 border border-1 border-red-400 text-red-600 p-1 rounded-lg">
                                        <Link to="/company/deleteJob">
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ManageJobs;
