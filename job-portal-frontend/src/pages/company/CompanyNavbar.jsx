import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const CompanyNavbar = ({ company }) => {
    const navigate = useNavigate();
    const handleMenuChange = (e) => {
        if (e.target.value === "logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login", { replace: true });
        }
    };
    return (
        <>
            <div className="flex justify-between bg-blue-950 items-center py-2 px-5 text-white">
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="Company Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="text-xl font-bold hover:text-yellow-500">
                            Job Portal
                        </span>
                    </Link>
                </div>

                <div className="flex justify-end bg-blue-950">
                    <div className="font-bold mt-4 flex justify-end p-2 border border-1 border-gray-500 rounded-xl">
                        <div className="bg-blue-500 p-2 rounded-4xl flex items-center text-center border border-2">
                            <p className="text-2xl h-6 w-5">
                                <i className="fa-solid fa-building"></i>
                            </p>
                        </div>
                        <select
                            name="companyMenu"
                            defaultValue="company"
                            className="p-2 rounded-xl text-white"
                            onChange={handleMenuChange}
                        >
                            <option
                                value="company"
                                className="text-black font-semibold"
                                disabled
                            >
                                {company?.name ?? "Company"}
                            </option>
                            <option
                                value="logout"
                                className="text-black font-semibold"
                            >
                                Logout
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyNavbar;
