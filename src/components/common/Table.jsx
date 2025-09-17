// components/common/DarkTable.jsx
import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

export default function DarkTable({ columns = [], rows = [] }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#121212",
        color: "white",
        boxShadow: "none",
        borderRadius: "8px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid #333",
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                "&:hover": { backgroundColor: "#1e1e1e" },
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col}
                  sx={{ color: "white", borderBottom: "1px solid #333" }}
                >
                  {row[col.toLowerCase().replace(/\s+/g, "")] || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
