import React, { useState, useEffect, use } from "react";
import CompanySidebar from "./CompanySidebar.jsx";
import { Await, Link } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar.jsx";
import axiosInstance from "../../services/api.js";
import SearchButton from "./SearchButton.jsx";

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
    const [searchJobId, setSearchJobId] = useState("");
    const [searchApplicants, setSearchApplicants] = useState([]);
    const [jobId, setJobId] = useState("");

    const tabs = [
        { label: "Applicants", value: "Applicants" },
        { label: "Selected", value: "Selected" },
        { label: "Rejected", value: "Rejected" },
        { label: "Shortlisted", value: "Shortlisted" },
        { label: "UnderReview", value: "UnderReview" },
    ];

    const applicant_status = [
        "APPLIED",
        "SELECTED",
        "REJECTED",
        "SHORTLISTED",
        "UNDER_REVIEW",
    ];

    const viewResume = async (candidateId) => {
        try {
            const response = await axiosInstance.get(
                `/auth/company/resume/${candidateId}`,
                {
                    responseType: "blob",
                },
            );

            const fileURL = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/pdf" }),
            );
            window.open(fileURL, "_blank");
        } catch (err) {
            console.error("Unable to view resume", err);
            alert("Unable to view resume");
        }
    };

    const handleStatusChange = async (applicationId, status) => {
        setIsLoading(true);
        setMessage("");

        const endPoints = {
            SELECTED: `/auth/company/applicant/select/${applicationId}`,
            REJECTED: `/auth/company/applicant/reject/${applicationId}`,
            SHORTLISTED: `/auth/company/applicant/shortlist/${applicationId}`,
            UNDER_REVIEW: `/auth/company/applicant/under-review/${applicationId}`,
        };

        try {
            const response = await axiosInstance.put(endPoints[status]);

            setMessage(
                response?.data?.message || "Status updated successfully!",
            );

            await refreshApplicantCounts();
            await fetchApplicants();
        } catch (err) {
            console.error(err?.response?.data?.message || err);
        }
    };

    const fetchApplicants = async () => {
        setIsLoading(true);
        setMessage("");

        const endpoints = {
            Applicants: `/auth/company/applicants`,
            Selected: `/auth/company/applicants/selected`,
            Rejected: `/auth/company/applicants/rejected`,
            Shortlisted: `/auth/company/applicants/shortlisted`,
            UnderReview: `/auth/company/applicants/under-review`,
        };

        try {
            const response = await axiosInstance.get(endpoints[activeTab], {
                withCredentials: true,
            });
            const data = response?.data?.data ?? [];
            setApplicants(response?.data?.data);

            setMessage(data.length === 0 ? response?.data?.message : "");
            console.log(`${activeTab}`, response?.data?.data);
        } catch (err) {
            setApplicants([]);
            setMessage(err?.response?.data?.message || "Something went wrong");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, [activeTab]);

    useEffect(() => {
        refreshApplicantCounts();
    }, []);

    // fetch selected applicants count
    const fetchSelectedApplicantsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/applicants/selected-count",
            );
            setSelectedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch selected applicants Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        }
    };

    //fetch rejected applicants count
    const fetchRejectedapplicantsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/applicants/rejected-count",
            );
            setRejectedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch rejected applicants Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        }
    };

    // fetch shortlisted applicants count
    const fetchShortlistedapplicantsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/applicants/shortlisted-count",
            );
            setShortlistedCount(response?.data?.data);

            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch shortlisted applicants Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        }
    };

    // fetch under-review applicants count
    const fetchUnderReviewapplicantsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/company/applicants/under-review-count",
            );
            setUnderReviewCount(response?.data?.data);

            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch under-review applicants Count");
            console.error(`status: ${err.response?.status}`);
            console.error(err?.response?.data?.message);
        }
    };

    // fetch under-review applicants count
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
        }
    };

    const refreshApplicantCounts = async () => {
        console.log("reaching refresh counts");
        await Promise.all([
            fetchSelectedApplicantsCount(),
            fetchRejectedapplicantsCount(),
            fetchShortlistedapplicantsCount(),
            fetchUnderReviewapplicantsCount(),
            fetchApplicantsCount(),
        ]);
    };

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

    const fetchJobById = async () => {
        const id = jobId.trim();

        if (!id) {
            setMessage("Please enter Job ID");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await axiosInstance.get(
                `/auth/company/applicants/${id}`,
                { withCredentials: true },
            );

            const data = response?.data?.data;

            const results =
                data == null ? [] : Array.isArray(data) ? data : [data];
            console.log(results);

            setSearchApplicants(results);
            setSearchJobId(id);

            if (results.length === 0) {
                setMessage(
                    response?.data?.message ||
                        "No applicants found for this Job ID.",
                );
            }
        } catch (err) {
            setSearchApplicants([]);
            setSearchJobId(id);
            setMessage(
                err?.response?.data?.message ||
                    "No applicants found for this Job ID.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setJobId("");
        setSearchJobId("");
        searchApplicants([]);
        setMessage("");
        fetchJobs();
    };

    const displayApplicants = searchJobId ? searchApplicants : applicants;

    return (
        <div className="flex justify-between min-h-screen">
            {isLoading ? (
                <p>Loading Applicant Details...</p>
            ) : company ? (
                <>
                    <div className="m-1 rounded-lg w-full bg-white">
                        <div className="p-5 bg-blue-950 m-2 rounded-xl">
                            <h1 className="font-bold text-2xl text-yellow-500">
                                Manage Applicants
                            </h1>
                            <h5 className="font-semibold text-blue-100 ">
                                Track, review, and manage applications from
                                applicants for your job openings!
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
                        <hr className="my-3 text-slate-400 mx-4" />

                        <SearchButton
                            jobId={jobId}
                            setJobId={setJobId}
                            fetchJobById={fetchJobById}
                            handleClear={handleClear}
                        />

                        {message && (
                            <div
                                className={`mt-2 rounded-lg border-1 text-center font-semibold
                                p-2 text-sm w-fit mx-auto ${activeTab === "Selected" ? "border-green-500 text-green-500 bg-green-50" : activeTab === "Rejected" ? "border-red-500 text-red-500 bg-red-50" : activeTab === "Shortlisted" ? "border-purple-500 text-purple-500 bg-purple-50" : "border-yellow-500 text-yellow-500 bg-yellow-50"}`}
                            >
                                {message}
                            </div>
                        )}

                        {isLoading ? (
                            <p className="p-8 text-center text-slate-500">
                                Loading Applicants...
                            </p>
                        ) : (
                            displayApplicants.map((applicant) => {
                                return (
                                    <div
                                        className="card-container m-5"
                                        key={applicant.applicationId}
                                    >
                                        <div className="job-card border border-gray-500 rounded-lg">
                                            {/* job information */}
                                            <div className="flex gap-5 font-semibold text-lg bg-blue-200 w-full mb-2 rounded-lg px-2 py-1">
                                                <p>JOB ID #{applicant.jobId}</p>
                                                <p>{applicant.jobTitle}</p>
                                            </div>

                                            {/* applicant data */}
                                            <div className="flex items-center justify-between px-4 py-2">
                                                <div className="w-full">
                                                    <h1 className="font-bold text-lg flex gap-3">
                                                        {applicant.firstname}{" "}
                                                        {applicant.lastname}
                                                        <span
                                                            className={`rounded-lg border-1 font-semibold text-sm w-fit px-1 mt-1 ${
                                                                applicant.experience ===
                                                                "Fresher"
                                                                    ? "border-green-500 text-green-500 bg-green-50"
                                                                    : "border-blue-500 text-blue-500 bg-blue-50"
                                                            }`}
                                                        >
                                                            {applicant.experience ===
                                                            "Fresher"
                                                                ? `${applicant.experience}`
                                                                : `${applicant.experience} years`}
                                                        </span>
                                                    </h1>
                                                    <p className="text-normal">
                                                        <span className="text-red-500">
                                                            <i className="fa-regular fa-envelope"></i>
                                                        </span>{" "}
                                                        {applicant.email}
                                                    </p>
                                                    <p className="text-normal">
                                                        <span className="text-green-500">
                                                            <i className="fa-solid fa-phone"></i>
                                                        </span>{" "}
                                                        {applicant.contact}
                                                    </p>
                                                    <p>
                                                        <span className="text-blue-500">
                                                            <i className="fa-solid fa-location-dot"></i>
                                                        </span>{" "}
                                                        {applicant.location
                                                            ? String(
                                                                  applicant.location,
                                                              )
                                                                  .charAt(0)
                                                                  .toUpperCase() +
                                                              String(
                                                                  applicant.location,
                                                              )
                                                                  .slice(1)
                                                                  .toLowerCase()
                                                            : "N/A"}
                                                    </p>
                                                </div>

                                                {/* manipulation down*/}
                                                <div className="bg-yellow-100 p-2 rounded-lg w-100 flex flex-col items-center justify-center">
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
                                                            <i className="fa-regular fa-calendar"></i>
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
                                                <hr className="text-gray-400 mx-5 my-1" />
                                            </div>

                                            {/* applicant manipuation */}
                                            <div className="flex justify-between bg-gray-100 rounded-lg">
                                                <div className="h-fit w-fit my-2 mx-5 rounded-lg px-2 py-1">
                                                    <select
                                                        name="applicant-status"
                                                        id={
                                                            applicant.applicationId
                                                        }
                                                        value={applicant.status}
                                                        onChange={(e) => {
                                                            handleStatusChange(
                                                                applicant.applicationId,
                                                                e.target.value,
                                                            );
                                                        }}
                                                        className={`font-semibold border-1 rounded-lg px-2 py-1 ${
                                                            applicant.status ===
                                                            "REJECTED"
                                                                ? "border-red-500 text-red-500 bg-red-50"
                                                                : applicant.status ===
                                                                    "SELECTED"
                                                                  ? "border-green-500 text-green-500 bg-green-50"
                                                                  : applicant.status ===
                                                                      "SHORTLISTED"
                                                                    ? "border-purple-500 text-purple-500 bg-purple-50"
                                                                    : applicant.status ===
                                                                        "UNDER_REVIEW"
                                                                      ? "border-yellow-500 text-yellow-500 bg-yellow-50"
                                                                      : "border-blue-500 text-blue-500 bg-blue-100"
                                                        }`}
                                                    >
                                                        {applicant_status.map(
                                                            (status) => {
                                                                return (
                                                                    <option
                                                                        hidden={
                                                                            status ===
                                                                            "APPLIED"
                                                                        }
                                                                        key={
                                                                            status
                                                                        }
                                                                        value={
                                                                            status
                                                                        }
                                                                    >
                                                                        {status.replaceAll(
                                                                            "_",
                                                                            " ",
                                                                        )}
                                                                    </option>
                                                                );
                                                            },
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="flex justify-end items-center gap-4 p-2 rounded-lg me-3">
                                                    <div className="bg-green-50 border border-1 border-green-400 text-green-600 p-1  rounded-lg">
                                                        <button
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                viewResume(
                                                                    applicant.candidateId,
                                                                )
                                                            }
                                                        >
                                                            View Resume
                                                        </button>
                                                    </div>
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
