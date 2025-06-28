import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PortfolioPage from "./pages/portfolioPage"


function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/orders/:id" element={<PortfolioPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
