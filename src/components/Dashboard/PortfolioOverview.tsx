import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Portfolio } from '../../hooks/useCryptoData';

interface PortfolioOverviewProps {
  portfolio: Portfolio;
}

export const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ portfolio }) => {
  const formatCurrency = (value: number, currency: 'USD' | 'BRL' = 'USD') => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const isPositive = portfolio.totalChangePercent >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Portfolio Value */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Valor Total</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(portfolio.totalValueUSD)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatCurrency(portfolio.totalValueUSD * 5.5, 'BRL')}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* 24h Change USD */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Mudança 24h (USD)</p>
            <p className={`text-2xl font-bold mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(portfolio.totalValueUSD * (portfolio.totalChangePercent / 100))}
            </p>
            <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(portfolio.totalChangePercent)}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
            {isPositive ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>

      {/* 24h Change BRL */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Mudança 24h (BRL)</p>
            <p className={`text-2xl font-bold mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(portfolio.totalChangeBRL, 'BRL')}
            </p>
            <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(portfolio.totalChangePercent)}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
            {isPositive ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};