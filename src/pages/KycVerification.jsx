import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Modal,
    Box,
    IconButton,
    Tooltip,
    CircularProgress,
} from "@mui/material";
import {
    PhotoCamera,
    Replay,
} from "@mui/icons-material";
import { useUser } from "../context/UserContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
    MdCamera,
    MdCheck,
    MdDriveFolderUpload,
    MdSecurity,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis, baseurl } from "../apis";
import toast, { Toaster } from "react-hot-toast";

const KycVerification = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { user } = useUser();

    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        dob: "",
        selfie: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        id_type: "",
        id_number: "",
        issuing_authority: "",
        expiry_date: "",
        id_front: "",
        id_back: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [activeCapture, setActiveCapture] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const location = useLocation();

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
        }));
    }, [user]);

    const fetchKycDetails = async () => {
        try {
            const res = await axiosWithHeaders.get(apis.GET_KYC);
            console.log("KYC details fetched:", res.data);
            setFormData((prev) => ({
                ...prev,
                ...res?.data?.data,
                selfie:res?.data?.data?.User?.selfie || null,
                dob:res?.data?.data?.User?.dob || null,
            }));
        } catch (error) {
            console.error("Error fetching KYC details:", error);
        }
    };

    useEffect(() => {
        if (location.state?.reapply) {
            fetchKycDetails();
        }
    }, [location.state.reapply]);

    //  Step Navigation with Validation
    const handleNext = () => {
        const valid = validateStep(step);
        if (valid) setStep((prev) => Math.min(prev + 1, 3));
    };

    const handlePrev = () => {
        // Optionally validate before going back (only if you want strict validation)
        setStep((prev) => Math.max(prev - 1, 1));
    };

    //  Validation per step
    const validateStep = (currentStep) => {
        let tempErrors = {};

        if (currentStep === 1) {
            if (!formData.selfie) tempErrors.selfie = "Please capture a selfie.";
            if (!formData.first_name) tempErrors.first_name = "First name is required.";
            if (!formData.last_name) tempErrors.last_name = "Last name is required.";
            if (!formData.email) tempErrors.email = "Email is required.";
            if (!formData.dob) tempErrors.dob = "Date of Birth is required.";
        } else if (currentStep === 2) {
            if (!formData.street) tempErrors.street = "Street address is required.";
            if (!formData.city) tempErrors.city = "City is required.";
            if (!formData.state) tempErrors.state = "State is required.";
            if (!formData.zip) tempErrors.zip = "ZIP code is required.";
        } else if (currentStep === 3) {
            if (!formData.id_front) tempErrors.id_front = "Front side of ID is required.";
            if (!formData.id_back) tempErrors.id_back = "Back side of ID is required.";
            if (!formData.expiry_date) tempErrors.expiry_date = "Expiry date is required.";
            if (!formData.id_number) tempErrors.id_number = "ID number is required.";
            if (!formData.issuing_authority) tempErrors.issuing_authority = "Issuing authority is required.";
            if (!formData.id_type) tempErrors.id_type = "ID type is required.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Open MUI Camera Modal
    const openCamera = async (field) => {
        setActiveCapture(field);
        setCapturedImage(null);
        setOpen(true);

        try {
            const constraints = {
                video: {
                    facingMode:
                        field === "selfie" ? "user" : isMobile ? "environment" : "user",
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Camera error:", error);
            toast.error("Unable to access camera.");
            setOpen(false);
        }
    };

    // Capture photo from camera as binary
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], `${activeCapture}.jpg`, { type: "image/jpeg" });
                setCapturedImage(URL.createObjectURL(blob)); // For preview
                setFormData((prev) => ({
                    ...prev,
                    [activeCapture]: file,
                }));
            }, "image/jpeg", 0.9);

            stopCamera();
        }
    };

    // Confirm capture — just close modal now
    const confirmCapture = () => {
        setOpen(false);
        stopCamera();
    };


    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) stream.getTracks().forEach((t) => t.stop());
    };

    const handleClose = () => {
        setOpen(false);
        stopCamera();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    //  Submit Final KYC FormData
    const handleSubmit = async () => {
        const valid = validateStep(3);
        if (!valid) return;

        try {
            setLoading(true);
            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value instanceof File) {
                    data.append(key, value, value.name);
                } else {
                    data.append(key, value);
                }
            });
            data.append("user_id", user?.id);
            const res = await axiosWithHeaders.post(apis.SUBMIT_KYC, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 201) {
                setStep(4);
            } else {
                toast.error("Failed to submit KYC. Something went wrong.");
            }
        } catch (error) {
            console.error("Error submitting KYC:", error);
            toast.error("Failed to submit KYC. Try again.");
        } finally {
            setLoading(false);
        }
    };


    const renderHead = () => {
        switch (step) {
            case 1:
                return "Personal Information";
            case 2:
                return "Address Details";
            case 3:
                return "Identity Proof";
            default:
                return "";
        }
    };

    useEffect(() => {
        return () => {
            if (capturedImage) URL.revokeObjectURL(capturedImage);
        };
    }, [capturedImage]);


    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100 bg-main text-light pt-4">
            <div
                className="col-12 col-lg-5 d-flex align-items-center flex-column border-secondary border-end justify-content-around p-4 py-5"
                style={{ backgroundColor: "#161824" }}
            >
                {step !== 4 && <h3 className="fw-bold mb-4 text-center">{renderHead()}</h3>}

                {step !== 4 && <form onSubmit={(e) => e.preventDefault()}>
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="row g-3">
                            <div className="col-12 text-center mb-3">
                                {formData.selfie ? (
                                    <>
                                        <img
                                            src={typeof formData.selfie == "string" && formData.selfie?.includes("uploads") ? `${baseurl}${formData.selfie}` :URL.createObjectURL(formData.selfie)}
                                            alt="Selfie"
                                            className="rounded-circle border border-secondary"
                                            style={{
                                                height: "130px",
                                                width: "130px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <IconButton color="info" onClick={() => openCamera("selfie")}>
                                            <Replay />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton
                                        color="primary"
                                        onClick={() => openCamera("selfie")}
                                        sx={{ border: "1px solid gray", p: 6 }}
                                    >
                                        <Tooltip title="Capture Selfie">
                                            <PhotoCamera sx={{ fontSize: 40 }} />
                                        </Tooltip>
                                    </IconButton>
                                )}
                                {errors.selfie && (
                                    <p className="text-danger small mt-1">{errors.selfie}</p>
                                )}
                            </div>

                            {["first_name", "last_name", "email", "dob"].map((key) => (
                                <div className="col-12" key={key}>
                                    <label className="form-label text-capitalize">
                                        {key.replace("_", " ")}
                                    </label>
                                    <input
                                        type={key === "dob" ? "date" : "text"}
                                        name={key}
                                        className="form-control bg-dark text-light border-secondary"
                                        value={formData[key]}
                                        onChange={handleChange}
                                    />
                                    {errors[key] && (
                                        <p className="text-danger small mt-1">{errors[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="row g-3">
                            {["street", "city", "state", "zip"].map((key) => (
                                <div className="col-12" key={key}>
                                    <label className="form-label text-capitalize">
                                        {key.replace("_", " ")}
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        className="form-control bg-dark text-light border-secondary"
                                        value={formData[key]}
                                        onChange={handleChange}
                                    />
                                    {errors[key] && (
                                        <p className="text-danger small mt-1">{errors[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="row g-3">
                            {["id_front", "id_back"].map((field) => (
                                <div className="col-12 col-md-6" key={field}>
                                    <label className="form-label text-uppercase small text-secondary">
                                        {field.replace("_", " ")}
                                    </label>
                                    <div className="d-flex flex-column align-items-center justify-content-around bg-main rounded-3 border border-secondary p-2">
                                        {formData[field] ? (
                                            <>
                                                <img
                                                    src={ (typeof formData[field] == "string" && formData[field]?.includes("uploads")) ? `${baseurl}${formData[field]}` :URL.createObjectURL(formData[field])}
                                                    alt={field}
                                                    className="img-fluid rounded border border-secondary"
                                                />
                                                <div className="d-flex justify-content-center  gap-2">
                                                    <IconButton color="info" onClick={() => openCamera(field)}>
                                                        <PhotoCamera />
                                                    </IconButton>
                                                    <IconButton component="label">
                                                        <MdDriveFolderUpload size={30} color="#fff" />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            hidden
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    if (file) {
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            [field]: file,
                                                                        }));
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </IconButton>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="d-flex justify-content-center gap-3">
                                                <div
                                                    onClick={() => openCamera(field)}
                                                    className="d-flex flex-column align-items-center justify-content-center bg-secondary bg-opacity-10 border border-secondary rounded-3 p-2 text-center text-light"
                                                    style={{ width: "100px", height: "100px", cursor: "pointer" }}
                                                >
                                                    <PhotoCamera size={20} />
                                                    <span className="small mt-2">Capture</span>
                                                </div>
                                                <label
                                                    className="d-flex flex-column align-items-center justify-content-center bg-secondary bg-opacity-10 border border-secondary rounded-3 p-2 text-center text-light"
                                                    style={{ width: "100px", height: "100px", cursor: "pointer" }}
                                                >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    [field]: file,
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                    <MdDriveFolderUpload size={20} />
                                                    <span className="small mt-2">Upload</span>
                                                </label>
                                            </div>
                                        )}
                                        {errors[field] && (
                                            <p className="text-danger small mt-2">{errors[field]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {/* ID Type */}
                            <div className="col-12">
                                <label className="form-label text-uppercase small text-secondary">
                                    ID Type
                                </label>
                                <select
                                    name="id_type"
                                    className="form-select bg-dark text-light border-secondary"
                                    value={formData.id_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select ID Type</option>
                                    <option value="passport">Passport</option>
                                    <option value="driving_license">Driving License</option>
                                    <option value="state_id">State ID</option>
                                </select>
                                {errors.id_type && (
                                    <p className="text-danger small mt-1">{errors.id_type}</p>
                                )}
                            </div>
                            {["expiry_date", "id_number", "issuing_authority"].map((key) => (
                                <div className="col-12" key={key}>
                                    <label className="form-label text-capitalize">
                                        {key.replace("_", " ")}
                                    </label>
                                    <input
                                        type={key === "expiry_date" ? "date" : key === "id_number" ? "number" : "text"}
                                        name={key}
                                        className="form-control bg-dark text-light border-secondary"
                                        value={formData[key]}
                                        onChange={handleChange}
                                    />
                                    {errors[key] && (
                                        <p className="text-danger small mt-1">{errors[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </form>}

                {step === 4 && (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <MdCheck size={70} color="lightgreen" />
                        </div>
                        <h3 className="fw-bold text-success mb-3">KYC Submitted Successfully!</h3>
                        <p className="text-light mb-4">
                            Your KYC verification has been submitted successfully.
                            Please wait while we review your details for approval.
                        </p>

                        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                            <button
                                type="button"
                                className="btn btn-outline-light px-4"
                                onClick={() => navigate("/")}
                            >
                                Go to Home
                            </button>
                            <button
                                type="button"
                                className="btn btn-success px-4"
                                onClick={() => navigate("/")}
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                {step < 4 && <div className="d-flex justify-content-between mt-4 w-100">
                    {step > 1 && (
                        <button
                            type="button"
                            className="btn btn-outline-light d-flex align-items-center gap-2"
                            onClick={handlePrev}
                        >
                            <FaArrowLeft /> Previous
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            type="button"
                            className="box-style btn-box text-dark ms-auto d-flex align-items-center gap-2"
                            onClick={handleNext}
                        >
                            Next <FaArrowRight />
                        </button>
                    ) : (
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="box-style btn-box text-dark ms-auto d-flex align-items-center gap-2"
                        >
                            {loading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <>
                                    <MdCheck /> Submit KYC
                                </>
                            )}
                        </button>
                    )}
                </div>}
            </div>

            {/* RIGHT SIDE (Visual Info) */}
            <section className="overflow-hidden banner-section index-one">
                <div className="overlay d-flex align-items-center justify-content-center min-vh-100">
                    <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-4">
                        <div className="text-center">
                            <MdSecurity size={60} />
                            <h4 className="fw-bold mt-3 text-light">Verify Your Identity</h4>
                            <p className="text-light small px-4">
                                We take your security seriously. Complete the KYC process to
                                enjoy all platform features securely and confidently.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAMERA MODAL */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="camera-modal"
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Box
                    className="bg-dark text-light border border-secondary rounded-3 p-3 text-center align-middle"
                    sx={{ width: "90%", maxWidth: 400 }}
                >
                    <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                        <h5 className="text-uppercase">Capture Image</h5>
                        <IoClose
                            size={30}
                            color="#fff"
                            style={{ cursor: "pointer" }}
                            onClick={handleClose}
                        />
                    </div>
                    {!capturedImage ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="rounded border border-secondary w-100"
                        />
                    ) : (
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="img-fluid rounded border border-secondary"
                        />
                    )}
                    <canvas ref={canvasRef} className="d-none"></canvas>

                    <div className="d-flex justify-content-center gap-3 mt-3">
                        {!capturedImage ? (
                            <IconButton onClick={capturePhoto}>
                                <MdCamera size={50} color="#fff" />
                            </IconButton>
                        ) : (
                            <>
                                <IconButton color="info" onClick={() => openCamera(activeCapture)}>
                                    <PhotoCamera />
                                </IconButton>
                                <IconButton onClick={confirmCapture}>
                                    <MdCheck color="lightgreen" className="fs-3" />
                                </IconButton>
                            </>
                        )}
                    </div>
                </Box>
            </Modal>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        zIndex: 1000000000000000,
                        background: "#1e1e1e",   // dark background
                        color: "#fff",           // white text
                        borderRadius: "8px",
                        padding: "12px 16px",
                        marginTop: "50px"
                    },
                    success: {
                        style: { background: "#1f3d2b", color: "#b6f2c8" }, // greenish
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        style: { background: "#3d1f1f", color: "#f2b6b6" }, // reddish
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />
        </div>
    );
};

export default KycVerification;
