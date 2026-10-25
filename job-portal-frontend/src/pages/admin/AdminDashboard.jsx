import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axiosInstance from "../../services/api.js";

const AdminDashboard = () => {
    const [jobCount, setJobCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [companiesCount, setCompaniesCount] = useState(0);
    const [candidateCount, setCandidateCount] = useState(0);
    const [applicantsCount, setApplicantsCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const { admin } = useOutletContext();

    useEffect(() => {
        const fetchAdminsCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/admins-count",
                );
                setAdminCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch admins Count");
                console.error(`status: ${err.response?.status}`);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchAdminsCount();
    }, []);

    useEffect(() => {
        const fetchCandidatesCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/candidates-count",
                );
                setCandidateCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch candidates Count");
                console.error(`status: ${err.response?.status}`);
                console.log(err);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchCandidatesCount();
    }, []);

    useEffect(() => {
        const fetchCompaniesCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/companies-count",
                );
                setCompaniesCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch companies Count");
                console.error(`status: ${err.response?.status}`);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchCompaniesCount();
    }, []);

    useEffect(() => {
        const fetchJobsCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/jobs-count",
                );
                setJobCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch job Count");
                console.error(`status: ${err.response?.status}`);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchJobsCount();
    }, []);

    useEffect(() => {
        const fetchApplicantsCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/applications-count",
                );
                setApplicantsCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch applications Count");
                console.error(`status: ${err.response?.status}`);
                console.log(err);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchApplicantsCount();
    }, []);

    useEffect(() => {
        const fetchApprovedCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/approved-count",
                );
                setApprovedCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Approved Jobs Count");
                console.error(`status: ${err.response?.status}`);
                console.log(err);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchApprovedCount();
    }, []);

    useEffect(() => {
        const fetchRejectedCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/rejected-count",
                );
                setRejectedCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Rejected Jobs Count");
                console.error(`status: ${err.response?.status}`);
                console.log(err);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchRejectedCount();
    }, []);

    useEffect(() => {
        const fetchPendingCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/admin/pending-count",
                );
                setPendingCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Pending Jobs Count");
                console.error(`status: ${err.response?.status}`);
                console.log(err);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchPendingCount();
    }, []);

    // fetch all jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get("/auth/admin/jobs");
                setJobs(response?.data);
                console.log(response?.data);
            } catch (err) {
                console.error("Failed to fetch jobs");
                console.error(`status: ${err.response?.status}`);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchJobs();
    }, []);

    const rejectedJobs = jobs.filter((job) => job.status === "REJECTED");
    const approvedJobs = jobs.filter((job) => job.status === "APPROVED");
    const pendingJobs = jobs.filter((job) => job.status === "PENDING");

    const cardStyle1 =
        "border border-2 border-gray-400 p-2 rounded-lg col-span-2 w-50";

    const cardLabel = "font-bold text-lg text-gray-500";
    const cardValue = "text-4xl font-bold";

    const cardHead = "font-bold text-lg";

    const statusListStyle =
        "bg-white p-4 w-full border border-1 border-gray-500 rounded-lg flex flex-col items-center";
    const jobCardStyle =
        "border border-1 border-gray-400 rounded-lg p-3 mt-2 w-full h-auto";

    const statusMessage =
        "text-sm border border-1 text-center p-2 w-full rounded-lg font-semibold";

    const statusBadge = "border-1 p-1 rounded-lg";

    return (
        <>
            {/* welcome board*/}
            <div className="m-2 w-fit p-2 bg-white rounded-xl">
                <div className="flex gap-5 m-5 h-fit p-2 bg-yellow-100 p-2 rounded-lg">
                    <div className="p-2">
                        <h3 className="font-bold text-xl">
                            Hello {admin.firstname}, Welcome to admin dashboard!
                        </h3>
                        <p className="text-sm text-slate-600">
                            Manage users, monitor hiring activity, and keep the
                            recruitment process running smoothly.
                        </p>
                    </div>
                </div>

                <div className="flex gap-10">
                    {loading ? (
                        <p>Admin details loading...</p>
                    ) : (
                        <div className="grid grid-cols-8 h-fit gap-10 bg-white text-center ms-4 p-3 w-300 rounded-xl">
                            <div className={cardStyle1}>
                                <p className="text-3xl text-blue-400">
                                    <i className="fa-solid fa-user-tie"></i>
                                </p>
                                <h2 className={cardLabel}>Admins</h2>
                                <h6 className={cardValue}>{adminCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-3xl text-green-600">
                                    <i className="fa-solid fa-users"></i>
                                </p>
                                <h2 className={cardLabel}>Candidates</h2>
                                <h6 className={cardValue}>{candidateCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-3xl text-red-600">
                                    <i className="fa-solid fa-building"></i>
                                </p>
                                <h2 className={cardLabel}>Companies</h2>
                                <h6 className={cardValue}>{companiesCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-3xl text-blue-400">
                                    <i className="fa-solid fa-suitcase"></i>
                                </p>
                                <h2 className={cardLabel}>Total Jobs</h2>
                                <h6 className={cardValue}>{jobCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-green-400 text-3xl">
                                    <i className="fa-solid fa-users"></i>
                                </p>
                                <h2 className={cardLabel}>Applications</h2>
                                <h6 className={cardValue}>{applicantsCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-3xl text-green-400">
                                    <i className="fa-regular fa-circle-check"></i>
                                </p>

                                <h2 className={cardLabel}>Approved Jobs</h2>
                                <h6 className={cardValue}>{approvedCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-3xl text-red-500">
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </p>

                                <h2 className={cardLabel}>Rejected Jobs</h2>
                                <h6 className={cardValue}>{rejectedCount}</h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-3xl text-yellow-500">
                                    <i className="fa-regular fa-clock"></i>
                                </p>
                                <h2 className={cardLabel}>Pending Jobs</h2>
                                <h6 className={cardValue}>{pendingCount}</h6>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-50 mr-3 p-3 w-100 h-fit rounded-xl border border-1 border-gray-400">
                        <div className="flex justify-start gap-2 mb-2">
                            <div className="bg-blue-500 h-10 w-10 p-1 text-white rounded-3xl flex items-center text-center mt-2 border border-1 border-yellow-600">
                                <p className="text-lg p-2">
                                    <i className="fa-solid fa-id-badge"></i>
                                </p>
                            </div>

                            <div className="bg-white w-full p-2 text-center">
                                <h1 className="font-bold text-xl text-gray-600">
                                    ADMIN INFO
                                </h1>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col items-start bg-white mt-2 p-3 rounded-lg">
                            <div className="flex gap-5">
                                <div className="flex gap-3 justify-center items-center mb-3">
                                    <div>
                                        <p className="text-blue-500">
                                            <i className="fa-solid fa-user"></i>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-normal p-1 ">
                                            First Name
                                        </h3>
                                        <h4 className="border border-1 p-1 rounded-lg border-gray-300">
                                            {admin.firstname}
                                        </h4>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-center items-center mb-3">
                                    <div>
                                        <h3 className="font-semibold text-normal p-1">
                                            Last Name
                                        </h3>
                                        <h4 className="border border-1 border-gray-300 p-1 rounded-lg">
                                            {admin.lastname}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center items-center mb-3">
                                <div>
                                    <p className="text-red-600">
                                        <i className="fa-solid fa-envelope"></i>
                                    </p>
                                </div>
                                <div className="w-full">
                                    <h3 className="font-semibold text-normal p-1">
                                        Email
                                    </h3>
                                    <h4 className="border border-1 border-gray-300 p-1 rounded-lg w-70">
                                        {admin.email}
                                    </h4>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center items-center mb-3">
                                <div>
                                    <p className="text-blue-600">
                                        <i className="fa-solid fa-phone"></i>
                                    </p>
                                </div>
                                <div className="w-full">
                                    <h3 className="font-semibold text-normal">
                                        Contact
                                    </h3>
                                    <h4 className="border border-1 border-gray-300 p-1 rounded-lg w-70">
                                        {admin.contact}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link to="/admin/profile">
                                <div className="flex gap-3 justify-center mt-6 items-center border border-1 border-blue-700 p-2 text-blue-700 rounded-lg font-semibold hover:bg-blue-600 hover:text-white">
                                    <p>
                                        <i className="fa-solid fa-pencil"></i>
                                    </p>
                                    <span>Edit Profile</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job status list */}

            <div className="flex flex-col justify-center bg-white m-2 rounded-lg p-2">
                <h1 className="mt-3 ps-4 p-2 w-full text-2xl rounded-lg text-black font-bold bg-yellow-100">
                    Job Status List
                </h1>

                <div className="mx-2 my-5 rounded-xl flex justify-between gap-5 items-start bg-white border-2 border-gray-300 p-2">
                    {/* APPROVED JOBS */}
                    <div className={statusListStyle}>
                        <div className="flex justify-between items-center gap-10 w-full ps-2">
                            <h1 className={`${cardHead} text-green-600`}>
                                APPROVED Jobs
                            </h1>
                            <p
                                className={`${statusBadge} text-green-600 border-green-600 bg-green-50`}
                            >
                                {approvedCount} Jobs
                            </p>
                        </div>

                        <div className="max-h-64 overflow-y-auto space-y-2 w-full">
                            {approvedJobs.length > 0 ? (
                                approvedJobs.map((job) => (
                                    <div
                                        key={job.jobId}
                                        className={jobCardStyle}
                                    >
                                        <h1 className="text-normal font-semibold mb-1 text-white ps-1 bg-blue-400 rounded-sm">
                                            <span className="pe-3">
                                                <i class="fa-regular fa-building"></i>
                                            </span>
                                            {job.company}
                                        </h1>

                                        <div className="flex justify-between">
                                            <h1 className="font-semibold text-normal">
                                                <span>Job Title: </span>
                                                {job.title}
                                            </h1>
                                            <p className="p-1 text-xs border border-1 border-green-500 rounded-xl bg-green-100 text-green-600 font-semibold">
                                                {job.jobType}
                                            </p>
                                        </div>
                                        <h1 className="text-normal">
                                            <span className="font-semibold">
                                                Skills:
                                            </span>{" "}
                                            {job.skills}
                                        </h1>
                                        <div className="flex gap-3 text-sm">
                                            <h1>
                                                <span className="font-semibold text-blue-600">
                                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                                </span>
                                                {job.location}
                                            </h1>{" "}
                                            |
                                            <h1>
                                                <span className="font-semibold">
                                                    Work Mode:
                                                </span>{" "}
                                                {job.workMode}
                                            </h1>
                                        </div>
                                        <h1 className="bg-blue-100 p-1 text-sm">
                                            <span className="font-semibold">
                                                Posted At:
                                            </span>{" "}
                                            {job.postedAt}
                                        </h1>
                                    </div>
                                ))
                            ) : (
                                <p
                                    className={`${statusMessage} text-green-600 border-green-500 bg-green-50`}
                                >
                                    No Approved jobs!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* REJECTED JOBS */}
                    <div className={statusListStyle}>
                        <div className="flex justify-between items-center gap-10 w-full ps-2">
                            <h1 className={`${cardHead} text-red-600`}>
                                REJECTED Jobs
                            </h1>
                            <p
                                className={`${statusBadge} text-red-600 border-red-600 bg-red-50`}
                            >
                                {rejectedCount} Jobs
                            </p>
                        </div>

                        <div className="max-h-64 overflow-y-auto space-y-2 w-full">
                            {rejectedJobs.length > 0 ? (
                                rejectedJobs.map((job) => (
                                    <div
                                        key={job.jobId}
                                        className={jobCardStyle}
                                    >
                                        <h1 className="text-normal font-semibold mb-1 text-white ps-1 bg-blue-400 rounded-sm">
                                            <span className="pe-3">
                                                <i class="fa-regular fa-building"></i>
                                            </span>
                                            {job.company}
                                        </h1>

                                        <div className="flex justify-between">
                                            <h1 className="font-semibold text-normal">
                                                Role: {job.title}
                                            </h1>
                                            <p className="p-1 text-xs border border-1 border-green-500 rounded-xl bg-green-100 text-green-600 font-semibold">
                                                {job.jobType}
                                            </p>
                                        </div>
                                        <h1 className="text-normal">
                                            <span className="font-semibold">
                                                Skills:
                                            </span>{" "}
                                            {job.skills}
                                        </h1>
                                        <div className="flex gap-3 text-sm">
                                            <h1>
                                                <span className="font-semibold text-blue-600">
                                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                                </span>
                                                {job.location}
                                            </h1>{" "}
                                            |
                                            <h1>
                                                <span className="font-semibold">
                                                    Work Mode:
                                                </span>{" "}
                                                {job.workMode}
                                            </h1>
                                        </div>
                                        <h1 className="bg-blue-100 p-1 text-sm">
                                            <span className="font-semibold">
                                                Posted At:
                                            </span>{" "}
                                            {job.postedAt}
                                        </h1>
                                    </div>
                                ))
                            ) : (
                                <p
                                    className={`${statusMessage} text-red-500 border-red-500 bg-red-50`}
                                >
                                    No Rejected jobs!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* PENDING JOBS */}
                    <div className={statusListStyle}>
                        <div className="flex justify-between items-center gap-10 w-full ps-2">
                            <h1 className={`${cardHead} text-yellow-600`}>
                                PENDING Jobs
                            </h1>
                            <p
                                className={`${statusBadge} text-yellow-600 border-yellow-600 bg-yellow-50`}
                            >
                                {pendingCount} Jobs
                            </p>
                        </div>

                        <div className="max-h-64 overflow-y-auto space-y-2 w-full">
                            {pendingJobs.length > 0 ? (
                                pendingJobs.map((job) => (
                                    <div
                                        key={job.jobId}
                                        className={jobCardStyle}
                                    >
                                        <h1 className="text-normal font-semibold mb-1 text-white ps-1 bg-blue-400 rounded-sm">
                                            <span className="pe-3">
                                                <i class="fa-regular fa-building"></i>
                                            </span>
                                            {job.company}
                                        </h1>

                                        <div className="flex justify-between">
                                            <h1 className="font-semibold text-normal">
                                                Role: {job.title}
                                            </h1>
                                            <p className="p-1 text-xs border border-1 border-green-500 rounded-xl bg-green-100 text-green-600 font-semibold">
                                                {job.jobType}
                                            </p>
                                        </div>
                                        <h1 className="text-normal">
                                            <span className="font-semibold">
                                                Skills:
                                            </span>{" "}
                                            {job.skills}
                                        </h1>
                                        <div className="flex gap-3 text-sm">
                                            <h1>
                                                <span className="font-semibold text-blue-600">
                                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                                </span>
                                                {job.location}
                                            </h1>{" "}
                                            |
                                            <h1>
                                                <span className="font-semibold">
                                                    Work Mode:
                                                </span>{" "}
                                                {job.workMode}
                                            </h1>
                                        </div>
                                        <h1 className="bg-blue-100 p-1 text-sm">
                                            <span className="font-semibold">
                                                Posted At:
                                            </span>{" "}
                                            {job.postedAt}
                                        </h1>
                                    </div>
                                ))
                            ) : (
                                <p
                                    className={`${statusMessage} text-yellow-600 border-yellow-500 bg-yellow-50`}
                                >
                                    No Pending jobs!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
