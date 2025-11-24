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
import { FaPlus } from "react-icons/fa";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import toast, { Toaster } from "react-hot-toast";
import { Chip } from "@mui/material";

const getPriorityBadge = (priority) => {
    const p = priority?.toLowerCase();

    const colorMap = {
        urgent: "#dc2626", // red
        high: "#ea580c",   // orange
        medium: "#2563eb", // blue
        low: "#16a34a",    // green
    };

    const bgColor = colorMap[p] || "#4b5563";

    return (
        <Chip style={{
            backgroundColor:bgColor,
            borderColor:bgColor,
            textTransform:"capitalize"
        }}  label={priority} variant="outlined"
        />
    );
};


export default function Tickets() {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const [selected, setSelected] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
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

    // Fetch deposits
    const fetchData = async () => {
        try {
            setLoading(true);
            const { page, limit } = pagination;
            const response = await axiosWithHeaders.get(
                `${apis.GET_TICKETS}?brand_id=${user?.current_brand_id || ""}&page=${page}&limit=${limit}`
            );
            setTickets(response?.data?.data);
            const newPagination = response?.data?.pagination || {};
            setPagination((prev) => ({
                ...prev,
                totalRecords: newPagination?.totalRecords || 0,
                page: newPagination?.page || prev.page,
                limit: newPagination?.limit || prev.limit,
            }));
        } catch (error) {
            console.error("Error fetching tickets:", error);
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
            { label: "subject", accessor: "subject" },
            { label: "Status", accessor: "status", render: (it) => it?.status?.toUpperCase() },
            { label: "Raised at", accessor: "created_at" },
            { label: "Priority", accessor: "priority", render: (row) => getPriorityBadge(row?.priority), },
        ],
        [selected]
    );

    const handleCreate = async (ticketData) => {
    try {
        setLoading(true);

        const payload = {
            ...ticketData,
            brand_id: user?.current_brand_id || "",
        };

        const res = await axiosWithHeaders.post(apis.CREATE_TICKET, payload);

        if(res?.status == 201){
            toast.success("Ticket raised successfully.")
        }
        // Refresh list
        fetchData();

        // Close modal
        setOpenModal(false);
    } catch (error) {
        console.error("Error creating ticket:", error);
    } finally {
        setLoading(false);
    }
};


    return (
        <>
            <div className="d-flex w-100 justify-content-end">
                <button
                    type="submit"
                    className="box-style btn-box text-dark d-flex align-items-center gap-2"
                    onClick={() => setOpenModal(true)}
                >
                    <FaPlus /> Raise Ticket
                </button>
            </div>
            <div className="bg-main p-3 rounded">
                <EnhancedTable
                    rows={tickets}
                    columns={columns}
                    loading={loading}
                    page={pagination?.page}
                    pageSize={pagination?.limit}
                    totalCount={pagination?.totalRecords || 0}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    onRowClick={(item)=>navigate(`/brand/tickets/${item?.id}`)}
                />
            </div>
           {openModal && <CreateTicketModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onCreated={(data) => {
                    console.log("Ticket Created:", data);
                    handleCreate(data);
                }}
            />}
            <Toaster
                    position="bottom-right"
                    toastOptions={{
                      style: {
                        zIndex:1000000000000000,
                        background: "#1e1e1e",   // dark background
                        color: "#fff",           // white text
                        borderRadius: "8px",
                        padding: "12px 16px",
                        marginTop:"50px"
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
        </>
    );
}
