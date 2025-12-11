# Correlation Divergence Detector

Tracks correlation breakdowns between major asset pairs (equities, forex, commodities, crypto) using z-score divergence detection. Identifies regime shifts and mean-reversion opportunities through statistical analysis of 30-day rolling correlations with 252-day historical lookback.

## Features

- **Real-time Anomaly Detection**: |z-score| > 2σ threshold triggering
- **Multi-Asset Coverage**: SPX/USDJPY, Gold/Treasuries, BTC/NASDAQ, EUR/DXY, SPX/VIX, Crude/SPX
- **Visual Analytics**: Time-series charts with anomaly highlighting, correlation matrices, divergence metrics
- **Statistical Framework**: Rolling correlation calculation, z-score normalization, mean-reversion signaling

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **State**: React Hooks
- **Build**: Vite

## Installation

```bash
npm install
npm run dev
```

## Methodology

**Correlation Calculation**:
- 30-day rolling Pearson correlation
- Daily rebalanced windows

**Anomaly Detection**:
```
z = (ρ_current - μ_historical) / σ_historical
Anomaly: |z| > 2
```

**Lookback Period**: 252 trading days (1 year)

## UI Components

- `AlertPanel`: Active anomaly summary with z-scores
- `CorrelationChart`: Time-series with μ reference line + anomaly regions
- `CorrelationMatrix`: Current correlation snapshot
- `StatsCard`: Aggregate metrics (avg z-score, max divergence)

## Configuration

Data generation parameters in `src/lib/correlationData.ts`:
- `baseCorrelation`: Long-term mean
- `volatility`: Daily standard deviation
- `anomalyProbability`: Shock frequency
- `lookback`: Historical window (252 days)

## Asset Pairs

| Pair | Symbol 1 | Symbol 2 | Base ρ |
|------|----------|----------|--------|
| SPX/USDJPY | ^GSPC | JPY=X | +0.45 |
| SPX/Oil | ^GSPC | CL=F | +0.35 |
| Gold/10Y | GC=F | ^TNX | -0.25 |
| SPX/VIX | ^GSPC | ^VIX | -0.75 |
| EUR/DXY | EURUSD=X | DX-Y.NYB | -0.85 |
| BTC/NASDAQ | BTC-USD | ^IXIC | +0.55 |

## Key Metrics

- **Z-Score**: Standardized deviation from historical mean
- **Anomaly Status**: Boolean flag for |z| > 2
- **Historical μ**: 252-day average correlation
- **Historical σ**: Standard deviation of correlation

## Use Cases

1. **Risk Management**: Correlation breakdown detection
2. **Pairs Trading**: Mean-reversion signal generation
3. **Portfolio Hedging**: Dynamic correlation monitoring
4. **Regime Detection**: Structural shift identification
