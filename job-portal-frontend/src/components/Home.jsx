import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const categories = [
        { name: "Software Development", icon: "💻", jobs: "60+ Jobs" },
        { name: "Data Science", icon: "📊", jobs: "20+ Jobs" },
        { name: "UI/UX Design", icon: "🎨", jobs: "30+ Jobs" },
        { name: "Marketing", icon: "📢", jobs: "40+ Jobs" },
    ];

    const jobs = [
        {
            title: "Java Developer",
            company: "Tech Solutions",
            location: "Chennai",
            type: "Full Time",
            salary: "₹4–8 LPA",
        },
        {
            title: "Frontend Developer",
            company: "Digital Innovations",
            location: "Bengaluru",
            type: "Full Time",
            salary: "₹5–10 LPA",
        },
        {
            title: "Backend Developer",
            company: "Cloud Systems",
            location: "Remote",
            type: "Remote",
            salary: "₹6–12 LPA",
        },
    ];

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

                <p className="mt-5 text-sm text-blue-200">
                    Popular: Java Developer · React Developer · Data Analyst
                </p>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-blue-950">
                        Explore Job Categories
                    </h2>
                    <p className="mt-3 text-slate-500 text-lg">
                        Find opportunities that match your skills.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            to="/jobs"
                            key={category.name}
                            className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                        >
                            <span className="text-3xl">{category.icon}</span>
                            <h3 className="mt-4 font-bold text-blue-950">
                                {category.name}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                {category.jobs}
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

                    <div className="grid gap-6 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <article
                                key={job.title}
                                className="rounded-xl border border-slate-200 p-6 transition hover:border-blue-300 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-950">
                                        {job.company.charAt(0)}
                                    </div>
                                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                        {job.type}
                                    </span>
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-blue-950">
                                    {job.title}
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    {job.company}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
                                    <span>📍 {job.location}</span>
                                    <span>💰 {job.salary}</span>
                                </div>

                                <Link
                                    to="/login"
                                    className="mt-6 block rounded-lg border border-blue-950 px-4 py-2.5 text-center font-semibold text-blue-950 transition hover:bg-yellow-300 hover:text-slate-800 hover:border-none"
                                >
                                    Apply Now
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="bg-blue-950 px-6 py-16 text-center text-white">
                <h2 className="text-3xl font-bold">
                    Ready to Take the Next Step?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-blue-200">
                    Create your account, explore opportunities, and move closer
                    to your career goals.
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
        </div>
    );
};

export default Home;
