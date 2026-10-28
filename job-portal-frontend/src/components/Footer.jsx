import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../services/api.js";
import mailpng from "../assets/mail.png";

const Footer = () => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await apiInstance.get(
                    "/auth/candidate/current",
                );
                setCandidate(response.data.data);
            } catch (error) {
                setCandidate(null);
            }
        };

        fetchCandidate();
    }, []);

    return (
        <footer className="bg-black text-white">
            {candidate ? (
                <>
                    <div className="mx-auto grid grid-cols-1 gap-130 px-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <h2 className="text-2xl font-semibold text-yellow-300">
                                JobPortal
                            </h2>

                            <p className="mt-4 leading-7 text-gray-300">
                                Find your dream job and connect with top
                                companies. Build your career with the right
                                opportunities.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-semibold text-yellow-300">
                                Quick Links
                            </h3>

                            <ul className="space-y-3 text-gray-300">
                                <li>
                                    <Link
                                        to="/"
                                        className="transition hover:text-blue-300"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/jobs"
                                        className="transition hover:text-blue-300"
                                    >
                                        Browse jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="transition hover:text-blue-300"
                                    >
                                        Contact
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/about"
                                        className="transition hover:text-blue-300"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-semibold text-yellow-300">
                                Contact Us
                            </h3>
                            <p className="flex items-center gap-3 text-white mb-5">
                                <img
                                    src={mailpng}
                                    alt="Email"
                                    className="h-5 w-5 object-contain"
                                />
                                support@jobportal.com
                            </p>
                            <p className="text-gray-300">
                                Start your career journey with us.
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mx-auto grid max-w-8xl grid-cols-1 gap-50 px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-yellow-300">
                                JobPortal
                            </h2>

                            <p className="mt-4 leading-7 text-gray-300">
                                Find your dream job and connect with top
                                companies. Build your career with the right
                                opportunities.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-semibold text-yellow-300">
                                Quick Links
                            </h3>

                            <ul className="space-y-3 text-gray-300">
                                <li>
                                    <Link
                                        to="/"
                                        className="transition hover:text-blue-300"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/candidate/signup"
                                        className="transition hover:text-blue-300"
                                    >
                                        Candidate Registration
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/company/signup"
                                        className="transition hover:text-blue-300"
                                    >
                                        Company Registration
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-semibold text-yellow-300">
                                For Employers
                            </h3>

                            <ul className="space-y-3 text-gray-300">
                                <li>
                                    <Link
                                        to="/login"
                                        className="transition hover:text-blue-300"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/jobs"
                                        className="transition hover:text-blue-300"
                                    >
                                        Browse Jobs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-semibold text-yellow-300">
                                Contact Us
                            </h3>
                            <p className="flex items-center gap-3 text-white mb-5">
                                <img
                                    src={mailpng}
                                    alt="Email"
                                    className="h-5 w-5 object-contain"
                                />
                                support@jobportal.com
                            </p>
                            <p className="text-gray-300">
                                Start your career journey with us.
                            </p>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-blue-800 py-2 text-center font-medium text-gray-200">
                <p>
                    © {new Date().getFullYear()} JobPortal. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
