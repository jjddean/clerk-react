import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
  type: 'departure' | 'arrival' | 'transit' | 'customs' | 'delivery' | 'delay';
}

interface ShipmentTracking {
  shipmentId: string;
  currentLocation: string;
  nextLocation: string;
  estimatedArrival: string;
  progress: number;
  status: 'in-transit' | 'customs' | 'delivered' | 'delayed';
  events: TrackingEvent[];
}

interface RealTimeTrackerProps {
  shipmentId: string;
  className?: string;
}

const RealTimeTracker: React.FC<RealTimeTrackerProps> = ({ shipmentId, className }) => {
  const [tracking, setTracking] = useState<ShipmentTracking | null>(null);
  const [isLive, setIsLive] = useState(true);

  // Mock real-time data - in production this would connect to WebSocket or polling API
  useEffect(() => {
    const mockTracking: ShipmentTracking = {
      shipmentId,
      currentLocation: 'Port of Hamburg, DE',
      nextLocation: 'Port of Felixstowe, UK',
      estimatedArrival: '2024-08-05 14:30',
      progress: 65,
      status: 'in-transit',
      events: [
        {
          id: '1',
          timestamp: '2024-08-01 09:15',
          location: 'London, UK',
          status: 'Departed',
          description: 'Container loaded and departed from origin',
          type: 'departure'
        },
        {
          id: '2',
          timestamp: '2024-08-01 18:45',
          location: 'Dover, UK',
          status: 'In Transit',
          description: 'Crossed English Channel',
          type: 'transit'
        },
        {
          id: '3',
          timestamp: '2024-08-02 08:30',
          location: 'Calais, FR',
          status: 'Customs Cleared',
          description: 'EU customs clearance completed',
          type: 'customs'
        },
        {
          id: '4',
          timestamp: '2024-08-02 16:20',
          location: 'Hamburg, DE',
          status: 'Arrived',
          description: 'Arrived at destination port',
          type: 'arrival'
        }
      ]
    };

    setTracking(mockTracking);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTracking(prev => {
        if (!prev) return prev;
        
        // Simulate progress updates
        const newProgress = Math.min(prev.progress + Math.random() * 2, 100);
        
        return {
          ...prev,
          progress: newProgress,
          // Occasionally add new events
          ...(Math.random() > 0.95 && {
            events: [
              ...prev.events,
              {
                id: Date.now().toString(),
                timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
                location: prev.currentLocation,
                status: 'Position Update',
                description: 'GPS location updated',
                type: 'transit' as const
              }
            ]
          })
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [shipmentId]);

  if (!tracking) {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded w-full mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in-transit': return 'text-blue-600 bg-blue-100';
      case 'customs': return 'text-yellow-600 bg-yellow-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'departure': return '🚚';
      case 'arrival': return '🏁';
      case 'transit': return '🚢';
      case 'customs': return '📋';
      case 'delivery': return '📦';
      case 'delay': return '⚠️';
      default: return '📍';
    }
  };

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Live Tracking: {tracking.shipmentId}
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-500">{isLive ? 'Live' : 'Offline'}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-4 mb-4">
          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(tracking.status)}`}>
            {tracking.status.replace('-', ' ').toUpperCase()}
          </span>
          <span className="text-sm text-gray-600">
            ETA: {new Date(tracking.estimatedArrival).toLocaleString()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{tracking.currentLocation}</span>
            <span>{tracking.progress.toFixed(0)}% Complete</span>
            <span>{tracking.nextLocation}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${tracking.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Tracking History</h4>
        <div className="space-y-4">
          {tracking.events.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  index === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {getEventIcon(event.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{event.status}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-xs text-gray-500 mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="p-6 border-t border-gray-200">
        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-sm">Interactive Route Map</p>
            <p className="text-xs">Real-time vessel/vehicle tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracker;
