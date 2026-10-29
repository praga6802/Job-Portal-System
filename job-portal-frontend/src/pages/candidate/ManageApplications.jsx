import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import { useOutletContext } from "react-router-dom";

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("Applied");
    const { candidate } = useOutletContext();

    const tabs = [
        { label: "Applied", value: "Applied" },
        { label: "Selected", value: "Selected" },
        { label: "Rejected", value: "Rejected" },
        { label: "Shortlisted", value: "Shortlisted" },
        { label: "UnderReview", value: "UnderReview" },
    ];

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            setMessage("");

            const endpoints = {
                Applied: "/auth/candidate/applications",
                Selected: "/auth/candidate/applications/selected",
                Rejected: "/auth/candidate/applications/rejected",
                Shortlisted: "/auth/candidate/applications/shortlisted",
                UnderReview: "/auth/candidate/applications/under-review",
            };

            try {
                const response = await axiosInstance.get(endpoints[activeTab]);
                setApplications(response?.data?.data || []);
            } catch (err) {
                setApplications([]);
                setMessage(
                    err?.response?.data?.message ||
                        "Failed to fetch applications",
                );
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, [activeTab]);

    return (
        <div className="flex min-h-screen">
            {isLoading ? (
                <p>Fetching Candidate Details...</p>
            ) : candidate ? (
                <>
                    <div className="w-full bg-white rounded-lg">
                        <div className="bg-blue-950 m-2 px-4 py-2 rounded-lg">
                            <h1 className="font-bold text-2xl text-yellow-500">
                                Manage Applications
                            </h1>
                            <h5 className="font-semibold text-blue-100 ">
                                Manage and track your application listings!
                            </h5>
                        </div>

                        <div className="flex gap-5 ms-3 mt-5">
                            {tabs.map((tab) => (
                                <button
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`p-2 font-semibold text-normal rounded-lg cursor-pointer
                                    transition 
                                    ${
                                        activeTab === tab.value
                                            ? `text-white border-1 rounded ${
                                                  activeTab === "Applied"
                                                      ? "bg-black"
                                                      : activeTab === "Selected"
                                                        ? "bg-green-700"
                                                        : activeTab ===
                                                            "Rejected"
                                                          ? "bg-red-500"
                                                          : activeTab ===
                                                              "Shortlisted"
                                                            ? "bg-purple-500"
                                                            : "bg-yellow-500"
                                              }`
                                            : "bg-transparent text-slate-400 hover:text-yellow-600"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <hr className="mx-5 my-2 text-gray-500" />
                        {isLoading ? (
                            <p>Loading Applications...</p>
                        ) : applications.length === 0 ? (
                            <p
                                className={`p-2 w-fit rounded-lg mx-auto text-center font-semibold transition mt-3 border-1 ${
                                    activeTab === "Selected"
                                        ? "border-green-500 text-green-600"
                                        : activeTab === "Shortlisted"
                                          ? "border-purple-500 text-purple-500"
                                          : activeTab === "UnderReview"
                                            ? "border-yellow-500 text-yellow-500"
                                            : "border-red-500 text-red-500"
                                }`}
                            >
                                {activeTab === "Applied"
                                    ? `No Applications found!`
                                    : `No Applications were ${activeTab}!`}
                            </p>
                        ) : (
                            <>
                                {applications.map((application) => {
                                    return (
                                        <>
                                            <div
                                                className="card-container m-5"
                                                key={application.applicationId}
                                            >
                                                {/* application card */}
                                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg">
                                                    {/* Title and Status */}
                                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                                        <div>
                                                            <h2 className="text-xl font-bold text-gray-800 flex gap-5">
                                                                {
                                                                    application.title
                                                                }
                                                                <span
                                                                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                                                        application.active
                                                                            ? "bg-green-100 text-green-700"
                                                                            : "bg-gray-100 text-gray-600"
                                                                    }`}
                                                                >
                                                                    {application.active
                                                                        ? "Active"
                                                                        : "Inactive"}
                                                                </span>
                                                            </h2>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                {
                                                                    application.company
                                                                }
                                                            </p>
                                                        </div>

                                                        <span
                                                            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                                                application.status ===
                                                                "SELECTED"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : application.status ===
                                                                        "REJECTED"
                                                                      ? "bg-red-100 text-red-700"
                                                                      : application.status ===
                                                                          "SHORTLISTED"
                                                                        ? "bg-purple-100 text-purple-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                        >
                                                            {application.status?.replaceAll(
                                                                "_",
                                                                " ",
                                                            )}
                                                        </span>
                                                    </div>
                                                    <hr className="my-2 border-gray-200" />

                                                    {/* application data */}
                                                    <div className="mb-3">
                                                        <div className="flex gap-3 items-center">
                                                            <p className="mt-1 font-medium text-gray-800">
                                                                <i class="fa-solid fa-location-dot text-blue-500"></i>{" "}
                                                                {
                                                                    application.location
                                                                }
                                                            </p>
                                                            {"|"}

                                                            <p className="mt-1 font-semibold text-gray-800">
                                                                <i class="fa-solid fa-sack-dollar text-yellow-500"></i>{" "}
                                                                {
                                                                    application.minSalary
                                                                }
                                                                –
                                                                {
                                                                    application.maxSalary
                                                                }{" "}
                                                                LPA
                                                            </p>
                                                            {"|"}
                                                            <p className="mt-1 font-medium text-gray-800">
                                                                <i className="fa fa-briefcase mr-2 text-gray-500"></i>{" "}
                                                                {
                                                                    application.minExperience
                                                                }
                                                                –
                                                                {
                                                                    application.maxExperience
                                                                }{" "}
                                                                years
                                                            </p>
                                                            {"|"}

                                                            <p className="mt-1 text-xs font-semibold bg-green-100 py-1 rounded-lg px-3 text-green-600">
                                                                {application.jobType?.replaceAll(
                                                                    "_",
                                                                    " ",
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* applied at*/}
                                                    <div className="bg-blue-50 px-3 py-1">
                                                        <p className="text-sm text-gray-600 font-semibold">
                                                            Applied Date
                                                        </p>
                                                        <p className="font-medium text-gray-800">
                                                            {application.appliedAt
                                                                ? new Date(
                                                                      application.appliedAt,
                                                                  ).toLocaleDateString(
                                                                      "en-IN",
                                                                      {
                                                                          day: "2-digit",
                                                                          month: "short",
                                                                          year: "numeric",
                                                                      },
                                                                  )
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </>
            ) : message ? (
                <p className="m-5 h-fit w-fit mx-auto p-2 rounded-lg text-center border border-1 border-red-500 text-red-600 font-semibold">
                    {message}
                </p>
            ) : null}
        </div>
    );
};

export default ManageApplications;
