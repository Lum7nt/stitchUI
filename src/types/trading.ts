export type MarketStatus = 'CONNECTED' | 'DEGRADED' | 'OFFLINE';
export type SignalType = 'BUY' | 'SELL' | 'HOLD' | 'BLOCKED';

export interface MarketState {
  ticker: string;
  timeframe: string;
  status: MarketStatus;
  nextTick: string;
  latency: number;
  uptime: string;
  mode: 'LIVE' | 'PAPER';
  executionEnabled: boolean;
}

export interface DecisionFactor {
  label: string;
  value: string | number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface Signal {
  type: SignalType;
  strength: number; // 0-100
  distanceFromEntry: number; // bps
  confidence: number; // 0-100
  marketAgg: number; // 0-100
  flipRisk: number; // 0-1
  expectedEdge: number; // 0-1
  rejectionReason?: string;
  breakdown: DecisionFactor[];
}

export interface Position {
  exposureYes: number;
  exposureNo: number;
  asset: string;
  pnl: number;
  status: 'EXECUTING' | 'IDLE';
  activeMarketPosition: 'LONG' | 'SHORT' | 'FLAT';
}

export interface ExecutionState {
  quoteStatus: 'STALE' | 'LIVE' | 'PENDING';
  activeOrders: number;
  lastFill: {
    price: number;
    size: number;
    time: string;
    side: 'BUY' | 'SELL';
  } | null;
}

export interface OrderBookEntry {
  price: number;
  depth: number;
  type: 'bid' | 'ask';
}

export interface Metrics {
  neuralModel: number;
  marketAgg: number;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface ChartDataPoint {
  timestamp: number;
  neuralPath: number;
  baselineFlow: number;
}

export interface Thresholds {
  entry: number;
  noTradeZone: [number, number]; // [min, max]
}
