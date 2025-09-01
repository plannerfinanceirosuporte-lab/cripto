import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoAsset } from '../../hooks/useCryptoData';

interface TopMoversProps {
  cryptos: CryptoAsset[];
}

export const TopMovers: React.FC<TopMoversProps> = ({ cryptos }) => {
  const topGainers = cryptos
    .filter(crypto => crypto.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3);

  const topLosers = cryptos
    .filter(crypto => crypto.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 3);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const AssetCard: React.FC<{ asset: CryptoAsset; isGainer: boolean }> = ({ asset, isGainer }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{asset.name}</p>
        <p className="text-sm text-gray-500 uppercase">{asset.symbol}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900 text-sm">
          {formatCurrency(asset.current_price)}
        </p>
        <div className={`flex items-center gap-1 ${
          isGainer ? 'text-green-600' : 'text-red-600'
        }`}>
          {isGainer ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-xs font-medium">
            {formatPercentage(asset.price_change_percentage_24h)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Maiores Altas</h3>
        </div>
        <div className="space-y-3">
          {topGainers.map((asset) => (
            <AssetCard key={asset.id} asset={asset} isGainer={true} />
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Maiores Baixas</h3>
        </div>
        <div className="space-y-3">
          {topLosers.map((asset) => (
            <AssetCard key={asset.id} asset={asset} isGainer={false} />
          ))}
        </div>
      </div>
    </div>
  );
};