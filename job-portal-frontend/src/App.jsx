import React from "react";
import CandidateRegister from "./components/CandidateRegister";
import CompanyRegister from "./components/CompanyRegister";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import Error from "./components/Error";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import PostJob from "./pages/company/PostJob";
import CompanyUpdate from "./pages/company/CompanyUpdate";
import ManageJobs from "./pages/company/ManageJobs";
import ManageJob from "./pages/admin/ManageJob";
import CompanyLayout from "./components/CompanyLayout";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageApplicants from "./pages/company/ManageApplicants";
import UpdateJob from "./pages/company/UpdateJob";
import Companies from "./pages/admin/Companies";
import Admins from "./pages/admin/Admins";
import Candidates from "./pages/admin/Candidates";
import AdminProfile from "./pages/admin/AdminProfile";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* public page */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/signup" element={<AdminRegister />} />
                    <Route
                        path="/candidate/signup"
                        element={<CandidateRegister />}
                    />
                    <Route
                        path="/company/signup"
                        element={<CompanyRegister />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                </Route>

                {/* company page */}
                <Route path="/company" element={<CompanyLayout />}>
                    <Route path="dashboard" element={<CompanyDashboard />} />
                    <Route path="post-job" element={<PostJob />} />
                    <Route path="profile" element={<CompanyUpdate />} />
                    <Route path="manage-jobs" element={<ManageJobs />} />
                    <Route
                        path="update-job/:jobId"
                        element={<UpdateJob />}
                    ></Route>
                    <Route
                        path="manage-applicants"
                        element={<ManageApplicants />}
                    />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="manage-jobs" element={<ManageJob />} />
                    <Route path="companies" element={<Companies />} />
                    <Route path="admins" element={<Admins />} />
                    <Route path="candidates" element={<Candidates />} />
                    <Route path="profile" element={<AdminProfile />} />
                </Route>

                {/* Error page */}
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
