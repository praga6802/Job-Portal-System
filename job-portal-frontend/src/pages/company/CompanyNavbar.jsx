import React from "react";
import { useNavigate } from "react-router-dom";

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
            <div className="font-bold mt-4 bg-white flex justify-end p-2">
                <div className="bg-blue-100 p-4 rounded-4xl flex items-center text-center">
                    <p className="text-2xl h-5 w-5">
                        <i className="fa-solid fa-building"></i>
                    </p>
                </div>
                <select
                    name="companyMenu"
                    defaultValue="company"
                    className="p-2 rounded-xl text-black"
                    onChange={handleMenuChange}
                >
                    <option value="company">{company.name}</option>
                    <option value="logout">Logout</option>
                </select>
            </div>
        </>
    );
};

export default CompanyNavbar;
