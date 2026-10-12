import React from "react";

const About = () => {
    return (
        <section className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-3 text-5xl font-bold text-blue-800">
                        ABOUT US
                    </h1>
                    <p className="text-yellow-600 font-bold text-xl">
                        Connecting talented people with great opportunities!
                    </p>
                </div>

                <div className="mb-8 rounded-xl bg-white p-8 shadow-md border border-1 border-grey-50">
                    <h2 className="mb-4 text-2xl font-bold text-blue-950 text-center ">
                        Welcome to Job Portal
                    </h2>

                    <p className="leading-7 text-gray-800 font-semibold">
                        Platform designed to connect job seekers with companies
                        and simplify the recruitment process. Our goal is to
                        make finding the right job and hiring the right
                        candidate easier and more efficient.
                    </p>
                </div>

                <div>
                    <h1 className="text-3xl text-gray-600 font-bold mb-5 ">
                        Our Mission
                    </h1>
                </div>
                <div className="mt-5 rounded-xl p-8 shadow-md mb-10 border border-2 border-slate-500 bg-blue-950 ">
                    <p className="mx-auto max-w-3xl leading-7 text-white text-center">
                        Our mission is to bridge the gap between talented
                        individuals and employers by providing a simple,
                        reliable, and accessible platform for career
                        opportunities and recruitment.
                    </p>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-5 text-gray-600">
                        What we Offer?
                    </h1>
                </div>
                <div className="grid gap-6 md:grid-cols-3 mb-10">
                    <div className="rounded-xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
                        <div className="mb-3 text-4xl">👨‍💻</div>
                        <h3 className="mb-2 text-lg font-bold text-blue-950">
                            For Job Seekers
                        </h3>
                        <p className="text-gray-600">
                            Explore job opportunities, apply for jobs, and track
                            your applications.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
                        <div className="mb-3 text-4xl">🏢</div>
                        <h3 className="mb-2 text-lg font-bold text-blue-950">
                            For Companies
                        </h3>
                        <p className="text-gray-600">
                            Post job openings, manage applications, and connect
                            with talented candidates.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1">
                        <div className="mb-3 text-4xl">🔐</div>
                        <h3 className="mb-2 text-lg font-bold text-blue-950">
                            Secure Platform
                        </h3>
                        <p className="text-gray-600">
                            Role-based access helps users access features
                            according to their roles.
                        </p>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl text-gray-600 font-bold mb-5 ">
                        Why Choose Us?
                    </h1>
                </div>
                <div className="mt-5 rounded-xl bg-blue-950 p-8 text-center text-white shadow-md mb-10">
                    <p className="mx-auto max-w-3xl leading-7 text-white">
                        We aim to provide a user-friendly experience, secure
                        authentication, efficient job management, and a
                        centralized platform that brings candidates and
                        employers together.
                    </p>
                </div>

                <div>
                    <h1 className="text-3xl text-gray-600 font-bold mb-5">
                        Our Vision
                    </h1>
                </div>
                <div className="mt-5 rounded-xl bg-blue-950 p-8 text-center text-white shadow-md mb-10">
                    <p className="mx-auto max-w-3xl leading-7 text-white">
                        To become a trusted platform that empowers job seekers
                        to achieve their career goals and helps companies build
                        successful teams.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
