import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/api.js";

const CompanyMain = ({ company }) => {
    const [jobCount, setJobCount] = useState(0);
    const [applicantsCount, setApplicantsCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobsCount = async () => {
            try {
                const response = await axiosInstance.get(
                    "/auth/company/job-count",
                );
                setJobCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Applicants Count");
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
                    "/auth/company/applicants-count",
                );
                setApplicantsCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Applicants Count");
                console.error(`status: ${err.response?.status}`);
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
                    "/auth/company/approved-count",
                );
                setApprovedCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Approved Jobs Count");
                console.error(`status: ${err.response?.status}`);
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
                    "/auth/company/rejected-count",
                );
                setRejectedCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Rejected Jobs Count");
                console.error(`status: ${err.response?.status}`);
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
                    "/auth/company/pending-count",
                );
                setPendingCount(response?.data?.data);
                console.log(response?.data?.message);
            } catch (err) {
                console.error("Failed to fetch Pending Jobs Count");
                console.error(`status: ${err.response?.status}`);
            } finally {
                setLoading(false);
                return;
            }
        };
        fetchPendingCount();
    }, []);

    const cardStyle1 =
        "border border-2 border-gray-400 p-5 rounded-lg col-span-3";

    const cardStyle2 =
        "border border-2 border-gray-400 p-5 rounded-lg col-span-2";

    return (
        <>
            <div className="flex gap-5 m-5">
                <div className="text-4xl">
                    <i className="fa-solid fa-building"></i>
                </div>

                <div>
                    <h3 className="font-bold text-xl">Hello {company.name}!</h3>
                    <p className="text-sm text-slate-600">
                        Here's an overview of your hiring activity and
                        applications.
                    </p>
                </div>
            </div>

            <div className="flex gap-10">
                {loading ? (
                    <p>Company details loading...</p>
                ) : (
                    <div className="grid grid-cols-6 gap-10 bg-white text-center ms-4 p-5 w-300 rounded-xl">
                        <div className={cardStyle1}>
                            <p className="text-3xl text-blue-400">
                                <i className="fa-solid fa-suitcase"></i>
                            </p>
                            <h2 className="font-bold text-lg">Total Jobs</h2>
                            <h6 className="text-5xl font-bold">{jobCount}</h6>
                        </div>

                        <div className={cardStyle1}>
                            <p className="text-green-400 text-3xl">
                                <i className="fa-solid fa-users"></i>
                            </p>
                            <h2 className="font-bold text-lg">Applicants</h2>
                            <h6 className="text-5xl font-bold">
                                {applicantsCount}
                            </h6>
                        </div>

                        <div className={cardStyle2}>
                            <p className="text-3xl text-green-400">
                                <i className="fa-regular fa-circle-check"></i>
                            </p>

                            <h2 className="font-bold text-lg">Approved</h2>
                            <h6 className="font-bold text-5xl">
                                {approvedCount}
                            </h6>
                        </div>

                        <div className={cardStyle2}>
                            <p className="text-3xl text-red-500">
                                <i className="fa-regular fa-circle-xmark"></i>
                            </p>

                            <h2 className="font-bold text-lg">Rejected</h2>
                            <h6 className="font-bold text-5xl">
                                {approvedCount}
                            </h6>
                        </div>

                        <div className={cardStyle2}>
                            <p className="text-3xl text-yellow-500">
                                <i className="fa-regular fa-clock"></i>
                            </p>
                            <h2 className="font-bold text-lg">Pending</h2>
                            <h6 className="text-5xl font-bold">
                                {pendingCount}
                            </h6>
                        </div>
                    </div>
                )}

                <div className="bg-white p-10 w-110 rounded-xl">
                    <div className="flex justify-start gap-2 mb-2">
                        <div className="bg-blue-100 p-2 rounded-4xl flex items-center text-center mt-2">
                            <p className="text-2xl h-5 w-10">
                                <i className="fa-solid fa-building"></i>
                            </p>
                        </div>

                        <div className="bg-gray-50 w-full p-2">
                            <h1 className="font-bold text-lg">
                                {company.name}
                            </h1>
                            <h3 className="text-sm">{company.description}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col items-start">
                        <div className="flex gap-3 justify-center items-center mt-2 mb-3">
                            <div>
                                <p>
                                    <i className="fa-solid fa-envelope"></i>
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-normal">
                                    Email
                                </h3>
                                <h4>{company.email}</h4>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center items-center mb-3">
                            <div>
                                <p>
                                    <i className="fa-solid fa-globe"></i>
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-normal">
                                    Website
                                </h3>
                                <h4>{company.url}</h4>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center items-center mb-3">
                            <div>
                                <p>
                                    <i className="fa-solid fa-location-dot"></i>
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-normal">
                                    Location
                                </h3>
                                <h4>{company.location}</h4>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Link to="/company/profile">
                            <div className="flex gap-3 justify-center mt-6 items-center border border-1 border-blue-700 p-2 text-blue-700 rounded-lg">
                                <p>
                                    <i className="fa-solid fa-pencil"></i>
                                </p>
                                <span>Edit Profile</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyMain;
