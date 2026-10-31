import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [candidate, setCandidate] = useState(null);
    const [openSection, setOpenSection] = useState({});
    const [appliedJobIds, setAppliedJobIds] = useState([]);

    const [filters, setFilters] = useState({
        category: [],
        jobType: [],
        experience: [],
        workMode: [],
        location: [],
    });

    const navigate = useNavigate();

    // FETCH ALL JOBS
    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            setMessage("");

            try {
                const response = await axiosInstance.get("/auth/jobs");
                const jobData = response?.data?.data;

                if (!Array.isArray(jobData)) {
                    setJobs([]);
                    setMessage("Invalid jobs response from backend.");
                    return;
                }

                setJobs(jobData);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setMessage("Unable to load jobs.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchJobIds = async () => {
            setIsLoading(true);
            setMessage("");

            try {
                const response = await axiosInstance.get(
                    "/auth/candidate/applied-job-ids",
                );
                const jobData = response?.data?.data;

                if (!Array.isArray(jobData)) {
                    setAppliedJobIds([]);
                    return;
                }

                setAppliedJobIds(jobData);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setMessage(err?.response?.data?.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobIds();
    }, []);

    // APPLY FOR JOB
    const handleApply = async (job) => {
        try {
            // Check candidate login only when APPLY is clicked
            const candidateResponse = await axiosInstance.get(
                "/auth/candidate/current",
            );

            const currentCandidate = candidateResponse?.data?.data;

            if (!currentCandidate) {
                setMessage(
                    "Please log in to your account to apply for this job.",
                );

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

                return;
            }

            // Apply for job
            const response = await axiosInstance.post(
                `/auth/candidate/apply/job/${job.jobId}`,
            );

            alert(
                response?.data?.message ||
                    "Application submitted successfully!",
            );
            setAppliedJobIds((prev) => [...prev, job.jobId]);

        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                setMessage(
                    "Please log in to your account to apply for this job.",
                );

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                alert(
                    err.response?.data?.message ||
                        "Failed to apply for this job.",
                );
            }
        }
    };

    const getUniqueOptions = (field) => {
        return [
            ...new Set(
                jobs
                    .map((job) => job[field])
                    .filter(
                        (value) =>
                            value !== null &&
                            value !== undefined &&
                            value !== "",
                    ),
            ),
        ].sort();
    };

    const filterSections = [
        {
            title: "Job Category",
            type: "category",
            options: getUniqueOptions("category"),
        },
        {
            title: "Job Type",
            type: "jobType",
            options: getUniqueOptions("jobType"),
        },
        {
            title: "Experience",
            type: "experience",
            options: [
                "Fresher",
                "0-1 Years",
                "1-3 Years",
                "3-5 Years",
                "5+ Years",
            ],
        },
        {
            title: "Work Mode",
            type: "workMode",
            options: getUniqueOptions("workMode"),
        },
        {
            title: "Location",
            type: "location",
            options: getUniqueOptions("location"),
        },
    ];

    // HANDLE FILTER CHECKBOX
    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter((item) => item !== value)
                : [...prev[type], value],
        }));
    };

    // CLEAR ALL FILTERS
    const clearFilters = () => {
        setFilters({
            category: [],
            jobType: [],
            experience: [],
            workMode: [],
            location: [],
        });
    };

    const matchesExperience = (job, selectedExperience) => {
        const min = Number(job.minExperience);
        const max = Number(job.maxExperience);

        if (job.minExperience == null || job.maxExperience == null) {
            return false;
        }

        switch (selectedExperience) {
            case "Fresher":
                return min === 0;

            case "0-1 Years":
                return min <= 1 && max >= 0;

            case "1-3 Years":
                return min <= 3 && max >= 1;

            case "3-5 Years":
                return min <= 5 && max >= 3;

            case "5+ Years":
                return max >= 5;

            default:
                return false;
        }
    };

    // FILTER JOBS
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const categoryMatch =
                !filters.category.length ||
                filters.category.includes(job.category);

            const jobTypeMatch =
                !filters.jobType.length ||
                filters.jobType.includes(job.jobType);

            const experienceMatch =
                !filters.experience.length ||
                filters.experience.some((exp) => matchesExperience(job, exp));

            const workModeMatch =
                !filters.workMode.length ||
                filters.workMode.includes(job.workMode);

            const locationMatch =
                !filters.location.length ||
                filters.location.includes(job.location);

            return (
                categoryMatch &&
                jobTypeMatch &&
                experienceMatch &&
                workModeMatch &&
                locationMatch
            );
        });
    }, [jobs, filters]);

    // FORMAT LABELS
    const formatLabel = (value) => {
        return value?.replaceAll("_", " ") || "Not specified";
    };

    // FORMAT SALARY
    const formatSalary = (salary) => {
        return salary != null ? (Number(salary) / 100000).toFixed(1) : "N/A";
    };

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* PAGE HEADER */}
            <div className="m-2 rounded-xl bg-blue-950 px-6 py-6">
                <h1 className="text-2xl font-bold text-yellow-400">
                    Explore Jobs
                </h1>

                <p className="mt-2 text-sm font-medium text-blue-100">
                    Explore exciting opportunities and find the right job for
                    you!
                </p>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex w-full justify-between flex-col gap-6 px-4 py-6 lg:flex-row">
                {/* LEFT FILTER SIDEBAR */}
                <aside className="h-fit w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-5">
                    {/* FILTER HEADER */}
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-800">
                            <i className="fa-solid fa-sliders mr-2 text-blue-600"></i>
                            Filters
                        </h2>

                        <button
                            onClick={clearFilters}
                            className="cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                            Clear All
                        </button>
                    </div>

                    <hr className="mb-5 border-gray-300" />

                    {filterSections.map((section) => (
                        <div
                            key={section.type}
                            className="mb-4 border-b border-gray-100 pb-4 last:border-none"
                        >
                            {/* FILTER TITLE */}
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenSection((prev) => ({
                                        ...prev,
                                        [section.type]: !prev[section.type],
                                    }))
                                }
                                className="flex w-full items-center justify-between text-sm font-bold uppercase tracking-wide text-gray-700 hover:text-yellow-600"
                            >
                                {section.title}

                                <i
                                    className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                                        openSection[section.type]
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                ></i>
                            </button>

                            {/* FILTER OPTIONS */}
                            {openSection[section.type] && (
                                <div className="mt-4 space-y-3">
                                    {section.options.length === 0 ? (
                                        <p className="text-xs text-gray-400">
                                            No options available
                                        </p>
                                    ) : (
                                        section.options.map((option) => (
                                            <label
                                                key={option}
                                                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 hover:text-yellow-600"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters[
                                                        section.type
                                                    ].includes(option)}
                                                    onChange={() =>
                                                        handleFilterChange(
                                                            section.type,
                                                            option,
                                                        )
                                                    }
                                                    className="h-4 w-4 cursor-pointer accent-blue-600"
                                                />

                                                <span>
                                                    {formatLabel(option)}
                                                </span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </aside>

                {/* RIGHT JOB LISTINGS */}
                <section className="w-full lg:w-3/4">
                    {/* JOB LIST HEADER */}
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Latest Jobs
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Discover opportunities that match your skills.
                            </p>
                        </div>

                        <span className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
                            {filteredJobs.length} Jobs Found
                        </span>
                    </div>

                    {/* LOADING */}
                    {isLoading ? (
                        <div className="rounded-xl border bg-white p-10 text-center">
                            <i className="fa-solid fa-spinner fa-spin mb-3 text-3xl text-blue-600"></i>

                            <p className="font-semibold text-gray-600">
                                Fetching Job Details...
                            </p>
                        </div>
                    ) : message ? (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-center font-semibold text-red-600">
                            {message}
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                            <i className="fa-solid fa-briefcase mb-4 text-4xl text-gray-300"></i>

                            <h3 className="text-lg font-bold text-gray-700">
                                No Jobs Found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try changing your filters to find more
                                opportunities.
                            </p>

                            <button
                                onClick={clearFilters}
                                className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        /* JOB CARDS */
                        <div className="flex flex-col gap-4">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.jobId}
                                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md"
                                >
                                    {message && (
                                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                            <i className="fa-solid fa-circle-info mr-2"></i>
                                            {message}
                                        </div>
                                    )}

                                    {/* JOB TITLE AND APPLY BUTTON */}
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {job.title}
                                            </h3>

                                            <p className="mt-1 font-semibold text-blue-700">
                                                {job.company}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleApply(job)}
                                            disabled={appliedJobIds.includes(
                                                job.jobId,
                                            )}
                                            className={`rounded-lg px-5 py-2 text-normal font-bold transition ${
                                                appliedJobIds.includes(
                                                    job.jobId,
                                                )
                                                    ? "cursor-not-allowed bg-green-100 text-green-700"
                                                    : "cursor-pointer border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                            }`}
                                        >
                                            <i
                                                className={`fa-solid ${
                                                    appliedJobIds.includes(
                                                        job.jobId,
                                                    )
                                                        ? "fa-check"
                                                        : "fa-paper-plane"
                                                } mr-2`}
                                            ></i>

                                            {appliedJobIds.includes(job.jobId)
                                                ? "APPLIED"
                                                : "APPLY"}
                                        </button>
                                    </div>

                                    <hr className="my-2 border-gray-100" />

                                    {/* JOB DETAILS */}
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                        <p>
                                            <i className="fa-solid fa-location-dot mr-2 text-blue-500"></i>
                                            {job.location || "Not specified"}
                                            {" | "}
                                        </p>

                                        <p>
                                            <i className="fa-solid fa-indian-rupee-sign mr-2 text-green-600"></i>
                                            {formatSalary(job.minSalary)} -{" "}
                                            {formatSalary(job.maxSalary)} LPA
                                            {" | "}
                                        </p>

                                        <p>
                                            <i className="fa-solid fa-briefcase mr-2 text-gray-500"></i>
                                            {job.minExperience ?? "N/A"} -{" "}
                                            {job.maxExperience ?? "N/A"} Years
                                        </p>
                                    </div>

                                    {/* JOB TAGS */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            {formatLabel(job.jobType)}
                                        </span>

                                        <span className="rounded-md bg-gray-300 px-3 py-1 text-xs font-semibold text-black">
                                            {formatLabel(job.workMode)}
                                        </span>

                                        <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {formatLabel(job.category)}
                                        </span>

                                        {job.openings != null && (
                                            <span className="rounded-md bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                                <i className="fa-solid fa-users mr-1"></i>
                                                {job.openings} Openings
                                            </span>
                                        )}
                                    </div>

                                    {/* APPLICATION DEADLINE */}
                                    <div className="mt-4 border-t border-gray-100 pt-3">
                                        <p className="text-xs font-medium text-red-600 bg-red-50 w-fit px-2 py-1 rounded-lg">
                                            <i className="fa-regular fa-calendar mr-2"></i>
                                            DEADLINE:{" "}
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
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Jobs;
