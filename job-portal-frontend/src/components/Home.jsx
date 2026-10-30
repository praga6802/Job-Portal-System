import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../services/api.js";
import suitcase from "../assets/suitcase.png";
import Jobs from "./Jobs.jsx";
import FeaturedJobs from "./FeaturedJobs.jsx";
const Home = () => {
    const [candidate, setCandidate] = useState(null);
    const [categories, setCategories] = useState([]);

    const fetchCandidate = async () => {
        try {
            const response = await apiInstance.get("/auth/candidate/current");
            setCandidate(response.data.data);
        } catch (error) {
            setCandidate(null);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await apiInstance.get("/auth/categories");
            setCategories(response.data.data);
        } catch (error) {
            setCategories(null);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchCandidate();
    }, []);

    const categoryIcons = {
        SOFTWARE_DEVELOPMENT: {
            icon: "fa-solid fa-code",
            color: "text-blue-500",
        },
        DATA_ANALYTICS: {
            icon: "fa-solid fa-chart-line",
            color: "text-purple-500",
        },
        HR: {
            icon: "fa-solid fa-users",
            color: "text-green-500",
        },
        DESIGN: {
            icon: "fa-solid fa-palette",
            color: "text-pink-500",
        },
        MARKETING: {
            icon: "fa-solid fa-bullhorn",
            color: "text-orange-500",
        },
        FINANCE: {
            icon: "fa-solid fa-coins",
            color: "text-yellow-500",
        },
        OTHER: {
            icon: "fa-solid fa-briefcase",
            color: "text-gray-500",
        },
        IT: {
            icon: "fa-solid fa-laptop-code",
            color: "text-cyan-500",
        },
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <section className="bg-blue-950 px-6 py-20 text-center text-white md:py-28">
                <p className="mb-4 font-semibold uppercase tracking-widest text-yellow-400">
                    Your Career Starts Here
                </p>

                <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                    Find Your Dream Job
                    <span className="block text-yellow-400">
                        Build Your Future
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                    Discover opportunities, connect with top companies, and take
                    the next step in your career.
                </p>

                <form
                    className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-3 shadow-xl sm:flex-row"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-600"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3 text-slate-800 outline-none focus:border-blue-600"
                    />

                    <Link
                        to="/jobs"
                        className="rounded-lg bg-blue-950 px-7 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
                    >
                        Search Jobs
                    </Link>
                </form>

                <p className="mt-5 text-normal font-semibold text-yellow-500">
                    Popular: Java Developer · React Developer · Data Analyst
                </p>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-blue-950">
                        EXPLORE JOB CATEGORIES
                    </h2>
                    <p className="mt-3 text-slate-500 text-lg">
                        Find opportunities that match your skills.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
                    {categories.map((category) => (
                        <Link
                            to="/jobs"
                            key={category.category}
                            className="rounded-xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                        >
                            <i
                                className={` ${categoryIcons[category.category].color} text-3xl ${categoryIcons[category.category].icon}`}
                            ></i>
                            <h3 className=" text-normal mt-4 font-bold text-blue-950">
                                {category.category.includes("_")
                                    ? category.category.replaceAll("_", " ")
                                    : category.category}
                            </h3>
                            <p className="mt-2 text-lg font-semibold text-red-600">
                                {category.count}+ jobs
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-blue-950">
                                Featured Jobs
                            </h2>
                            <p className="mt-2 text-slate-500">
                                Explore opportunities selected for you.
                            </p>
                        </div>

                        <Link
                            to="/jobs"
                            className="font-semibold text-blue-800 hover:text-yellow-600"
                        >
                            View All Jobs →
                        </Link>
                    </div>

                    <FeaturedJobs />
                </div>
            </section>

            {/* Call to action */}
            {!candidate && (
                <section className="bg-blue-950 px-6 py-16 text-center text-white">
                    <h2 className="text-3xl font-bold">
                        Ready to Take the Next Step?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-blue-200">
                        Create your account, explore opportunities, and move
                        closer to your career goals.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/candidate/signup"
                            className="rounded-lg bg-yellow-400 px-6 py-3 font-bold text-blue-950 transition hover:bg-yellow-300"
                        >
                            Create Account
                        </Link>

                        <Link
                            to="/login"
                            className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-950"
                        >
                            Login
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
