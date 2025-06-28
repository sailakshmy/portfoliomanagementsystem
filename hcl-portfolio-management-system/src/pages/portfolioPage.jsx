import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Typography, Tabs, Tab, Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90, type: "number" },
  { field: "asset_id", headerName: "Asset ID", width: 100 },
  { field: "order_ref_no", headerName: "Order Ref No", width: 150 },
  { field: "txn_type", headerName: "Transaction Type", width: 150 },
  { field: "order_status", headerName: "Order Status", width: 130 },
  { field: "order_value", headerName: "Order Value", width: 130 },
  { field: "created_on", headerName: "Created On", width: 150 },
  { field: "created_by", headerName: "Created By", width: 130 },
];

const paginationModel = { page: 0, pageSize: 5 };

function PortfolioPage() {
  const [historyData, setHistoryData] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => setHistoryData(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Tabs section */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Portfolio Tabs">
        <Tab label="Orders" />
        {/* you can add more tabs here later */}
      </Tabs>

      {/* Heading */}
      <Typography
        variant="h6"
        component="div"
        sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
      >
        Portfolio Orders
      </Typography>

      {/* Table */}
      <Paper
        elevation={3}
        sx={{
          height: 400,
          width: "100%",
          p: 1,
          border: "1px solid #ddd",
          //backgroundColor: "#fafafa"
        }}
      >
        <DataGrid
          rows={historyData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#1976d2",
              fontWeight: "bold"
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f5f5"
            }
          }}
        />
      </Paper>
    </Box>
  );
}

export default PortfolioPage;
