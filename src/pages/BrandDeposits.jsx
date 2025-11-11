import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../components/common/Table"
import CountCard from "../components/brand/CountCard";
import { FaCheck, FaSpinner } from "react-icons/fa6";
import moment from "moment";
import axiosWithHeaders from "../helper/axiosWithHeaders";
import { apis } from "../apis";
import { useUser } from "../context/UserContext";
import EnhancedTable from "../components/common/EnhancedTable";

export default function BrandDeposits({ breadCrumbs = true }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const [selected, setSelected] = useState(null);
    const [alert, setAlert] = useState(null);
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [counts, setCounts] = useState({ completed: 0, pending: 0 });
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

    // Update status
    const handleStatus = async (id) => {
        try {
            setSelected(id);
            const res = await axiosWithHeaders.put(`${apis.DEPOSITS}/${id}`, {
                status: "completed",
            });

            if (res?.status === 200) {
                setAlert({ type: "success", msg: "Deposit marked complete." });
                await fetchData();
            } else {
                setAlert({ type: "danger", msg: "Failed to mark deposit." });
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setAlert({ type: "danger", msg: "Something went wrong." });
        } finally {
            setTimeout(() => setSelected(null), 300);
            setTimeout(() => setAlert(null), 1500);
        }
    };

    // Fetch deposits
    const fetchData = async () => {
        try {
            setLoading(true);
            const { page, limit } = pagination;
            const response = await axiosWithHeaders.get(
                `${apis.DEPOSITS}?brand_id=${user?.current_brand_id || ""}&page=${page}&limit=${limit}`
            );

            const data =
                response?.data?.data?.map((txn) => ({
                    ...txn,
                    id: txn?.id,
                    date: moment(txn?.created_at).format("MMMM DD, hh:mm A"),
                    provider: txn?.provider || "Shadowstrike",
                    amountpaid: `$${txn?.load_amount}`,
                    amountloaded: `${txn?.load_amount} Coins`,
                    status: txn?.status,
                    user: txn?.User?.id,
                    brandSlug: txn?.Brand?.slug,
                    brandName: txn?.Brand?.name,
                })) || [];

            setDeposits(data);
            const newPagination = response?.data?.pagination || {};
            setPagination((prev) => ({
                ...prev,
                totalRecords: newPagination?.totalRecords || 0,
                page: newPagination?.page || prev.page,
                limit: newPagination?.limit || prev.limit,
            }));

            setCounts({
                completed: response?.data?.completed || 0,
                pending: response?.data?.pending || 0,
            });
        } catch (error) {
            console.error("Error fetching deposits:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.page, pagination.limit]);

    const columns = useMemo(
        () => [
            { label: "ID", accessor: "id" },
            { label: "Date", accessor: "date" },
            { label: "Provider", accessor: "provider" },
            { label: "Amount Paid", accessor: "amountpaid" },
            { label: "Amount Loaded", accessor: "amountloaded" },
            { label: "Status", accessor: "status" },
            { label: "User", accessor: "user" },
            { label: "Brand Slug", accessor: "brandSlug" },
            { label: "Brand Name", accessor: "brandName" },
            {
                label: "Action",
                accessor: "action",
                render: (txn) =>
                    txn.status === "pending" ? (
                        <button
                            className="btn btn-secondary"
                            size="sm"
                            type="button"
                            disabled={selected === txn.id}
                            onClick={() => handleStatus(txn.id)}
                        >
                            {selected === txn.id ? "Marking..." : "Mark Complete"}
                        </button>
                    ) : (
                        <button
                            size="sm"
                            type="button"
                            className="btn btn-success disabled "
                        >
                            Completed
                        </button>
                    ),
            },
        ],
        [selected]
    );

    return (
        <>
            {breadCrumbs && (
                <>
                    <div className="row g-4 mb-4">
                        <div className="col-md-6 col-lg-4">
                            <CountCard
                                title={<span className="text-success text-capitalize">Completed</span>}
                                desc="All deposits that are marked as completed"
                                count={counts?.completed}
                                loading={loading}
                            />
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <CountCard
                                title={<span className="text-danger text-capitalize">Pending</span>}
                                desc="All deposits that are pending"
                                count={counts?.pending}
                                loading={loading}
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="bg-main p-3 rounded">
                <EnhancedTable
                    rows={deposits}
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
