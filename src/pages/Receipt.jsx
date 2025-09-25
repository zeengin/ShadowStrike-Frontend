import React, { useEffect } from "react";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import { useParams } from "react-router-dom";
import logo from "../assets/logo-text.png";


const Receipt = () => {
    const { transactionId } = useParams();
    const [receiptData, setReceiptData] = React.useState(null);

    const viewReceipt = async () => {
        try {
            const response = await axiosWithHeaders.get(`${apis.TRANSANCTIONS}/${transactionId}/receipt`);
            console.log(response.data)
            setReceiptData(response?.data?.receipt);
        } catch (error) {
            console.error("Error fetching receipt:", error);
        }
    }
    useEffect(() => {
        viewReceipt();
    }, []);

    const handlePrint = () => {
        window.print();
    };


    return (
        <div className="container pt-120 pb-120 d-flex justify-content-center ">
            <div className="col-lg-6 col-md-8 col-sm-12 border rounded p-4 bg-secondary bg-opacity-10 shadow-sm">
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
                        <span>{receiptData?.receiptId}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Date Paid</span>
                        <span>{receiptData?.datePaid}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <span className="" >Username</span>
                        <span>{receiptData?.username}</span>
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
                        <span>{receiptData?.loadAmount} coins</span>
                    </div>
                </div>

                <div className="d-flex justify-content-between fw-bold border-top pt-2 mb-4">
                    <span>Total Paid</span>
                    <span>$ {receiptData?.totalPaid}</span>
                </div>

                {/* Print Button */}
                <div className="text-center">
                    <button onClick={handlePrint} className="btn btn-warning w-100 py-2 fw-semibold" style={{ borderRadius: "8px" }}>
                        Print Receipt
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center mt-3" style={{ fontSize: "0.85rem" }}>
                    Need help? Contact <a href="mailto:support@shadowstrike.fun">support@shadowstrike.fun</a>
                </p>
            </div>
        </div>
    );
};

export default Receipt;
