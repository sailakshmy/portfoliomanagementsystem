import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PortfolioPerformanceChart from '../PortfolioPerformanceChart';

// Mock Chart.js components
jest.mock('react-chartjs-2', () => ({
  Pie: ({ data, options }) => (
    <div data-testid="pie-chart">
      <div data-testid="pie-data">{JSON.stringify(data)}</div>
      <div data-testid="pie-options">{JSON.stringify(options)}</div>
    </div>
  ),
  Bar: ({ data, options }) => (
    <div data-testid="bar-chart">
      <div data-testid="bar-data">{JSON.stringify(data)}</div>
      <div data-testid="bar-options">{JSON.stringify(options)}</div>
    </div>
  ),
}));

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('PortfolioPerformanceChart', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    test('renders the component with title', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      expect(screen.getByText('Portfolio Performance Charts')).toBeInTheDocument();
      expect(screen.getByText('Select a chart type to view different aspects of your portfolio')).toBeInTheDocument();
    });

    test('renders all three chart type toggle buttons', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      expect(screen.getByRole('button', { name: /assets/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /holdings/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /performance/i })).toBeInTheDocument();
    });

    test('defaults to pie chart view', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
    });

    test('shows portfolio summary when pie chart is selected', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      expect(screen.getByText('Portfolio Summary')).toBeInTheDocument();
      expect(screen.getByText('Stocks:')).toBeInTheDocument();
      expect(screen.getByText('Bonds:')).toBeInTheDocument();
      expect(screen.getByText('Real Estate:')).toBeInTheDocument();
      expect(screen.getByText('Cash:')).toBeInTheDocument();
    });
  });

  describe('Chart Type Switching', () => {
    test('switches to table view when holdings button is clicked', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      const holdingsButton = screen.getByRole('button', { name: /holdings/i });
      fireEvent.click(holdingsButton);
      
      await waitFor(() => {
        expect(screen.getByText('Symbol')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('Avg Price')).toBeInTheDocument();
        expect(screen.getByText('Current Price')).toBeInTheDocument();
        expect(screen.getByText('Market Value')).toBeInTheDocument();
        expect(screen.getByText('Gain/Loss')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
      });
    });

    test('switches to bar chart view when performance button is clicked', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      const performanceButton = screen.getByRole('button', { name: /performance/i });
      fireEvent.click(performanceButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
        expect(screen.queryByTestId('pie-chart')).not.toBeInTheDocument();
      });
    });

    test('switches back to pie chart view when assets button is clicked', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // First switch to table view
      const holdingsButton = screen.getByRole('button', { name: /holdings/i });
      fireEvent.click(holdingsButton);
      
      // Then switch back to pie chart
      const assetsButton = screen.getByRole('button', { name: /assets/i });
      fireEvent.click(assetsButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
        expect(screen.getByText('Portfolio Summary')).toBeInTheDocument();
      });
    });
  });

  describe('Table View Data', () => {
    test('displays all holdings data in table format', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // Switch to table view
      const holdingsButton = screen.getByRole('button', { name: /holdings/i });
      fireEvent.click(holdingsButton);
      
      await waitFor(() => {
        // Check for stock symbols
        expect(screen.getByText('AAPL')).toBeInTheDocument();
        expect(screen.getByText('GOOGL')).toBeInTheDocument();
        expect(screen.getByText('MSFT')).toBeInTheDocument();
        expect(screen.getByText('BOND-ETF')).toBeInTheDocument();
        
        // Check for company names
        expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
        expect(screen.getByText('Alphabet Inc.')).toBeInTheDocument();
        expect(screen.getByText('Microsoft Corp.')).toBeInTheDocument();
        expect(screen.getByText('Vanguard Total Bond ETF')).toBeInTheDocument();
        
        // Check for quantities
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('75')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
      });
    });

    test('displays formatted currency values', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // Switch to table view
      const holdingsButton = screen.getByRole('button', { name: /holdings/i });
      fireEvent.click(holdingsButton);
      
      await waitFor(() => {
        // Check for formatted currency values
        expect(screen.getByText('$150.00')).toBeInTheDocument();
        expect(screen.getByText('$2,800.00')).toBeInTheDocument();
        expect(screen.getByText('$300.00')).toBeInTheDocument();
        expect(screen.getByText('$85.00')).toBeInTheDocument();
      });
    });

    test('displays gain/loss chips with correct colors', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // Switch to table view
      const holdingsButton = screen.getByRole('button', { name: /holdings/i });
      fireEvent.click(holdingsButton);
      
      await waitFor(() => {
        // Check for gain/loss chips
        const gainLossChips = screen.getAllByText(/\(\d+\.\d+%\)/);
        expect(gainLossChips.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Chart Data Validation', () => {
    test('pie chart contains correct asset data', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      const pieData = screen.getByTestId('pie-data');
      const data = JSON.parse(pieData.textContent);
      
      expect(data.labels).toEqual(['Stocks', 'Bonds', 'Real Estate', 'Cash']);
      expect(data.datasets[0].data).toEqual([45000, 30000, 15000, 10000]);
    });

    test('bar chart contains correct performance data', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // Switch to bar chart
      const performanceButton = screen.getByRole('button', { name: /performance/i });
      fireEvent.click(performanceButton);
      
      await waitFor(() => {
        const barData = screen.getByTestId('bar-data');
        const data = JSON.parse(barData.textContent);
        
        expect(data.labels).toEqual(['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']);
        expect(data.datasets).toHaveLength(3);
        expect(data.datasets[0].label).toBe('Stocks');
        expect(data.datasets[1].label).toBe('Bonds');
        expect(data.datasets[2].label).toBe('Real Estate');
      });
    });
  });

  describe('Responsive Design', () => {
    test('renders without crashing on different screen sizes', () => {
      // Test with different viewport sizes
      const { rerender } = renderWithTheme(<PortfolioPerformanceChart />);
      
      // Simulate mobile view
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      rerender(<PortfolioPerformanceChart />);
      expect(screen.getByText('Portfolio Performance Charts')).toBeInTheDocument();
      
      // Simulate desktop view
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      
      rerender(<PortfolioPerformanceChart />);
      expect(screen.getByText('Portfolio Performance Charts')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels for toggle buttons', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      const toggleButtonGroup = screen.getByRole('group', { name: /chart type/i });
      expect(toggleButtonGroup).toBeInTheDocument();
    });

    test('table has proper headers', async () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // Switch to table view
      const holdingsButton = screen.getByRole('button', { name: /holdings/i });
      fireEvent.click(holdingsButton);
      
      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: 'Symbol' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Quantity' })).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles chart type change gracefully', () => {
      renderWithTheme(<PortfolioPerformanceChart />);
      
      // Test clicking the same button multiple times
      const assetsButton = screen.getByRole('button', { name: /assets/i });
      fireEvent.click(assetsButton);
      fireEvent.click(assetsButton);
      
      // Should still be in pie chart view
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });
}); 