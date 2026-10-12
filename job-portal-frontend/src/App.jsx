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

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/admin/signup" element={<AdminRegister />}></Route>
                <Route
                    path="/candidate/signup"
                    element={<CandidateRegister />}
                ></Route>
                <Route
                    path="/company/signup"
                    element={<CompanyRegister />}
                ></Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer/>
        </Router>
    );
};

export default App;
