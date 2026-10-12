import React from "react";
import suitcase from "../../assets/suitcase.png";
import { Link } from "react-router-dom";
import "../../styles/company-dashboard.css";
const CompanyDashboard = () => {
    return (
        <div className="flex justify-between">
            <aside className="min-h-screen bg-blue-950 w-50 text-white flex flex-col justify-between ">
                <div>
                    <div className="p-3">
                        <p className="flex gap-2">
                            <img
                                src={suitcase}
                                alt="suticase"
                                height={10}
                                width={20}
                            />
                            <h1 className="text-xl text-blue-300 font-bold">
                                Job Portal
                            </h1>
                        </p>
                        <h5 className=" mt-1 ms-6 text-sm text-white font-bold">
                            Company Panel
                        </h5>
                    </div>

                    <div className="company-sidebar">
                        <ul className="bg-black p-4 w-full">
                            <li className="company-sidebar-link">
                                <Link to="/company/dashboard">
                                    <i class="fa-solid fa-border-all"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="company-sidebar-link">
                                <Link to="/company/profile">
                                    <i class="fa-regular fa-building"></i>
                                    Company Profile
                                </Link>
                            </li>
                            <li className="company-sidebar-link">
                                <Link to="/company/post-job">
                                    <i class="fa-solid fa-circle-plus"></i> Post
                                    Job
                                </Link>
                            </li>
                            <li className="company-sidebar-link">
                                <Link to="/company/manage-jobs">
                                    <i class="fa-solid fa-chart-gantt"></i>{" "}
                                    Manage Jobs
                                </Link>
                            </li>
                            <li className="company-sidebar-link">
                                <Link to="/company/applicants">
                                    <i class="fa-solid fa-user"></i> Applicants
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center items-center mr-10 mb-4 hover:text-yellow-400">
                    <Link>
                        Logout <i class="fa-solid fa-power-off"></i>{" "}
                    </Link>
                </div>
            </aside>

            <section className="bg-gray-200 w-full">
                <div className="font-bold mt-4 bg-white flex justify-end p-2">
                    <div className="bg-blue-100 p-4 rounded-4xl flex items-center text-center">
                        <p className="text-2xl h-5 w-5">
                            <i class="fa-solid fa-building"></i>
                        </p>
                    </div>
                    <select name="" id="" className="p-2 rounded-xl text-black">
                        <option value="">Company Name</option>
                        <option value="">Logout</option>
                    </select>
                </div>

                <div className="flex gap-5 m-5">
                    <div className="text-4xl">
                        <i class="fa-solid fa-building"></i>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">
                            Hello Company Name!
                        </h3>
                        <p className="text-sm text-slate-600">
                            Here's an overview of your hiring activity and
                            applications.
                        </p>
                    </div>
                </div>

                <div className="flex gap-10">
                    <div className="grid grid-cols-2 gap-10 bg-white text-center ms-4 p-5 w-300 rounded-xl">
                        <div className="border border-2 w-100 ms-40 p-5 rounded-lg">
                            <p className="text-3xl text-blue-400">
                                <i class="fa-solid fa-suitcase"></i>
                            </p>
                            <h2 className="font-bold text-lg">Total Jobs</h2>
                            <h6 className="text-2xl font-bold">Count</h6>
                        </div>
                        <div className="border border-2 w-100 p-5 rounded-lg">
                            <p className="text-green-400 text-3xl">
                                <i class="fa-solid fa-users"></i>
                            </p>
                            <h2 className="font-bold text-lg">Applicants</h2>
                            <h6 className="text-2xl font-bold">Count</h6>
                        </div>
                        <div className="border border-2 w-100 ms-40 p-5 rounded-lg">
                            <p className="text-3xl text-green-400">
                                <i class="fa-regular fa-circle-check"></i>
                            </p>

                            <h2 className="font-bold text-lg">Approved</h2>
                            <h6 className="font-bold text-2xl">Count</h6>
                        </div>
                        <div className="border border-2 w-100 p-5 rounded-lg">
                            <p className="text-3xl text-yellow-500">
                                <i class="fa-regular fa-clock"></i>
                            </p>
                            <h2 className="font-bold text-lg">Pending</h2>
                            <h6 className="text-2xl font-bold">Count</h6>
                        </div>
                    </div>

                    <div className="bg-white p-10 w-110 rounded-xl">
                        <div className="flex justify-start gap-2 mb-2">
                            <div className="bg-blue-100 p-2 rounded-4xl flex items-center text-center mt-2">
                                <p className="text-2xl h-5 w-10">
                                    <i class="fa-solid fa-building"></i>
                                </p>
                            </div>

                            <div className="bg-gray-50 w-full p-2">
                                <h1 className="font-bold text-lg">
                                    Company Name
                                </h1>
                                <h3 className="text-sm">Company Slogan</h3>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col items-start">
                            <div className="flex gap-3 justify-center items-center mt-2 mb-3">
                                <div>
                                    <p>
                                        <i class="fa-solid fa-envelope"></i>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-normal">
                                        Email
                                    </h3>
                                    <h4>company@gmail.com</h4>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center items-center mb-3">
                                <div>
                                    <p>
                                        <i class="fa-solid fa-globe"></i>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-normal">
                                        Website
                                    </h3>
                                    <h4>http://website.com</h4>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center items-center mb-3">
                                <div>
                                    <p>
                                        <i class="fa-solid fa-location-dot"></i>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-normal">
                                        Location
                                    </h3>
                                    <h4>Chennai, Tamil Nadu</h4>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link to="/company/update">
                                <div className="flex gap-3 justify-center mt-6 items-center border border-1 border-blue-700 p-2 text-blue-700 rounded-lg">
                                    <p>
                                        <i class="fa-solid fa-pencil"></i>
                                    </p>
                                    <span>Edit Profile</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CompanyDashboard;
