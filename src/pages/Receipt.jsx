import React, { useEffect, useRef, useState } from "react";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import { useParams } from "react-router-dom";
import logo from "../assets/logo-text.png";
import moment from "moment";
import { RiCopperCoinFill } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";



const Receipt = () => {
    const printRef = useRef();
    const { transactionId } = useParams();
    const [receiptData, setReceiptData] = React.useState(null);
    const [visible , setVisible] = useState(true);

    const viewReceipt = async () => {
        try {
            const response = await axiosWithHeaders.get(`${apis.DEPOSITS}/${transactionId}`);
            console.log(response.data)
            setReceiptData(response?.data?.data);
        } catch (error) {
            console.error("Error fetching receipt:", error);
        }
    }
    useEffect(() => {
        viewReceipt();
    }, []);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "My Report",
        onBeforePrint: async() => {
            setVisible(false);
        },
        onAfterPrint: () => {
            toast.success("Receipt Printed");
            setVisible(true);
        },
        onPrintError: (error) => {
            console.log(error);
        },
    });

    if (!receiptData) {
        return (
            <div className="container pt-120 pb-120 d-flex justify-content-center">
                <img
                    src={logo}
                    alt="ShadowStrike Logo"
                    style={{ width: "180px" }}
                />
            </div>
        );
    }

    return (
        <div ref={printRef} className="container pt-120 pb-120 d-flex justify-content-center align-items-center flex-column">
            <div  className="col-lg-6 col-md-8 col-sm-12 border rounded p-4 bg-secondary bg-opacity-10 shadow-sm">
                {/* Logo */}
                <div className="text-center mb-4">
                    <img
                        src={logo}
                        alt="ShadowStrike Logo"
                        style={{ width: "180px" }}
                    />
                </div>

                {/* Title */}
                <h4 className="text-center fw-bold mb-4">Payment Receipt</h4>

                {/* Receipt Details */}
                <div className="mb-4">
                    <h6 className="fw-bold">RECEIPT DETAILS</h6>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Receipt ID</span>
                        <span>{receiptData?.id}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Date Paid</span>
                        <span>{moment(receiptData?.created_at).format("YYYY-MM-DD hh:mm A")}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Email</span>
                        <span>{receiptData?.User?.email}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Brand</span>
                        <span>{receiptData?.Brand?.slug}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Status</span>
                        <span>{receiptData?.status}</span>
                    </div>
                </div>

                <hr />

                {/* Payment Summary */}
                <div className="mb-4">
                    <h6 className="fw-bold">PAYMENT SUMMARY</h6>
                    <div className="d-flex justify-content-between">
                        <span>Load Amount</span>
                        <span className="d-flex align-items-center" ><RiCopperCoinFill />{receiptData?.load_amount}</span>
                    </div>
                </div>

                <div className="d-flex justify-content-between fw-bold border-top pt-2 mb-4">
                    <span>Total Paid</span>
                    <span>$ {receiptData?.load_amount}</span>
                </div>
                {/* Footer */}
                <p className="text-center mt-3" style={{ fontSize: "0.85rem" }}>
                    Need help? Contact <a href="mailto:support@shadowstrike.fun">support@shadowstrike.fun</a>
                </p>
            </div>
            {/* Print Button */}
           {visible && <div className="text-center w-50 mt-2">
                <button onClick={handlePrint} className="btn btn-warning w-100 py-2 fw-semibold" style={{ borderRadius: "8px" }}>
                    Print Receipt
                </button>
            </div>}
        </div>
    );
};

export default Receipt;
