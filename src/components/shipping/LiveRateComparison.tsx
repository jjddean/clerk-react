import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAllCarrierRates, type CarrierRate, type RateRequest } from '@/services/carriers';
import { cn } from '@/lib/utils';

interface LiveRateComparisonProps {
  rateRequest: RateRequest;
  onRateSelect?: (rate: CarrierRate) => void;
  className?: string;
}

const LiveRateComparison: React.FC<LiveRateComparisonProps> = ({
  rateRequest,
  onRateSelect,
  className
}) => {
  const [rates, setRates] = useState<CarrierRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<CarrierRate | null>(null);

  useEffect(() => {
    if (rateRequest.origin.city && rateRequest.destination.city) {
      fetchRates();
    }
  }, [rateRequest]);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching live rates...', rateRequest);
      const carrierRates = await getAllCarrierRates(rateRequest);
      setRates(carrierRates);
      
      if (carrierRates.length === 0) {
        setError('No rates available for this route');
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError('Failed to fetch shipping rates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRateSelect = (rate: CarrierRate) => {
    setSelectedRate(rate);
    onRateSelect?.(rate);
  };

  const getCarrierLogo = (carrier: string) => {
    const logos: Record<string, string> = {
      'FedEx': '📦',
      'UPS': '🚚',
      'DHL': '✈️',
      'USPS': '📮',
      'Royal Mail': '👑',
    };
    return logos[carrier] || '🚢';
  };

  const getProviderBadge = (provider: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      'shippo': { color: 'bg-blue-100 text-blue-800', label: 'Shippo' },
      'reachship': { color: 'bg-green-100 text-green-800', label: 'ReachShip' },
      'easyship': { color: 'bg-purple-100 text-purple-800', label: 'EasyShip' },
      'fedex': { color: 'bg-orange-100 text-orange-800', label: 'FedEx Direct' },
      'ups': { color: 'bg-yellow-100 text-yellow-800', label: 'UPS Direct' },
    };
    
    const badge = badges[provider] || { color: 'bg-gray-100 text-gray-800', label: 'Direct' };
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
    return `${symbol}${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-600">Fetching live rates from carriers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
        <div className="text-center py-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rate Fetch Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchRates} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200", className)}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Live Shipping Rates</h3>
            <p className="text-sm text-gray-600">
              {rateRequest.origin.city} → {rateRequest.destination.city}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live Rates</span>
            <Button onClick={fetchRates} variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {rates.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Rates Available</h3>
            <p className="text-gray-600">No shipping rates found for this route and package.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rates.map((rate, index) => (
              <div
                key={`${rate.carrier}-${rate.service}-${index}`}
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                  selectedRate === rate
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleRateSelect(rate)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getCarrierLogo(rate.carrier)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{rate.carrier}</h4>
                        {getProviderBadge(rate.provider)}
                      </div>
                      <p className="text-sm text-gray-600">{rate.service}</p>
                      <p className="text-xs text-gray-500">Transit: {rate.transit_time}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(rate.cost, rate.currency)}
                    </div>
                    {rate.delivery_date && (
                      <p className="text-xs text-gray-500">
                        Delivery: {new Date(rate.delivery_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {selectedRate === rate && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Selected Rate:</span> Best value for your shipment
                      </div>
                      <Button size="sm">
                        Book This Rate
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {rates.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-blue-500 text-lg">💡</div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Rate Comparison Tips</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Rates are fetched live from carrier APIs</li>
                    <li>• Transit times may vary based on pickup/delivery locations</li>
                    <li>• Additional fees may apply for residential delivery</li>
                    <li>• Rates include base shipping cost only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveRateComparison;
