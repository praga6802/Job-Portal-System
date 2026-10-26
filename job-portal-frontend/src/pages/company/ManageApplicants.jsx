import React, { useState, useEffect } from "react";
import CompanySidebar from "./CompanySidebar.jsx";
import { Await, Link } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar.jsx";
import axiosInstance from "../../services/api.js";

const ManageApplicants = () => {
    const [company, setCompany] = useState("");
    const [activeTab, setActiveTab] = useState("Applicants");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [applicants, setApplicants] = useState([]);

    const [applicantsCount, setApplicantsCount] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [shortlistedCount, setShortlistedCount] = useState(0);
    const [underReviewCount, setUnderReviewCount] = useState(0);

    const tabs = [
        { label: "Applicants", value: "Applicants" },
        { label: "Selected", value: "Selected" },
        { label: "Rejected", value: "Rejected" },
        { label: "Shortlisted", value: "Shortlisted" },
        { label: "UnderReview", value: "UnderReview" },
    ];

    const fetchApplicants = async () => {
        setIsLoading(true);
        setMessage("");

        const endpoints = {
            Applicants: `/auth/company/applicants`,
            Selected: `/auth/company/applicants/selected`,
            Expired: `/auth/company/applicants/rejected`,
            Shortlisted: `/auth/company/applicants/shortlisted`,
            UnderReview: `/auth/company/applicants/under-review`,
        };

        try {
            const response = await axiosInstance.get(endpoints[activeTab], {
                withCredentials: true,
            });
            setApplicants(response?.data?.data);
            console.log(`${activeTab}`, response?.data?.data);
        } catch (err) {
            setApplicants([]);
            setMessage(
                err?.response?.data?.message || "Failed to fetch Applicants",
            );
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, [activeTab]);

    // fetch selected candidates count
    const fetchSelectedApplicantsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/candidates/selected-count",
            );
            setSelectedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch selected candidates Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    //fetch rejected candidates count
    const fetchRejectedCandidatesCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/candidates/rejected-count",
            );
            setRejectedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch rejected candidates Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    // fetch shortlisted candidates count
    const fetchShortlistedCandidatesCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/candidates/shortlisted-count",
            );
            setShortlistedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch shortlisted candidates Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    // fetch under-review candidates count
    const fetchUnderReviewCandidatesCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/candidates/under-review-count",
            );
            setUnderReviewCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch under-review candidates Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    // fetch under-review candidates count
    const fetchApplicantsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/applicants-count",
            );
            setApplicantsCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch Applicants Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        fetchSelectedApplicantsCount();
        fetchRejectedCandidatesCount();
        fetchShortlistedCandidatesCount();
        fetchUnderReviewCandidatesCount();
        fetchApplicantsCount();
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

    const cardStyle =
        "border border-2 border-gray-200 p-6 w-fit rounded-xl flex items-center flex-col justify-center";

    const cardHead = "font-bold text-lg";
    const cardCount = "font-bold text-4xl";

    const status = "rounded-xl bg-black py-1 px-2 text-white";

    return (
        <div className="flex justify-between min-h-screen">
            {isLoading ? (
                <p>Fetching Applicant Details...</p>
            ) : message ? (
                <p className="m-5 h-fit w-fit mx-auto p-2 rounded-lg text-center border border-1 border-red-500 text-red-600 font-semibold">
                    {message}
                </p>
            ) : company ? (
                <>
                    <div className="m-1 rounded-lg w-full bg-white">
                        <div className="p-5 bg-blue-950 m-2 rounded-xl">
                            <h1 className="font-bold text-2xl text-yellow-500">
                                Manage Applicants
                            </h1>
                            <h5 className="font-semibold text-blue-100 ">
                                Track, review, and manage applications from
                                candidates for your job openings!
                            </h5>
                        </div>

                        <div className="flex justify-around bg-white border border-1 border-gray-300 rounded-xl mt-2 mx-3 p-5">
                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-blue-400">
                                        <i className="fa-solid fa-user"></i>
                                    </p>
                                    <h2 className={cardHead}>Applicants</h2>
                                </div>
                                <h4 className={`${cardCount} text-blue-500`}>
                                    {applicantsCount}
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
                                    <h2 className={cardHead}>Selected</h2>
                                </div>
                                <h4 className={`${cardCount} text-green-500`}>
                                    {selectedCount}
                                </h4>
                            </div>

                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-red-500">
                                        <i className="fa-solid fa-ban"></i>
                                    </p>
                                    <h2 className={cardHead}>Rejected</h2>
                                </div>
                                <h4 className={`${cardCount} text-red-500`}>
                                    {rejectedCount}
                                </h4>
                            </div>

                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-purple-500">
                                        <i className="fa-regular fa-clipboard"></i>
                                    </p>
                                    <h2 className={cardHead}>Shortlisted</h2>
                                </div>
                                <h4 className={`${cardCount} text-purple-500`}>
                                    {shortlistedCount}
                                </h4>
                            </div>

                            <div className={cardStyle}>
                                <div className="flex gap-3 items-center justify-center">
                                    <p className="text-2xl text-yellow-500">
                                        <i className="fa-regular fa-clock"></i>
                                    </p>
                                    <h2 className={cardHead}>Under Review</h2>
                                </div>
                                <h4 className={`${cardCount} text-yellow-500`}>
                                    {underReviewCount}
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
                                            ? tab.value === "Applicants"
                                                ? "border border-1 text-white bg-black rounded"
                                                : tab.value === "Selected"
                                                  ? "border-1 border-green-500 text-green-500 bg-green-50"
                                                  : tab.value === "Rejected"
                                                    ? "border-1 border-red-500 text-red-500 bg-red-50"
                                                    : tab.value ===
                                                        "Shortlisted"
                                                      ? "border-1 border-purple-500 text-purple-500 bg-purple-50"
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
                                Loading Applicants...
                            </p>
                        ) : applicants.length === 0 ? (
                            <p
                                className={`p-2 w-fit rounded-lg mx-auto text-center transition mt-3 ${
                                    activeTab === "Selected"
                                        ? "border border-green-500 text-green-600"
                                        : activeTab === "Rejected"
                                          ? "border border-green-500 text-green-600"
                                          : activeTab === "Shortlisted"
                                            ? "border border-purple-500 text-purple-500"
                                            : "border border-yellow-500 text-yellow-500"
                                }`}
                            >
                                {activeTab === "Applicants"
                                    ? `No Applicants found!`
                                    : `No ${activeTab} Applicants found!`}
                            </p>
                        ) : (
                            applicants.map((applicant) => {
                                return (
                                    <div
                                        className="card-container m-5"
                                        key={applicant.applicationId}
                                    >
                                        <div className="job-card border border-gray-500 rounded-lg">
                                            {/* applicant data */}
                                            <div>
                                                {/*upper */}
                                                <div className="flex justify-between px-4 py-2">
                                                    <div>
                                                        <h1 className="font-bold text-lg">
                                                            {
                                                                applicant.firstname
                                                            }{" "}
                                                            {applicant.lastname}
                                                        </h1>
                                                        <p className="text-normal font-semibold">
                                                            <span className="text-red-500">
                                                                <i class="fa-regular fa-envelope"></i>
                                                            </span>{" "}
                                                            {applicant.email}
                                                        </p>
                                                        <p className="text-normal font-semibold">
                                                            <span className="text-green-500">
                                                                <i class="fa-solid fa-phone"></i>
                                                            </span>{" "}
                                                            {applicant.contact}
                                                        </p>
                                                        <p
                                                            className={`rounded-lg border-1 w-fit px-1 mt-1 ${
                                                                applicant.experience ===
                                                                "Fresher"
                                                                    ? "border-green-500 text-green-500 bg-green-50"
                                                                    : "border-blue-500 text-blue-500 bg-blue-50"
                                                            }`}
                                                        >
                                                            {
                                                                applicant.experience
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="bg-yellow-100 p-2 rounded-lg w-fit">
                                                        <p
                                                            className={`font-semibold w-fit px-2 ms-4 rounded-lg border-1 text-center mb-1 text-sm ${
                                                                applicant.status ===
                                                                "APPLIED"
                                                                    ? "border-blue-500 text-blue-500 bg-blue-50"
                                                                    : applicant.status ===
                                                                        "SELECTED"
                                                                      ? "border-green-500 text-green-500 bg-green-50"
                                                                      : applicant.status ===
                                                                          "REJECTED"
                                                                        ? "border-red-500 text-red-500 bg-red-50"
                                                                        : applicant.status ===
                                                                            "SHORTLISTED"
                                                                          ? "border-purple-500 text-purple-500 bg-purple-50"
                                                                          : "border-yellow-500 text-yellow-500 bg-yellow-50"
                                                            }`}
                                                        >
                                                            {applicant.status}
                                                        </p>
                                                        <p className="flex gap-2">
                                                            <span className="text-orange-400">
                                                                <i class="fa-regular fa-calendar"></i>
                                                            </span>
                                                            <span className="font-semibold">
                                                                Applied At
                                                            </span>
                                                        </p>
                                                        <p className="text-center">
                                                            {new Date(
                                                                applicant.appliedAt,
                                                            )
                                                                .toLocaleDateString(
                                                                    "en-IN",
                                                                )
                                                                .replaceAll(
                                                                    "/",
                                                                    "-",
                                                                )}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* down tech and other items */}
                                                <hr className="text-gray-400 mx-5 my-1" />
                                                <div></div>
                                            </div>

                                            {/* applicant manipuation */}
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
                                );
                            })
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ManageApplicants;
