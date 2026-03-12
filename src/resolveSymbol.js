export const resolveSymbol = (
  symbolName,
  onSymbolResolvedCallback,
  onResolveErrorCallback,
  extension
) => {
  const symbol = symbolName || "BTCUSDT";

  const symbolInfo = {
    ticker: symbol,
    name: symbol === "BTCUSDT" ? "BTC/USDT" : symbol,
    session: "24x7",
    timezone: "Etc/UTC",
    minmov: 1,
    pricescale: 100,
    has_intraday: true,
    intraday_multipliers: ["1", "5", "15", "30", "60"],
    has_empty_bars: true,
    has_weekly_and_monthly: true,
    supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
    volume_precision: 8,
    data_status: "streaming",
  };
  
  onSymbolResolvedCallback(symbolInfo);
};
