import axios from "axios";

const BINANCE_API_ENDPOINT = "https://api.binance.com/api/v3/klines";

const intervalMapping = {
  "1": "1m",
  "3": "3m",
  "5": "5m",
  "15": "15m",
  "30": "30m",
  "60": "1h",
  "120": "2h",
  "240": "4h",
  "480": "8h",
  "720": "12h",
  "D": "1d",
  "1D": "1d",
  "3D": "3d",
  "W": "1w",
  "1W": "1w",
  "M": "1M",
  "1M": "1M",
};

export const getBars = async (
  symbolInfo,
  resolution,
  periodParams,
  onHistoryCallback,
  onErrorCallback
) => {
  try {
    const binanceInterval = intervalMapping[resolution] || resolution;
    const url = `${BINANCE_API_ENDPOINT}?symbol=${symbolInfo.ticker}&interval=${binanceInterval}&startTime=${periodParams.from * 1000}&endTime=${periodParams.to * 1000}&limit=1000`;

    const response = await axios.get(url);
    
    if (response.data && Array.isArray(response.data)) {
      const bars = response.data.map(d => ({
        time: d[0],
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
        volume: parseFloat(d[5]),
      }));

      if (bars.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        onHistoryCallback(bars, { noData: false });
      }
    } else {
      onHistoryCallback([], { noData: true });
    }
  } catch (err) {
    console.error("Binance API Error:", err);
    onErrorCallback(err);
  }
};

export const subscribeBars = (
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback
) => {
  // Real-time updates could be implemented via Binance WebSockets
};

export const unsubscribeBars = (subscriberUID) => {
};
