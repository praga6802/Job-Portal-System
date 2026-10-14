import React, { useState, useEffect } from "react";
import CompanySidebar from "./CompanySidebar";
import { Link } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";

const ManageJobs = () => {
    const [company, setCompany] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/company/current",
                );
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
                console.error(
                    "Company fetch error",
                    err.response?.data?.message,
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchCompany();
    }, []);

    const cardStyle =
        "border border-2 border-gray-200 p-6 w-50 rounded-xl flex items-center flex-col justify-center";

    const cardHead = "font-bold text-lg";
    const cardCount = "font-bold text-2xl";

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
                    <CompanySidebar />

                    <div className="mt-3 w-full">
                        <div className="flex justify-between p-5 bg-gray-200 rounded-xl mx-2 items-center">
                            <div>
                                <h1 className="font-bold text-xl">
                                    Manage Jobs
                                </h1>
                                <h5 className="font-semibold text-slate-500">
                                    Manage and track your job listings!
                                </h5>
                            </div>
                            <div>
                                <Link
                                    to="/company/post-job"
                                    className="bg-black text-white font-bold p-3 rounded-lg"
                                >
                                    <i className="fa-solid fa-circle-plus"></i>{" "}
                                    Post New Job
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-around bg-gray-100 mt-2 mx-3 p-5">
                            <div className={cardStyle}>
                                <h2 className={cardHead}>Total Jobs</h2>
                                <h4 className={`${cardCount} text-blue-500`}>
                                    Count
                                </h4>
                            </div>
                            <div className={cardStyle}>
                                <h2 className={cardHead}>Active</h2>
                                <h4 className={`${cardCount} text-green-500`}>
                                    Count
                                </h4>
                            </div>
                            <div className={cardStyle}>
                                <h2 className={cardHead}>Expired</h2>
                                <h4 className={`${cardCount} text-red-500`}>
                                    Count
                                </h4>
                            </div>
                        </div>

                        <div className="flex gap-5 mt-3 ms-5">
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
                                            <i class="fa-solid fa-suitcase"></i>
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
