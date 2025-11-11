import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdSecurity } from "react-icons/md";

export default function Profile() {
    const { user, token, loading, fetchUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [])

    return (
        <div className="container pt-120 pb-120  text-light min-vh-100">
            <div className="row justify-content-center">
                <div className="col-lg-10">

                    {/* Profile Header */}
                    <div className="card bg-dark text-light mb-4 shadow-sm rounded-4">
                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap p-4">

                            {/* Left side: Avatar + Info */}
                            <div className="d-flex align-items-center gap-3">
                                <Avatar
                                    sx={{ bgcolor: "#1976d2", cursor: "default", margin: "10px" }}
                                >
                                    {user?.first_name?.[0] || "U"}
                                </Avatar>
                                <div>
                                    <h5 className="mb-1 fw-bold">
                                        {user?.first_name} {user?.last_name}
                                    </h5>
                                    <p className="mb-0 text-light">
                                        {/* {user?.role} */}
                                    </p>
                                </div>
                            </div>

                            {/* Right side: Social + Edit */}
                            <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                                <button className="btn btn-outline-light btn-sm ms-2">
                                    <FaEdit /> Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="card bg-dark text-light mb-4 shadow-sm rounded-4">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">Personal Information</h5>
                                {/* <button className="btn btn-outline-light btn-sm"><FaEdit /> Edit</button> */}
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <p className="text-light fs-6 mb-1">First Name</p>
                                    <p className="fw-semibold">{user?.first_name}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="text-light fs-6 mb-1">Last Name</p>
                                    <p className="fw-semibold">{user?.last_name}</p>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <p className="text-light fs-6 mb-1">Email address</p>
                                    <p className="fw-semibold">{user?.email}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="text-light fs-6 mb-1">Phone</p>
                                    <p className="fw-semibold">{user?.phone_number}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-dark text-light shadow-sm rounded-4">
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="fw-bold mb-0 d-flex align-items-center"><MdSecurity />KYC Verification</h5>
                                    <p className="text-light fs-6 mb-1">Please complete your KYC for account verification.</p>
                                </div>
                                <div className="col-md-6 text-end align-middle">
                                   {user?.kyc_status == null ?
                                    <button className="box-style btn-box text-dark" onClick={()=>navigate("/kyc-verification")} >
                                    Start KYC
                                    </button>
                                    :
                                    <button disabled className="box-style btn-box text-dark" onClick={()=>navigate("/kyc-verification")} >
                                       {user?.kyc_status == "pending" ?" In Progress" : user?.kyc_status == "rejected" ? "Try Again" : "Approved"}
                                    </button>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
