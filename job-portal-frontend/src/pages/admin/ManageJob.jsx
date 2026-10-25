import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api.js";

const ManageJob = () => {
    const [activeTab, setActiveTab] = useState("PENDING");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const tabs = [
        { label: "Pending Jobs", value: "PENDING" },
        { label: "Approved Jobs", value: "APPROVED" },
        { label: "Rejected Jobs", value: "REJECTED" },
    ];

    const fetchJobs = async () => {
        setLoading(true);
        setMessage("");

        const endpoints = {
            PENDING: "/auth/admin/pending-jobs",
            APPROVED: "/auth/admin/approved-jobs",
            REJECTED: "/auth/admin/rejected-jobs",
        };

        try {
            const response = await axiosInstance.get(endpoints[activeTab], {
                withCredentials: true,
            });

            setJobs(response.data.data ?? []);
        } catch (error) {
            setJobs([]);

            setMessage(
                error.response?.data?.message ||
                    `Failed to fetch ${activeTab.toLowerCase()} jobs.`,
            );

            console.error(
                "Fetch jobs error:",
                error.response?.status,
                error.response?.data,
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [activeTab]);

    const updateJobStatus = async (jobId, action) => {
        try {
            setMessage("");

            const endpoint =
                action === "approve"
                    ? `/auth/admin/approve-job/${jobId}`
                    : action === "pending"
                      ? `/auth/admin/pending-job/${jobId}`
                      : `/auth/admin/reject-job/${jobId}`;

            const response = await axiosInstance.put(
                endpoint,
                {},
                {
                    withCredentials: true,
                },
            );

            setMessage(
                response.data.message ||
                    `Job ${action === "approve" ? "approved" : "rejected"} successfully.`,
            );

            await fetchJobs();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                    `Unable to ${action} this job.`,
            );
        }
    };

    const statusStyle = {
        PENDING: "bg-yellow-100 text-yellow-700 border-yellow-600 border-1",
        APPROVED: "bg-green-100 text-green-700 border-1 border-green-600",
        REJECTED: "bg-red-100 text-red-700 border-1 border-red-600",
    };

    return (
        <div className="space-y-6 m-5">
            <div className="bg-blue-950 p-3 rounded-lg">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Manage Jobs
                </h1>
                <p className="mt-1 text-sm text-slate-100">
                    Review and manage job postings submitted by companies.
                </p>
            </div>

            {/* Status tabs */}
            <div className="flex gap-3 border border-2 border-slate-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`p-2 text-sm font-semibold rounded-lg cursor-pointer
                            transition ${
                                activeTab === tab.value
                                    ? tab.value === "PENDING"
                                        ? `${statusStyle.PENDING}`
                                        : tab.value === "APPROVED"
                                          ? `${statusStyle.APPROVED}`
                                          : `${statusStyle.REJECTED}`
                                    : "bg-transparent text-slate-500 hover:text-yellow-600"
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

            {/* Jobs status table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h2
                        className={`font-semibold rounded-lg p-1 transition 
                        ${
                            activeTab === "PENDING"
                                ? `${statusStyle.PENDING}`
                                : activeTab === "APPROVED"
                                  ? `${statusStyle.APPROVED}`
                                  : `${statusStyle.REJECTED}`
                        }`}
                    >
                        {tabs.find((tab) => tab.value === activeTab)?.label}{" "}
                        List
                    </h2>

                    <span
                        className={`rounded-lg p-1
                            transition ${
                                activeTab === "PENDING"
                                    ? `${statusStyle.PENDING}`
                                    : activeTab === "APPROVED"
                                      ? `${statusStyle.APPROVED}`
                                      : `${statusStyle.REJECTED}`
                            }
                            `}
                    >
                        {jobs.length} jobs
                    </span>
                </div>

                {loading ? (
                    <p className="p-8 text-center text-slate-500">
                        Loading jobs...
                    </p>
                ) : jobs.length === 0 ? (
                    <p className="p-8 text-center text-slate-500">
                        No {activeTab.toLowerCase()} jobs found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-center text-sm">
                            <thead className="bg-blue-200 text-slate-600">
                                <tr>
                                    <th className="px-5 py-4">Job ID</th>
                                    <th className="px-5 py-4">Job Details</th>
                                    <th className="px-5 py-4">Company</th>
                                    <th className="px-5 py-4">Location</th>
                                    <th className="px-5 py-4">Status</th>
                                    {activeTab === "PENDING" && (
                                        <th className="px-5 py-4">Actions</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {jobs.map((job) => (
                                    <tr
                                        key={job.jobId}
                                        className="hover:bg-slate-50"
                                    >
                                        <td
                                            className="px-5 py-4 font-medium
                                                       text-slate-700"
                                        >
                                            #{job.jobId}
                                        </td>

                                        <td className="px-5 py-4">
                                            <p
                                                className="font-semibold
                                                          text-slate-800"
                                            >
                                                {job.title}
                                            </p>
                                            <p
                                                className="mt-1 text-xs
                                                          text-slate-500"
                                            >
                                                {job.jobType?.replaceAll(
                                                    "_",
                                                    " ",
                                                )}
                                                {" | "}
                                                {job.workMode}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {job.company}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {job.location}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <span
                                                    className={`rounded-lg p-2 text-sm font-semibold
                                                ${statusStyle[job.status]}`}
                                                >
                                                    {job.status}
                                                </span>
                                                {job.status !== "PENDING" && (
                                                    <button
                                                        onClick={() =>
                                                            updateJobStatus(
                                                                job.jobId,
                                                                "pending",
                                                            )
                                                        }
                                                        className="rounded-md border border-yellow-600
                                                                bg-yellow-50 p-2 text-yellow-700
                                                                hover:bg-yellow-600 hover:text-white
                                                                transition"
                                                        title="Move back to Pending"
                                                    >
                                                        <i className="fa-solid fa-rotate-left"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        {activeTab === "PENDING" && (
                                            <td className="px-5 py-4">
                                                <div className="flex justify-center gap-4">
                                                    <button
                                                        onClick={() =>
                                                            updateJobStatus(
                                                                job.jobId,
                                                                "approve",
                                                            )
                                                        }
                                                        className="rounded-md
                                                            bg-green-50 p-2 text-sm
                                                            font-semibold
                                                            text-green-600 border-1 border-green-600
                                                            hover:bg-green-700 hover:text-white"
                                                    >
                                                        APPROVE
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateJobStatus(
                                                                job.jobId,
                                                                "reject",
                                                            )
                                                        }
                                                        className="rounded-md
                                                            bg-red-50 p-2 text-sm
                                                            font-semibold
                                                            text-red-600 border-1 border-red-600
                                                            hover:bg-red-700 hover:text-white"
                                                    >
                                                        REJECT
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageJob;
