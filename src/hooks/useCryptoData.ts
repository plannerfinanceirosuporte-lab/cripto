import { useState, useEffect } from 'react';

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

export interface Portfolio {
  totalValueUSD: number;
  totalChangeBRL: number;
  totalChangePercent: number;
  assets: PortfolioAsset[];
}

export interface PortfolioAsset extends CryptoAsset {
  holdings: number;
  value: number;
  allocation: number;
}

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock user holdings data
  const mockHoldings = [
    { symbol: 'bitcoin', holdings: 0.5 },
    { symbol: 'ethereum', holdings: 2.3 },
    { symbol: 'cardano', holdings: 1500 },
    { symbol: 'chainlink', holdings: 45 },
    { symbol: 'polygon', holdings: 850 },
  ];

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }

        const data: CryptoAsset[] = await response.json();
        setCryptos(data);

        // Calculate portfolio based on mock holdings
        const portfolioAssets: PortfolioAsset[] = mockHoldings
          .map(holding => {
            const crypto = data.find(c => c.id === holding.symbol);
            if (!crypto) return null;
            
            const value = crypto.current_price * holding.holdings;
            return {
              ...crypto,
              holdings: holding.holdings,
              value,
              allocation: 0, // Will be calculated after total
            };
          })
          .filter(Boolean) as PortfolioAsset[];

        const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
        
        // Calculate allocations
        portfolioAssets.forEach(asset => {
          asset.allocation = (asset.value / totalValue) * 100;
        });

        const totalChange = portfolioAssets.reduce((sum, asset) => {
          return sum + (asset.value * (asset.price_change_percentage_24h / 100));
        }, 0);

        const totalChangePercent = (totalChange / totalValue) * 100;

        setPortfolio({
          totalValueUSD: totalValue,
          totalChangeBRL: totalChange * 5.5, // Mock BRL conversion
          totalChangePercent,
          assets: portfolioAssets,
        });

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  return { cryptos, portfolio, loading, error };
};