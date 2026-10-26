import React, { useState, useEffect } from "react";
import CompanySidebar from "./CompanySidebar";
import { Await, Link } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";
import axiosInstance from "../../services/api.js";
const ManageJobs = () => {
    const [company, setCompany] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [jobs, setJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [expiredCount, setExpiredCount] = useState(0);
    const [awaitingReviewJobsCount, setAwaitingReviewJobsCount] = useState(0);

    const tabs = [
        { label: "All Jobs", value: "All" },
        { label: "Active Jobs", value: "Active" },
        { label: "Expired Jobs", value: "Expired" },
        { label: "Awaiting Review Jobs", value: "AwaitingReview" },
    ];

    const fetchJobs = async () => {
        setIsLoading(true);
        setMessage("");

        const endpoints = {
            All: `/auth/company/jobs`,
            Active: `/auth/company/active-jobs`,
            Expired: `/auth/company/expired-jobs`,
            AwaitingReview: `/auth/company/awaiting-review-jobs`,
        };

        try {
            const response = await axiosInstance.get(endpoints[activeTab], {
                withCredentials: true,
            });
            setJobs(response?.data?.data);
            console.log(`${activeTab}`, response?.data?.data);
        } catch (err) {
            setJobs([]);
            setMessage(err?.response?.data?.message || "Failed to fetch Jobs");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [activeTab]);

    // fetch active jobs count
    const fetchActiveCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/active-jobs-count",
            );
            setActiveCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch Active Jobs Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        fetchActiveCount();
    }, []);

    //fetch expired jobs
    const fetchExpiredCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/expired-jobs-count",
            );
            setExpiredCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch Expired Jobs Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        fetchExpiredCount();
    }, []);

    // fetch awaiting review count of jobs
    const fetchAwaitingReviewJobCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/awaiting-review-jobs-count",
            );
            setAwaitingReviewJobsCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch Expired Jobs Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        fetchAwaitingReviewJobCount();
    }, []);

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

    const toggleJob = async (job) => {
        try {
            if (job.active) {
                await axiosInstance.patch(
                    `/auth/company/jobs/deactivate/${job.jobId}`,
                );
                await fetchExpiredCount();
                await fetchActiveCount();
            } else {
                await axiosInstance.patch(
                    `/auth/company/jobs/activate/${job.jobId}`,
                );
                await fetchExpiredCount();
                await fetchActiveCount();
            }
            setJobs((prev) =>
                prev.map((j) =>
                    j.jobId === job.jobId ? { ...j, active: !job.active } : j,
                ),
            );
        } catch (err) {
            console.error(err);
        }
    };

    const cardStyle =
        "border border-2 border-gray-200 p-6 w-fit rounded-xl flex items-center flex-col justify-center";

    const cardHead = "font-bold text-lg";
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
                                    className="text-white font-bold p-3 rounded-lg bg-green-700 hover:text-white hover:bg-green-600"
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

                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-yellow-500">
                                        <i class="fa-regular fa-clock"></i>
                                    </p>
                                    <h2 className={cardHead}>
                                        Awaiting Review
                                    </h2>
                                </div>
                                <h4 className={`${cardCount} text-yellow-500`}>
                                    {awaitingReviewJobsCount}
                                </h4>
                            </div>
                        </div>

                        <div className="flex gap-5 mt-5 ms-5">
                            {tabs.map((tab) => (
                                <button
                                    onClick={() => {
                                        setActiveTab(tab.value);
                                    }}
                                    className={`p-2 font-semibold text-normal rounded-lg cursor-pointer
                                    transition ${
                                        activeTab === tab.value
                                            ? tab.value === "All"
                                                ? "border border-1 text-white bg-black rounded"
                                                : tab.value === "Active"
                                                  ? "border-1 border-green-500 text-green-500 bg-green-50"
                                                  : tab.value === "Expired"
                                                    ? "border-1 border-red-500 text-red-500 bg-red-50"
                                                    : "border-1 border-yellow-500 text-yellow-500 bg-yellow-50"
                                            : "bg-transparent text-slate-400 hover:text-yellow-600"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {message && (
                            <div
                                className="rounded-lg border border-red-400 text-center bg-red-50 font-semibold
                                p-2 text-sm text-red-600"
                            >
                                {message}
                            </div>
                        )}

                        {isLoading ? (
                            <p className="p-8 text-center text-slate-500">
                                Loading jobs...
                            </p>
                        ) : jobs.length === 0 ? (
                            <p
                                className={`p-2 w-fit rounded-lg mx-auto text-center transition mt-3 ${
                                    activeTab === "Active"
                                        ? "border border-green-500 text-green-600"
                                        : activeTab === "Expired"
                                          ? "border border-red-500 text-red-500"
                                          : "border border-red-500 text-red-500"
                                }`}
                            >
                                {activeTab === "All"
                                    ? `No Jobs found!`
                                    : `No ${activeTab} jobs found!`}
                            </p>
                        ) : (
                            jobs.map((job) => {
                                return (
                                    <div
                                        className="card-container m-5"
                                        key={job.jobId}
                                    >
                                        <div className="job-card border border-gray-500 rounded-lg">
                                            <div className="flex justify-between mx-auto px-4 py-3 rounded-lg">
                                                <div className="flex gap-3 items-start">
                                                    <p className="mt-2 text-xl">
                                                        <i className="fa-solid fa-suitcase"></i>
                                                    </p>
                                                    <div>
                                                        <h1 className="text-lg font-bold items-center flex gap-3">
                                                            <span>
                                                                {job.company}
                                                            </span>
                                                            {"  "}
                                                            <span
                                                                className={`font-semibold text-xs rounded-lg p-1 ${job.status === "APPROVED" ? "text-green-500 bg-green-100" : job.status === "PENDING" ? "text-yellow-500 bg-yellow-100" : "text-red-500 bg-red-100"}`}
                                                            >
                                                                {job.status}
                                                            </span>
                                                        </h1>
                                                        <h1 className="font-semibold text-sm">
                                                            {job.title} {"|"}{" "}
                                                            {job.location}
                                                        </h1>

                                                        <div className="flex gap-3 text-xs items-center mt-1">
                                                            <h2
                                                                className={
                                                                    job.active ===
                                                                        true &&
                                                                    job.status ===
                                                                        "APPROVED"
                                                                        ? "font-semibold px-2 py-1 rounded-lg bg-green-100 text-green-600"
                                                                        : job.active ===
                                                                                false &&
                                                                            job.status ===
                                                                                "PENDING"
                                                                          ? "font-semibold px-2 py-1 rounded-lg bg-yellow-100 text-yellow-600"
                                                                          : "font-semibold px-2 py-1 rounded-lg bg-red-100 text-red-600"
                                                                }
                                                            >
                                                                {job.active ===
                                                                    true &&
                                                                job.status ==
                                                                    "APPROVED"
                                                                    ? "ACTIVE"
                                                                    : job.active ===
                                                                            false &&
                                                                        job.status ===
                                                                            "PENDING"
                                                                      ? "AWAITING REVIEW"
                                                                      : "EXPIRED"}
                                                            </h2>
                                                            <h2 className="bg-gray-200 font-semibold rounded-full py-1 px-2">
                                                                {job.jobType}
                                                            </h2>
                                                            <h2 className="bg-gray-200 font-semibold rounded-full py-1 px-2">
                                                                {job.workMode}
                                                            </h2>
                                                        </div>

                                                        <div className="flex gap-2 items-center mt-1">
                                                            <h4>
                                                                <span className="text-yellow-500">
                                                                    <i class="fa-solid fa-sack-dollar"></i>{" "}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        job.minSalary
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        job.maxSalary
                                                                    }
                                                                </span>{" "}
                                                                LPA
                                                            </h4>
                                                            {"|"}
                                                            <h4>
                                                                <span className="font-semibold text-blue-900">
                                                                    <i class="fa-solid fa-suitcase"></i>{" "}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        job.minExperience
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        job.maxExperience
                                                                    }
                                                                </span>
                                                                {" years"}
                                                            </h4>
                                                        </div>

                                                        <div className="bg-blue-200 text-blue-900 text-sm mt-1 font-semibold rounded-lg w-fit py-1 px-2">
                                                            <h2>
                                                                {job.openings}{" "}
                                                                positions
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    hidden={
                                                        job.status != "APPROVED"
                                                    }
                                                    className={`flex gap-1 h-fit font-semibold items-center px-2 py-1 rounded-full ${job.active ? "text-green-500 bg-green-100" : "text-red-500 bg-gray-200"}`}
                                                >
                                                    <h1 className="text-sm">
                                                        {job.active
                                                            ? "ACTIVE"
                                                            : "INACTIVE"}
                                                    </h1>
                                                    <button
                                                        hidden={
                                                            job.status !==
                                                            "APPROVED"
                                                        }
                                                        onClick={() =>
                                                            toggleJob(job)
                                                        }
                                                        className={`relative h-6 w-11 rounded-full text-white font-semibold cursor-pointer transition
                                                            ${job.active ? "bg-green-600" : "bg-gray-400"}`}
                                                        title={
                                                            job.active
                                                                ? "Deactivate job"
                                                                : "Activate Job"
                                                        }
                                                    >
                                                        <span
                                                            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                                                                job.active
                                                                    ? "translate-x-5"
                                                                    : "translate-x-0"
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4 bg-gray-100 p-2 rounded-lg">
                                                <div>
                                                    <Link to="/company/update-job">
                                                        <div className="font-semibold text-blue-500 border border-1 border-blue-300 px-3 py-1 rounded-lg">
                                                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                                                            Edit
                                                        </div>
                                                    </Link>
                                                </div>
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
                                );
                            })
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ManageJobs;
