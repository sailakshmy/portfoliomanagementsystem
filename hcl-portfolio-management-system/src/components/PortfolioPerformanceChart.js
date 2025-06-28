import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PieChart as PieChartIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data for the portfolio
const mockPortfolioData = {
  assets: [
    { name: 'Stocks', value: 45000, percentage: 45, color: '#2196F3' },
    { name: 'Bonds', value: 30000, percentage: 30, color: '#4CAF50' },
    { name: 'Real Estate', value: 15000, percentage: 15, color: '#FF9800' },
    { name: 'Cash', value: 10000, percentage: 10, color: '#9C27B0' },
  ],
  holdings: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 100,
      avgPrice: 150.00,
      currentPrice: 175.50,
      marketValue: 17550,
      gainLoss: 2550,
      gainLossPercent: 17.0,
      assetType: 'Stocks',
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 50,
      avgPrice: 2800.00,
      currentPrice: 2950.00,
      marketValue: 147500,
      gainLoss: 7500,
      gainLossPercent: 5.36,
      assetType: 'Stocks',
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      quantity: 75,
      avgPrice: 300.00,
      currentPrice: 325.00,
      marketValue: 24375,
      gainLoss: 1875,
      gainLossPercent: 8.33,
      assetType: 'Stocks',
    },
    {
      symbol: 'BOND-ETF',
      name: 'Vanguard Total Bond ETF',
      quantity: 200,
      avgPrice: 85.00,
      currentPrice: 87.50,
      marketValue: 17500,
      gainLoss: 500,
      gainLossPercent: 2.94,
      assetType: 'Bonds',
    },
  ],
  performance: {
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      stocks: [2.1, 1.8, -0.5, 3.2, 1.5, -1.2, 2.8, 1.9],
      bonds: [0.3, 0.2, 0.4, 0.1, 0.3, 0.2, 0.4, 0.3],
      realEstate: [0.8, 1.2, 0.5, 1.8, 0.9, 0.6, 1.1, 0.8],
    },
  },
};

const PortfolioPerformanceChart = () => {
  const [chartType, setChartType] = useState('pie');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Chart type options
  const chartOptions = [
    { value: 'pie', label: 'Assets', icon: <PieChartIcon /> },
    { value: 'table', label: 'Holdings', icon: <TableChartIcon /> },
    { value: 'bar', label: 'Performance', icon: <BarChartIcon /> },
  ];

  // Pie chart data for assets
  const pieChartData = useMemo(() => ({
    labels: mockPortfolioData.assets.map(asset => asset.name),
    datasets: [
      {
        data: mockPortfolioData.assets.map(asset => asset.value),
        backgroundColor: mockPortfolioData.assets.map(asset => asset.color),
        borderColor: mockPortfolioData.assets.map(asset => asset.color),
        borderWidth: 2,
      },
    ],
  }), []);

  // Bar chart data for performance
  const barChartData = useMemo(() => ({
    labels: mockPortfolioData.performance.weekly.labels,
    datasets: [
      {
        label: 'Stocks',
        data: mockPortfolioData.performance.weekly.stocks,
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 1,
      },
      {
        label: 'Bonds',
        data: mockPortfolioData.performance.weekly.bonds,
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Real Estate',
        data: mockPortfolioData.performance.weekly.realEstate,
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
        borderWidth: 1,
      },
    ],
  }), []);

  // Chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Portfolio Asset Allocation',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const asset = mockPortfolioData.assets[context.dataIndex];
            return `${asset.name}: $${asset.value.toLocaleString()} (${asset.percentage}%)`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Weekly Performance by Asset Type (%)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Performance (%)',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Week',
        },
      },
    },
  };

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getGainLossColor = (value) => {
    return value >= 0 ? 'success' : 'error';
  };

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <Box sx={{ height: isMobile ? 300 : 400, width: '100%' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </Box>
        );
      case 'table':
        return (
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Avg Price</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Market Value</TableCell>
                  <TableCell>Gain/Loss</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPortfolioData.holdings.map((holding) => (
                  <TableRow key={holding.symbol} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {holding.symbol}
                      </Typography>
                    </TableCell>
                    <TableCell>{holding.name}</TableCell>
                    <TableCell>{holding.quantity}</TableCell>
                    <TableCell>{formatCurrency(holding.avgPrice)}</TableCell>
                    <TableCell>{formatCurrency(holding.currentPrice)}</TableCell>
                    <TableCell>{formatCurrency(holding.marketValue)}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${formatCurrency(holding.gainLoss)} (${holding.gainLossPercent.toFixed(2)}%)`}
                        color={getGainLossColor(holding.gainLoss)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={holding.assetType}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'bar':
        return (
          <Box sx={{ height: isMobile ? 300 : 400, width: '100%' }}>
            <Bar data={barChartData} options={barChartOptions} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Portfolio Performance Charts
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a chart type to view different aspects of your portfolio
          </Typography>
          
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="chart type"
            size="small"
            sx={{ flexWrap: 'wrap' }}
          >
            {chartOptions.map((option) => (
              <ToggleButton key={option.value} value={option.value}>
                {option.icon}
                <Typography sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
                  {option.label}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mt: 2 }}>
          {renderChart()}
        </Box>

        {chartType === 'pie' && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Portfolio Summary
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
              {mockPortfolioData.assets.map((asset) => (
                <Box key={asset.name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">{asset.name}:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(asset.value)} ({asset.percentage}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformanceChart; 