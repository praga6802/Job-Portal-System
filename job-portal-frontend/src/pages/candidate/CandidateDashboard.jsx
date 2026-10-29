import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axiosInstance from "../../services/api.js";

const CandidateDashboard = () => {
    const [appliedJobCount, setAppliedJobCount] = useState(0);
    const [shortlistedCount, setShortlistedCount] = useState(0);
    const [selectedCount, setSelectedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [underReviewCount, setUnderReviewCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { candidate } = useOutletContext();

    const fetchAppliedJobsCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/applied-jobs-count",
            );
            setAppliedJobCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch applied jobs Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setLoading(false);
            return;
        }
    };

    const fetchSelectedCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/selected-count",
            );
            setSelectedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch selected Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setLoading(false);
            return;
        }
    };

    const fetchRejectedCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/rejected-count",
            );
            setRejectedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch selected Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setLoading(false);
            return;
        }
    };

    const fetchShortlistedCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/shortlisted-count",
            );
            setShortlistedCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch selected Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setLoading(false);
            return;
        }
    };

    const fetchUnderReviewCount = async () => {
        try {
            const response = await axiosInstance.get(
                "/auth/candidate/under-review-count",
            );
            setUnderReviewCount(response?.data?.data);
            console.log(response?.data?.message);
        } catch (err) {
            console.error("Failed to fetch selected Count");
            console.error(`status: ${err.response?.status}`);
        } finally {
            setLoading(false);
            return;
        }
    };

    useEffect(() => {
        fetchSelectedCount();
        fetchRejectedCount();
        fetchShortlistedCount();
        fetchUnderReviewCount();
        fetchAppliedJobsCount();
    }, []);

    const cardStyle1 =
        "border border-2 border-gray-400 p-5 rounded-lg col-span-3";

    const cardStyle2 =
        "border border-2 border-gray-400 p-5 rounded-lg col-span-2";

    return (
        <>
            {/* welcome board*/}
            <div className="m-2 w-fit p-2 bg-white rounded-xl">
                <div className="flex gap-5 m-5 h-fit p-2 bg-yellow-100 p-2 rounded-lg">
                    <div className="p-2">
                        <h3 className="font-bold text-xl">
                            Hello,{" "}
                            {`${candidate.firstname} ${candidate.lastname}`}!
                        </h3>
                        <p className="text-sm text-slate-600">
                            Track your job applications and stay updated on your
                            hiring progress.
                        </p>
                    </div>
                </div>

                <div className="flex gap-10">
                    {loading ? (
                        <p>Candidate details loading...</p>
                    ) : (
                        <div className="grid grid-cols-6 h-110 gap-10 bg-white text-center ms-4 p-5 w-300 rounded-xl">
                            <div className={cardStyle1}>
                                <p className="text-3xl text-blue-400">
                                    <i className="fa-regular fa-paper-plane"></i>
                                </p>
                                <h2 className="font-bold text-lg">
                                    Applied Jobs
                                </h2>
                                <h6 className="text-5xl font-bold">
                                    {appliedJobCount}
                                </h6>
                            </div>

                            <div className={cardStyle1}>
                                <p className="text-green-400 text-3xl">
                                    <i className="fa-solid fa-check"></i>
                                </p>
                                <h2 className="font-bold text-lg">Selected</h2>
                                <h6 className="text-5xl font-bold">
                                    {selectedCount}
                                </h6>
                            </div>

                            <div className={cardStyle2}>
                                <p className="text-3xl text-red-400">
                                    <i className="fa-solid fa-ban"></i>
                                </p>

                                <h2 className="font-bold text-lg">Rejected</h2>
                                <h6 className="font-bold text-5xl">
                                    {rejectedCount}
                                </h6>
                            </div>

                            <div className={cardStyle2}>
                                <p className="text-3xl text-purple-500">
                                    <i className="fa-regular fa-clipboard"></i>
                                </p>

                                <h2 className="font-bold text-lg">
                                    Shortlisted
                                </h2>
                                <h6 className="font-bold text-5xl">
                                    {shortlistedCount}
                                </h6>
                            </div>

                            <div className={cardStyle2}>
                                <p className="text-3xl text-yellow-500">
                                    <i className="fa-regular fa-clock"></i>
                                </p>
                                <h2 className="font-bold text-lg">
                                    Under Review
                                </h2>
                                <h6 className="text-5xl font-bold">
                                    {underReviewCount}
                                </h6>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-50 mr-3 p-7 w-100 h-fit rounded-xl border border-1 border-gray-400">
                        <div className="flex justify-start gap-2 mb-2">
                            <div className="bg-blue-500 h-10 w-10 p-1 text-white rounded-3xl flex items-center text-center mt-2 border border-1 border-yellow-600">
                                <p className="text-xl p-2">
                                    <i className="fa-solid fa-user"></i>
                                </p>
                            </div>

                            <div className="bg-white w-full p-2">
                                <div className="flex gap-5 items-center mb-3  text-normal">
                                    <h1 className="font-bold">
                                        {`${candidate.firstname} ${candidate.lastname}`}
                                    </h1>
                                    <p
                                        className={`rounded-lg text-sm h-fit font-semibold px-3 py-1 ${candidate.experience === "Fresher" ? "border-green-500 text-green-500 bg-green-50" : "border-blue-500 bg-blue-50 text-blue-500"}`}
                                    >
                                        {candidate.experience === "Fresher"
                                            ? "Fresher"
                                            : `${candidate.experience} ${Number(candidate.experience) === 1 ? "year" : "years"}`}
                                    </p>
                                </div>

                                <h3 className="text-sm">{candidate.skills}</h3>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col items-start bg-white mt-2 p-3 rounded-lg">
                            <div className="flex gap-3 justify-center items-center mt-2 mb-3">
                                <div>
                                    <p className="text-red-500">
                                        <i className="fa-solid fa-envelope"></i>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-normal ">
                                        Email
                                    </h3>
                                    <h4>{candidate.email}</h4>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center items-center mb-3">
                                <div>
                                    <p className="text-green-500">
                                        <i className="fa-solid fa-phone"></i>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-normal">
                                        Contact
                                    </h3>
                                    <h4>{candidate.contact}</h4>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center items-center mb-3">
                                <div>
                                    <p className="text-purple-600">
                                        <i className="fa-regular fa-calendar"></i>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-normal">
                                        Date of Birth
                                    </h3>
                                    <h4>{candidate.dob}</h4>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link to="/candidate/profile">
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
        </>
    );
};

export default CandidateDashboard;
