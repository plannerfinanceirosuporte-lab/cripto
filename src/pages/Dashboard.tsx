import React from 'react';
import { PortfolioOverview } from '../components/Dashboard/PortfolioOverview';
import { PortfolioChart } from '../components/Dashboard/PortfolioChart';
import { AssetTable } from '../components/Dashboard/AssetTable';
import { TopMovers } from '../components/Dashboard/TopMovers';
import { useCryptoData } from '../hooks/useCryptoData';

export const Dashboard: React.FC = () => {
  const { portfolio, cryptos, loading, error } = useCryptoData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center text-gray-500">
        <p>Nenhum dado de portfólio disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PortfolioOverview portfolio={portfolio} />
      <PortfolioChart />
      <TopMovers cryptos={cryptos} />
      <AssetTable assets={portfolio.assets} />
    </div>
  );
};