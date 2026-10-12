import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-4 text-white">
            <div className="text-center mt-30">
                <h1 className="text-5xl font-extrabold text-red-500">404</h1>

                <h2 className="mt-4 text-3xl font-bold text-yellow-500">
                    Page Not Found!
                </h2>

                <p className="mt-4 text-lg text-blue-100">
                    Oops! The page you are looking for doesn't exist or has been
                    moved.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 transition hover:bg-yellow-500 hover:text-blue-950"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
