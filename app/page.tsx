"use client";

import { useEffect, useState } from "react";
import TopBanner from "./banner";
import { GasPricesResponse } from "./types/gas_prices";

const GasTracker = (): JSX.Element => {
  const [gasPrices, setGasPrices] = useState<GasPricesResponse | null>(null);
  /* 
  useEffect(() => {
    const fetchGasPrices = async () => {
      try {
        const response = await fetch(
          "https://ethgasstation.info/api/ethgasAPI.json?"
        );
        const data = await response.json();
        setGasPrices({
          low: data.safeLow / 10,
          standard: data.average / 10,
          high: data.fast / 10,
        });
      } catch (error) {
        console.error("Error fetching gas prices:", error);
      }
    };

    fetchGasPrices();
  }, []); */

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
          <p className=" bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            🛴 Low Priority: {formatPrice(gasPrices.standard)} gwei ($
            {formatPrice(gasPrices.standard * 0.01)})
          </p>
          <p className=" bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            🚗 Standard Priority: {formatPrice(gasPrices.fast)} gwei ($
            {formatPrice(gasPrices.fast * 0.01)})
          </p>
          <p className=" bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            ✈️ High Priority: {formatPrice(gasPrices.instant)} gwei ($
            {formatPrice(gasPrices.instant * 0.01)})
          </p>
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
