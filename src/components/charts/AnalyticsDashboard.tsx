import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface AnalyticsDashboardProps {
  className?: string;
  timeRange?: '7d' | '30d' | '90d' | '1y';
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  className, 
  timeRange = '30d' 
}) => {
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [shipmentData, setShipmentData] = useState<ChartData[]>([]);
  const [revenueData, setRevenueData] = useState<ChartData[]>([]);
  const [routeData, setRouteData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Mock real-time analytics data
    const mockMetrics: MetricCard[] = [
      {
        title: 'Total Shipments',
        value: '1,247',
        change: 12.5,
        trend: 'up',
        icon: '📦'
      },
      {
        title: 'Revenue',
        value: '£2.4M',
        change: 8.2,
        trend: 'up',
        icon: '💰'
      },
      {
        title: 'On-Time Delivery',
        value: '94.2%',
        change: 2.1,
        trend: 'up',
        icon: '⏰'
      },
      {
        title: 'Customer Satisfaction',
        value: '4.8/5',
        change: -0.3,
        trend: 'down',
        icon: '⭐'
      }
    ];

    const mockShipmentData: ChartData[] = [
      { label: 'Jan', value: 85 },
      { label: 'Feb', value: 92 },
      { label: 'Mar', value: 78 },
      { label: 'Apr', value: 105 },
      { label: 'May', value: 118 },
      { label: 'Jun', value: 134 },
      { label: 'Jul', value: 147 }
    ];

    const mockRevenueData: ChartData[] = [
      { label: 'Ocean Freight', value: 45, color: '#3B82F6' },
      { label: 'Air Freight', value: 25, color: '#10B981' },
      { label: 'Road Transport', value: 20, color: '#F59E0B' },
      { label: 'Customs', value: 10, color: '#8B5CF6' }
    ];

    const mockRouteData: ChartData[] = [
      { label: 'UK-EU', value: 40, color: '#EF4444' },
      { label: 'UK-US', value: 30, color: '#3B82F6' },
      { label: 'UK-Asia', value: 20, color: '#10B981' },
      { label: 'UK-Other', value: 10, color: '#F59E0B' }
    ];

    setMetrics(mockMetrics);
    setShipmentData(mockShipmentData);
    setRevenueData(mockRevenueData);
    setRouteData(mockRouteData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === 'Total Shipments' 
          ? (parseInt(metric.value.replace(',', '')) + Math.floor(Math.random() * 3)).toLocaleString()
          : metric.value
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const renderBarChart = (data: ChartData[], title: string) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-primary w-full rounded-t transition-all duration-500 hover:bg-primary/80"
                style={{ height: `${(item.value / maxValue) * 200}px` }}
                title={`${item.label}: ${item.value}`}
              />
              <div className="text-xs text-gray-500 mt-2 text-center">{item.label}</div>
              <div className="text-xs font-medium text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = (data: ChartData[], title: string) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Pie chart placeholder - in production use a proper chart library */}
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{total}%</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMetricCard = (metric: MetricCard) => {
    const trendColor = metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600';
    const trendIcon = metric.trend === 'up' ? '↗' : 
                     metric.trend === 'down' ? '↘' : '→';

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{metric.title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
          </div>
          <div className="text-2xl">{metric.icon}</div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trendColor}`}>
            {trendIcon} {Math.abs(metric.change)}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                timeRange === range
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index}>
            {renderMetricCard(metric)}
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderBarChart(shipmentData, 'Monthly Shipments')}
        {renderPieChart(revenueData, 'Revenue by Service')}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderPieChart(routeData, 'Shipments by Route')}
        
        {/* Performance Indicators */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Indicators</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Transit Time Performance</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Documentation Accuracy</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Customer Response Time</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Cost Efficiency</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Live Activity Feed</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live</span>
          </div>
        </div>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { time: '2 min ago', event: 'New shipment SH-2024-156 created', type: 'info' },
            { time: '5 min ago', event: 'Payment received for INV-2024-089', type: 'success' },
            { time: '8 min ago', event: 'Customs clearance completed for SH-2024-145', type: 'success' },
            { time: '12 min ago', event: 'Delay reported for SH-2024-132', type: 'warning' },
            { time: '15 min ago', event: 'Document uploaded for SH-2024-128', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-400' :
                activity.type === 'warning' ? 'bg-yellow-400' :
                'bg-blue-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.event}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
