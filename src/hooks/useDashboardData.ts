import { useState, useEffect } from 'react';
import { 
  MarketState, 
  Signal, 
  Position, 
  OrderBookEntry, 
  TelemetryEvent, 
  ChartDataPoint,
  ExecutionState,
  Thresholds
} from '../types/trading';

export const useDashboardData = () => {
  const [marketState, setMarketState] = useState<MarketState>({
    ticker: 'BTC-PERP',
    timeframe: '5M',
    status: 'CONNECTED',
    nextTick: '02:45.32',
    latency: 12.04,
    uptime: '12D 04H 21M',
    mode: 'PAPER',
    executionEnabled: true
  });

  const [signal, setSignal] = useState<Signal>({
    type: 'BUY',
    strength: 61.4,
    distanceFromEntry: 4.538,
    confidence: 74.2,
    marketAgg: 53.2,
    flipRisk: 0.324,
    expectedEdge: 0.081,
    breakdown: [
      { label: 'Neural Path', value: '+4.538 bps', impact: 'positive', description: 'Strong upward trend detected in neural model' },
      { label: 'Market Agg', value: '53.2%', impact: 'neutral', description: 'Market consensus is slightly bullish but fragmented' },
      { label: 'Flip Risk', value: '0.324', impact: 'positive', description: 'Low probability of trend reversal in the next 3 ticks' },
      { label: 'Expected Edge', value: '0.081', impact: 'positive', description: 'Statistical advantage above minimum threshold (0.05)' }
    ]
  });

  const [position, setPosition] = useState<Position>({
    exposureYes: 10.534,
    exposureNo: 0,
    asset: 'ETH',
    pnl: 420.68,
    status: 'EXECUTING',
    activeMarketPosition: 'LONG'
  });

  const [execution, setExecution] = useState<ExecutionState>({
    quoteStatus: 'LIVE',
    activeOrders: 2,
    lastFill: {
      price: 100045.02,
      size: 1.2,
      time: '14:21:28',
      side: 'BUY'
    }
  });

  const [thresholds] = useState<Thresholds>({
    entry: 4.0,
    noTradeZone: [2.0, 3.5]
  });

  const [orderBook, setOrderBook] = useState<{ bids: OrderBookEntry[], asks: OrderBookEntry[] }>({
    asks: [
      { price: 100045.24, depth: 0.45012, type: 'ask' },
      { price: 100045.18, depth: 1.20045, type: 'ask' },
    ],
    bids: [
      { price: 100045.02, depth: 2.14088, type: 'bid' },
      { price: 100044.91, depth: 0.98003, type: 'bid' },
    ]
  });

  const [events, setEvents] = useState<TelemetryEvent[]>([
    { id: '1', timestamp: '14:22:01', message: 'SIGNAL RECOMPUTED', type: 'success' },
    { id: '2', timestamp: '14:21:45', message: 'VOLATILITY ALERT', type: 'warning' },
    { id: '3', timestamp: '14:21:30', message: 'BUY TRIGGER [T-1]', type: 'info' },
    { id: '4', timestamp: '14:21:28', message: 'ORDER BROADCASTED', type: 'info' },
    { id: '5', timestamp: '14:21:10', message: 'GATEWAY HEARTBEAT OK', type: 'info' },
  ]);

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const initialData: ChartDataPoint[] = Array.from({ length: 40 }, (_, i) => ({
      timestamp: Date.now() - (40 - i) * 5000,
      neuralPath: 2 + Math.sin(i * 0.3) * 3 + Math.random() * 2,
      baselineFlow: Math.sin(i * 0.2) * 1 + Math.random() * 0.5
    }));
    setChartData(initialData);

    const interval = setInterval(() => {
      setMarketState(prev => ({
        ...prev,
        latency: parseFloat((12 + Math.random() * 0.5).toFixed(2))
      }));

      setChartData(prev => {
        const last = prev[prev.length - 1];
        const next: ChartDataPoint = {
          timestamp: Date.now(),
          neuralPath: last.neuralPath + (Math.random() - 0.5) * 0.5,
          baselineFlow: last.baselineFlow + (Math.random() - 0.5) * 0.2
        };
        return [...prev.slice(1), next];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    marketState,
    signal,
    position,
    execution,
    thresholds,
    orderBook,
    events,
    chartData
  };
};
