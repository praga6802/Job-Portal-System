import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api.js";
import CompanySidebar from "./CompanySidebar";
import CompanyNavbar from "./CompanyNavbar";
import Button from "../../components/Button";

const PostJob = () => {
    const [company, setCompany] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [job, setJob] = useState({
        title: "",
        description: "",
        skills: "",
        category: "",
        jobType: "",
        workMode: "",
        location: "",
        minSalary: "",
        maxSalary: "",
        minExperience: "",
        maxExperience: "",
        type: "",
        openings: "",
        deadline: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setJob((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setJob({
            title: "",
            description: "",
            skills: "",
            category: "",
            jobType: "",
            workMode: "",
            location: "",
            minSalary: "",
            maxSalary: "",
            minExperience: "",
            maxExperience: "",
            type: "",
            openings: "",
            deadline: "",
        });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axiosInstance.post(
                "http://localhost:8080/auth/company/post-job",
                {
                    ...job,
                    minSalary: Number(job.minSalary),
                    maxSalary: Number(job.maxSalary),
                    minExperience: job.minExperience,
                    maxExperience: job.maxExperience,
                    openings: job.openings ? Number(job.openings) : null,
                },
                {
                    withCredentials: true,
                },
            );

            setMessage(response?.data?.message);

            setTimeout(() => {
                setJob({
                    title: "",
                    description: "",
                    skills: "",
                    category: "",
                    jobType: "",
                    workMode: "",
                    location: "",
                    minSalary: "",
                    maxSalary: "",
                    minExperience: "",
                    maxExperience: "",
                    type: "",
                    openings: "",
                    deadline: "",
                });
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message);
        }
    };

    const inputStyle =
        "w-full rounded-md border border-gray-300 px-2 py-1 outline-none focus:border-blue-800 focus:ring-1 text-sm focus:ring-blue-800";

    const labelStyle = "mb-1 block text-sm font-sm text-gray-700";

    return (
        <div className="min-h-screen bg-gray-100 flex justify-between">
            {isLoading ? (
                <p>Fetching Company details</p>
            ) : message ? (
                <p className="m-5 h-fit w-fit mx-auto p-2 rounded-lg text-center border border-1 border-red-500 text-red-600 font-semibold">
                    {message}
                </p>
            ) : company ? (
                <>
                    <CompanySidebar />

                    <div className="mx-auto mt-7 mb-5 w-2xl h-auto rounded-xl bg-white shadow-sm p-10">
                        <h1 className="mb-2 text-3xl font-bold text-blue-950 text-center">
                            POST JOB
                        </h1>

                        {message && (
                            <p className="mb-5 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
                                {message}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="border-b pb-1 text-lg font-semibold text-gray-800">
                                Basic Information
                            </h2>

                            <div>
                                <label className={labelStyle}>
                                    Job Title *
                                </label>
                                <input
                                    className={inputStyle}
                                    name="title"
                                    value={job.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Java Developer"
                                    required
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className={labelStyle}>
                                        Category *
                                    </label>
                                    <select
                                        className={inputStyle}
                                        name="category"
                                        value={job.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option
                                            value=""
                                            hidden
                                            disabled
                                            selected
                                        >
                                            Select Category
                                        </option>
                                        <option value="IT">
                                            Information Technology
                                        </option>
                                        <option value="SOFTWARE_DEVELOPMENT">
                                            Software Development
                                        </option>
                                        <option value="DATA_ANALYTICS">
                                            Data Analytics
                                        </option>
                                        <option value="DESIGN">Design</option>
                                        <option value="MARKETING">
                                            Marketing
                                        </option>
                                        <option value="FINANCE">Finance</option>
                                        <option value="HR">
                                            Human Resources
                                        </option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Job Type *
                                    </label>
                                    <select
                                        className={inputStyle}
                                        name="jobType"
                                        value={job.jobType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option
                                            value=""
                                            hidden
                                            disabled
                                            selected
                                        >
                                            Select Job Type
                                        </option>
                                        <option value="FULL_TIME">
                                            Full-time
                                        </option>
                                        <option value="PART_TIME">
                                            Part-time
                                        </option>
                                        <option value="CONTRACT">
                                            Contract
                                        </option>
                                        <option value="INTERNSHIP">
                                            Internship
                                        </option>
                                        <option value="FREELANCE">
                                            Freelance
                                        </option>
                                        <option value="TEMPORARY">
                                            Temporary
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Work Mode *
                                    </label>
                                    <select
                                        className={inputStyle}
                                        name="workMode"
                                        value={job.workMode}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option
                                            value=""
                                            hidden
                                            disabled
                                            selected
                                        >
                                            Select Work Mode
                                        </option>
                                        <option value="ONSITE">On-site</option>
                                        <option value="REMOTE">Remote</option>
                                        <option value="HYBRID">Hybrid</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Location *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        name="location"
                                        value={job.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Chennai"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Job Description */}
                            <h2 className="border-b pb-2 text-lg font-semibold text-gray-800">
                                Job Description
                            </h2>

                            <div>
                                <label className={labelStyle}>
                                    Description *
                                </label>
                                <textarea
                                    className={inputStyle}
                                    name="description"
                                    value={job.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Describe the role and responsibilities..."
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Required Skills *
                                </label>
                                <input
                                    className={inputStyle}
                                    name="skills"
                                    value={job.skills}
                                    onChange={handleChange}
                                    placeholder="Java, Spring Boot, React, MySQL"
                                    required
                                />
                            </div>

                            <h2 className="border-b pb-2 text-lg font-semibold text-gray-800">
                                Experience and Salary
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className={labelStyle}>
                                        Minimum Experience (years) *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        type="number"
                                        name="minExperience"
                                        value={job.minExperience}
                                        onChange={handleChange}
                                        min="0"
                                        max="60"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Maximum Experience (years) *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        type="number"
                                        name="maxExperience"
                                        value={job.maxExperience}
                                        onChange={handleChange}
                                        min={
                                            job.minExperience === ""
                                                ? "0"
                                                : job.minExperience
                                        }
                                        max="60"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Minimum Salary (₹ per year) *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        type="number"
                                        name="minSalary"
                                        value={job.minSalary}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Maximum Salary (₹ per year) *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        type="number"
                                        name="maxSalary"
                                        value={job.maxSalary}
                                        onChange={handleChange}
                                        min={
                                            job.minSalary === ""
                                                ? "0"
                                                : job.minSalary
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Number of Openings *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        type="number"
                                        name="openings"
                                        value={job.openings}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Application Deadline *
                                    </label>
                                    <input
                                        className={inputStyle}
                                        type="date"
                                        name="deadline"
                                        value={job.deadline}
                                        onChange={handleChange}
                                        min={(() => {
                                            const deadline = new Date();
                                            deadline.setDate(
                                                deadline.getDate() + 1,
                                            );

                                            return `${deadline.getFullYear()}-${String(
                                                deadline.getMonth() + 1,
                                            ).padStart(2, "0")}-${String(
                                                deadline.getDate(),
                                            ).padStart(2, "0")}`;
                                        })()}
                                        required
                                    />
                                </div>
                            </div>

                            <Button name="Post Job" />
                        </form>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default PostJob;
