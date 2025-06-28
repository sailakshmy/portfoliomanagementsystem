import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";

function PortfolioPage() {
  const [historyData, setHistoryData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [securityName, setSecurityName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => setHistoryData(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const SearchOrder = () => {
    let query = "";

    if (orderId.trim() !== "") {
      query += `id=${orderId}`;
    }
    if (securityName.trim() !== "") {
      if (query !== "") query += "&";
      query += `asset_id=${securityName}`;
    }

    // if (orderId && orderId.trim() !== "") {
    //   axios
    //     .get(`http://localhost:3001/orders?id=${orderId}`)
    //     .then((res) => {
    //       setHistoryData(res.data); // json-server returns array
    //     })
    //     .catch((err) => console.error("Error fetching order:", err));
    // }
    if (query !== "") {
      axios
        .get(`http://localhost:3001/orders?${query}`)
        .then((res) => {
          setHistoryData(res.data);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Tabs section */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="Portfolio Tabs"
      >
        <Tab label="Orders" />
        <Tab label="Security" />
        <Tab label="Audit Action" />
      </Tabs>

      {/* Heading */}
      <Typography
        variant="h6"
        sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
      >
        Portfolio Orders
      </Typography>

      {/* Search Box */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <input
          placeholder="Enter Order Id"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
         <input
          placeholder="Enter Security Name"
          value={securityName}
          onChange={(e) => setSecurityName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => SearchOrder()}
        >
          Search
        </Button>
      </Box>

      {/* Simple Table */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: 1,
          border: "1px solid #ddd",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
              <th>ID</th>
              <th>Asset ID</th>
              <th>Order Ref No</th>
              <th>Transaction Type</th>
              <th>Order Status</th>
              <th>Order Value</th>
              <th>Created On</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {historyData && historyData.length > 0 ? (
              historyData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.asset_id}</td>
                  <td>{row.order_ref_no}</td>
                  <td>{row.txn_type}</td>
                  <td>{row.order_status ? "Active" : "Inactive"}</td>
                  <td>{row.order_value}</td>
                  <td>{row.created_on}</td>
                  <td>{row.created_by}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}

export default PortfolioPage;
