import React, { useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const EnhancedTable = ({
  rows = [],
  columns = [],
  loading = false,
  page = 1,
  pageSize = 10,
  totalCount = 0,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  onRowClick = () => {},
}) => {
  const totalPages = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );

  // Helper to generate pagination numbers like [1, 2, 3, "...", 10]
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      range.push(i);
    }
    if (range[0] > 1) {
      if (range[0] > 2) range.unshift("...");
      range.unshift(1);
    }
    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) range.push("...");
      range.push(totalPages);
    }
    return range;
  };

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <Paper
      className="bg-main text-light border border-secondary rounded-3 shadow-sm"
      style={{
        color: "#fff",
      }}
    >
      <TableContainer>
        <Table>
          {/* ===== HEADER ===== */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.label}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* ===== BODY ===== */}
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CircularProgress size={22} color="inherit" />
                    <Typography variant="body2" color="gray">
                      Loading...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4, color: "#aaa" }}>
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                  onClick={() => onRowClick(row)}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.label}
                      sx={{
                        color: "#ddd",
                        borderColor: "rgba(255,255,255,0.1)",
                        py: 1.5,
                      }}
                    >
                      {col.render
                        ? col.render(row)
                        : col.accessor
                            ?.toString()
                            ?.split(".")
                            ?.reduce((acc, key) => acc?.[key], row) || "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===== PAGINATION ===== */}
      {!loading && totalCount > 0 && (
        <Box
          className="d-flex flex-column flex-md-row align-items-center justify-content-between border-top border-secondary px-3 py-2"
          sx={{ color: "#aaa", borderColor: "rgba(255,255,255,0.1)" }}
        >
          <Typography variant="body2" className="mb-2 mb-md-0">
            Showing <strong>{startItem}</strong>–<strong>{endItem}</strong> of{" "}
            <strong>{totalCount}</strong> results
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            {/* Page Size Selector */}
            <FormControl variant="standard" size="small">
              <Select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  "& .MuiSvgIcon-root": { color: "#fff" },
                  minWidth: 100,
                  borderRadius: 1,
                  px: 1,
                }}
              >
                {[5, 10, 25, 50, 100].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size} / page
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Pagination Buttons */}
            <Box display="flex" alignItems="center" gap={1}>
              <button
                className="btn btn-sm btn-outline-light"
                disabled={page === 1}
                onClick={() => page > 1 && onPageChange(page - 1)}
              >
                <FaArrowLeft size={12} />
              </button>

              {getPageNumbers().map((num, idx) =>
                num === "..." ? (
                  <span key={idx} className="px-2 text-muted">
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    className={`btn btn-sm ${
                      num === page
                        ? "btn-light text-dark"
                        : "btn-outline-light"
                    }`}
                    onClick={() => onPageChange(num)}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                className="btn btn-sm btn-outline-light"
                disabled={page === totalPages}
                onClick={() => page < totalPages && onPageChange(page + 1)}
              >
                <FaArrowRight size={12} />
              </button>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default EnhancedTable;
