import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";

const FeaturedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [candidate, setCandidate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get("/auth/jobs");
                const jobData = response?.data?.data || [];

                setJobs(jobData.slice(0, 4));
            } catch (err) {
                console.error("Error fetching featured jobs:", err);
                setMessage("Unable to load featured jobs.");
            } finally {
                setIsLoading(false);
            }
        };
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

        fetchJobs();
        fetchCandidate();

   
    }, []);

    if (isLoading) {
        return (
            <p className="py-8 text-center text-slate-500">
                Loading featured jobs...
            </p>
        );
    }

    if (message) {
        return <p className="py-8 text-center text-red-500">{message}</p>;
    }

    if (jobs.length === 0) {
        return (
            <p className="py-8 text-center text-slate-500">
                No jobs available at the moment.
            </p>
        );
    }

    const handleApply = async (job) => {
        if (!candidate) {
            navigate("/login");
            return;
        }

        try {
            const response = await axiosInstance.post(
                `/auth/candidate/apply/${job.jobId}`,
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {jobs.map((job) => (
                <article
                    key={job.jobId}
                    className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-950">
                            {(job.company || "C").charAt(0).toUpperCase()}
                        </div>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            {job.jobType?.replaceAll("_", " ") || "Job"}
                        </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-blue-950">
                        {job.title}
                    </h3>

                    <p className="mt-2 font-medium text-slate-500">
                        {job.company || "Company not specified"}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
                        <span>
                            <i className="fa-solid fa-location-dot mr-2 text-blue-500"></i>
                            {job.location || "Not specified"}
                        </span>

                        <span>
                            <i className="fa-solid fa-sack-dollar mr-2 text-yellow-500"></i>
                            {job.minSalary ?? "N/A"} – {job.maxSalary ?? "N/A"}{" "}
                            LPA
                        </span>

                        <span>
                            <i className="fa-solid fa-briefcase mr-2 text-gray-500"></i>
                            {job.minExperience ?? "N/A"} –{" "}
                            {job.maxExperience ?? "N/A"} years
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {job.workMode && (
                            <span className="rounded-md bg-purple-50 px-3 py-1 text-sm text-purple-700">
                                {job.workMode.replaceAll("_", " ")}
                            </span>
                        )}

                        {job.openings != null && (
                            <span className="rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-700">
                                {job.openings} openings
                            </span>
                        )}
                    </div>

                    <div className="mt-5 rounded-lg bg-red-50 px-3 py-2">
                        <p className="text-sm font-semibold text-red-500">
                            Application Deadline
                        </p>
                        <p className="font-medium text-black">
                            {job.deadline
                                ? new Date(job.deadline).toLocaleDateString(
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

                    <Link
                        to="/login"
                        className="mt-5 block rounded-lg border border-blue-950 px-4 py-2.5 text-center font-semibold text-blue-950 transition hover:border-yellow-300 hover:bg-yellow-300"
                        onClick={() => {
                            handleApply(job);
                        }}
                    >
                        Apply Now
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default FeaturedJobs;
