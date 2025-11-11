import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CountCard from "../components/brand/CountCard";
import { FaCheck, FaSpinner } from "react-icons/fa6";
import moment from "moment";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import { useUser } from "../context/UserContext";
import EnhancedTable from "../components/common/EnhancedTable";
import { Button } from "@mui/material";

export default function BrandWithdrawals({ breadCrumbs = true }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const [selectedItem, setSelectedItem] = useState(null);
    const [alert, setAlert] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState({ approved: 0, pending: 0 });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        totalRecords: 0,
    });

    // Pagination
    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handlePageSizeChange = (newPageSize) => {
        setPagination({
            page: 1,
            limit: newPageSize,
            totalRecords: pagination.totalRecords,
        });
    };

    // Approve withdrawal
    const handleStatus = async (id) => {
        try {
            setSelectedItem(id);
            const res = await axiosWithHeaders.put(`${apis.WITHDRAWALS}/${id}`, {
                status: "completed",
            });

            if (res?.status === 200) {
                setAlert({ type: "success", msg: "Withdrawal approved successfully." });
                await fetchData();
            } else {
                setAlert({ type: "danger", msg: "Failed to approve withdrawal." });
            }
        } catch (error) {
            console.error("Error updating withdrawal:", error);
            setAlert({ type: "danger", msg: "Something went wrong." });
        } finally {
            setTimeout(() => setSelectedItem(null), 300);
            setTimeout(() => setAlert(null), 1500);
        }
    };

    // Fetch withdrawals
    const fetchData = async () => {
        try {
            setLoading(true);
            const { page, limit } = pagination;
            const response = await axiosWithHeaders.get(
                `${apis.WITHDRAWALS}?brand_id=${user?.current_brand_id || ""}&page=${page}&limit=${limit}`
            );

            const data =
                response?.data?.data?.map((txn) => ({
                    ...txn,
                    id: txn?.id,
                    date: moment(txn?.created_at).format("MMMM DD, hh:mm A"),
                    provider: txn?.provider || "Shadowstrike",
                    amount: `$${txn?.amount}`,
                    status: txn?.status,
                    user: txn?.User?.id,
                    Brand: txn?.Brand,
                })) || [];

            setWithdrawals(data);
            const newPagination = response?.data?.pagination || {};
            setPagination((prev) => ({
                ...prev,
                totalRecords: newPagination?.totalRecords || 0,
                page: newPagination?.page || prev.page,
                limit: newPagination?.limit || prev.limit,
            }));

            setCounts({
                approved: response?.data?.completed || 0,
                pending: response?.data?.pending || 0,
            });
        } catch (error) {
            console.error("Error fetching withdrawals:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.page, pagination.limit]);

    // Columns
    const columns = useMemo(
        () => [
            { label: "ID", accessor: "id" },
            { label: "Date", accessor: "date" },
            { label: "Provider", accessor: "provider" },
            { label: "Amount", accessor: "amount" },
            { label: "Status", accessor: "status" },
            { label: "User", accessor: "user" },
            { label: "Brand Slug", accessor: "Brand.slug" },
            { label: "Brand Name", accessor: "Brand.name" },
            {
                label: "Action",
                accessor: "action",
                render: (txn) => (
                    <>
                        {txn?.status === "pending" ? (
                            <button
                                className="btn btn-secondary"
                                size="sm"
                                disabled={selectedItem === txn?.id}
                                onClick={() => handleStatus(txn?.id)}
                            >
                                {selectedItem === txn?.id ? "Approving..." : "Approve"}
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                size="sm"
                                disabled
                               
                            >
                                Approved
                            </button>
                        )}
                    </>
                ),
            },
        ],
        [selectedItem]
    );

    return (
        <>
            {breadCrumbs && (
                <div className="row g-4 mb-4">
                    <div className="col-md-6 col-lg-4">
                        <CountCard
                            title={<span className="text-success text-capitalize">Approved</span>}
                            desc="All withdrawals that are approved"
                            count={counts?.approved}
                            loading={loading}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <CountCard
                            title={<span className="text-warning text-capitalize">Pending</span>}
                            desc="All withdrawals that are pending"
                            count={counts?.pending}
                            loading={loading}
                        />
                    </div>
                </div>
            )}

            <div className="bg-main p-3 rounded">
                <EnhancedTable
                    rows={withdrawals}
                    columns={columns}
                    loading={loading}
                    page={pagination?.page}
                    pageSize={pagination?.limit}
                    totalCount={pagination?.totalRecords || 0}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>
        </>
    );
}
