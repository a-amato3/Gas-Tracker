"use client";

import { useEffect, useState } from "react";
import TopBanner from "./banner";
import { GasPricesResponse } from "./types/gas_prices";

const GasTracker = (): JSX.Element => {
  const [gasPrices, setGasPrices] = useState<GasPricesResponse | null>(null);

  useEffect(() => {
    const fetchGasPrices = async () => {
      try {
        const response = await fetch(
          "https://api.ethgasstation.info/api/fee-estimate"
        );
        const data = await response.json();
        setGasPrices(data.gasPrice);
      } catch (error) {
        console.error("Error fetching gas prices:", error);
      }
    };

    fetchGasPrices();
  }, []);

  const formatPrice = (price: number): string => {
    return (price / 10).toFixed(2);
  };

  if (!gasPrices) {
    return <div className="flex h-screen">Loading gas prices...</div>;
  }

  return (
    <main className="min-h-screen flex-col items-center p-24  mx-auto">
      <div className="container flex flex-col items-center">
        <h1 className="font-bold pb-4">Ethereum Gas Tracker</h1>
        <h2 className="pb-4">Gas Prices</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center	bg-white  border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            <div className="font-bold">🛴 Low Priority</div>
            <div> {formatPrice(gasPrices.standard)} GWei</div>
            <div>$ {formatPrice(gasPrices.standard * 0.01)}</div>
          </div>
          <div className="text-center bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            <div className="font-bold">🚗 Standard Priority</div>
            <div> {formatPrice(gasPrices.fast)} GWei</div>
            <div>$ {formatPrice(gasPrices.fast * 0.01)}</div>
          </div>
          <div className="text-center bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            <div className="font-bold">✈️ High Priority</div>
            <div> {formatPrice(gasPrices.instant)} GWei</div>
            <div>$ {formatPrice(gasPrices.instant * 0.01)}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Home = () => {
  return (
    <div>
      <TopBanner />
      <GasTracker />
    </div>
  );
};

export default Home;
