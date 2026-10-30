import React, { useState, useEffect } from "react";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [candidate, setCandidate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            setMessage("");

            try {
                const response = await axiosInstance.get("/auth/jobs");

                console.log("Full response:", response.data);

                const jobData = response?.data?.data;

                console.log("Job data:", jobData);

                if (!Array.isArray(jobData)) {
                    setJobs([]);
                    setMessage("Invalid jobs response from backend.");
                    return;
                }
                setJobs(jobData);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                console.error("Status:", err.response?.status);
                console.error("Response:", err.response?.data);

                setMessage("Unable to load jobs.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/candidate/current",
                );
                setCandidate(response?.data?.data || null);
            } catch (err) {
                setCandidate(null);
            }
        };
        fetchCandidate();
    }, []);

    const handleApply = async (job) => {
        if (!candidate) {
            navigate("/login");
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/auth/candidate/apply/job/${job.jobId}`,
            );

            alert(
                response?.data?.message ||
                    "Application submitted successfully!",
            );
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate("/login");
            } else {
                alert(
                    err.response?.data?.message ||
                        "Failed to apply for this job.",
                );
            }
        }
    };

    return (
        <div className="min-h-screen w-full">
            <div className="m-2 rounded-lg bg-blue-950 px-4 py-4">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Explore Jobs
                </h1>
                <h5 className="mt-1 font-semibold text-blue-100">
                    Explore exciting opportunities and find the right job for
                    you!
                </h5>
            </div>

            {isLoading ? (
                <p className="m-5 text-center font-semibold text-gray-600">
                    Fetching Job Details...
                </p>
            ) : message ? (
                <p className="m-5 mx-auto w-fit rounded-lg border-1 border-red-100 p-3 text-center font-semibold text-red-500 bg-red-50">
                    {message}
                </p>
            ) : jobs.length === 0 ? (
                <p className="m-5 text-center text-gray-600">
                    No jobs available at the moment!
                </p>
            ) : (
                <div className="flex min-h-screen w-full">
                    <div className="hidden w-1/3 lg:block"></div>

                    <div className="w-full lg:w-2/3">
                        <div className="card-container flex min-h-screen flex-col gap-5 bg-gray-500 p-5">
                            {jobs.map((job) => (
                                <div
                                    key={job.jobId}
                                    className="ml-auto w-full rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg"
                                >
                                    {/* Job title and status */}
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                        <div>
                                            <h2 className="flex flex-wrap items-center gap-3 text-xl font-bold text-gray-800">
                                                {job.title}

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        job.active
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                                >
                                                    {job.active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </h2>

                                            <p className="mt-1 text-lg font-semibold text-blue-800">
                                                {job.company}
                                            </p>
                                        </div>

                                        <div>
                                            <button
                                                className="border-2 border-green-500 text-green px-3 py-1 rounded-lg font-semibold text-green-500 cursor-pointer hover:bg-green-600 hover:text-white"
                                                onClick={() => {
                                                    handleApply(job);
                                                }}
                                            >
                                                APPLY
                                            </button>
                                        </div>
                                    </div>

                                    <hr className="my-4 border-gray-200" />

                                    <div className="flex justify-between">
                                        {/* Job details */}
                                        <div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                                <p className="font-medium text-gray-800">
                                                    <i className="fa-solid fa-location-dot mr-2 text-blue-500"></i>
                                                    {job.location ||
                                                        "Not specified"}
                                                </p>
                                                {"|"}

                                                <p className="font-semibold text-gray-800">
                                                    <i className="fa-solid fa-sack-dollar mr-2 text-yellow-500"></i>
                                                    {Number(job.minSalary/100000) ?? "N/A"} –{" "}
                                                    {Number(job.maxSalary/100000) ?? "N/A"} LPA
                                                </p>
                                                {"|"}

                                                <p className="font-medium text-gray-800">
                                                    <i className="fa fa-briefcase mr-2 text-gray-500"></i>
                                                    {job.minExperience ?? "N/A"}{" "}
                                                    –{" "}
                                                    {job.maxExperience ?? "N/A"}{" "}
                                                    years
                                                </p>
                                            </div>

                                            {/* Additional details */}
                                            <div className="mt-4 flex flex-wrap gap-3">
                                                {job.workMode && (
                                                    <span className="rounded-md bg-purple-50 px-3 py-1 text-sm text-purple-700">
                                                        <i className="fa-solid fa-building mr-2"></i>
                                                        {job.workMode.replaceAll(
                                                            "_",
                                                            " ",
                                                        )}
                                                    </span>
                                                )}

                                                <span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                    {job.jobType?.replaceAll(
                                                        "_",
                                                        " ",
                                                    ) || "Not specified"}
                                                </span>

                                                {job.openings != null && (
                                                    <span className="rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-700">
                                                        <i className="fa-solid fa-users mr-2"></i>
                                                        {job.openings} openings
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Deadline */}
                                        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 h-fit">
                                            <p className="text-sm font-semibold text-red-600">
                                                Application Deadline
                                            </p>

                                            <p className="font-medium text-gray-800">
                                                {job.deadline
                                                    ? new Date(
                                                          job.deadline,
                                                      ).toLocaleDateString(
                                                          "en-IN",
                                                          {
                                                              day: "2-digit",
                                                              month: "long",
                                                              year: "numeric",
                                                          },
                                                      )
                                                    : "Not specified"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
