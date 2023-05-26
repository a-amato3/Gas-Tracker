"use client";

import { useEffect, useState } from "react";
import TopBanner from "./banner";
import { GasPricesResponse } from "./types/gas_prices";
import { log } from "console";

const GasTracker = (): JSX.Element => {
  const [gasPrices, setGasPrices] = useState<GasPricesResponse | null>(null);
  const [ethToUSD, setEthToUSD] = useState<number | null>(null);

  // Fetches gas prices from the provided API and sets the gas prices in the local state
  useEffect(() => {
    const fetchGasPrices = async () => {
      try {
        const response = await fetch(
          "https://api.ethgasstation.info/api/fee-estimate"
        );

        // Extracts the data from the response
        const data = await response.json();

        // Updates the gas prices state variable with the fetched data
        setGasPrices(data);
      } catch (error) {
        // Handle any errors that occur during the fetching process
        console.error("Error fetching gas prices:", error);
      }
    };

    const fetchETHtoUSD = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );

        const data = await response.json();

        // Update the ETH to USD exchange rate in the local state
        setEthToUSD(data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH to USD exchange rate:", error);
      }
    };

    fetchETHtoUSD();
    fetchGasPrices();
  }, []);

  // Convert Gwei to USD
  const convertGweiToUSD = (gwei: number): string => {
    if (ethToUSD && gasPrices) {
      const usdAmount = (gwei * ethToUSD * 0.000000001).toFixed(6);
      return usdAmount;
    } else {
      return "";
    }
  };

  // If the gasPrices state variable is null, this will load a fallback message
  if (!gasPrices) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading gas prices...
      </div>
    );
  }

  return (
    <main className="min-h-screen flex-col items-center p-24  mx-auto">
      <div className="container flex flex-col items-center">
        <h1 className="font-bold pb-4">Ethereum Gas Tracker</h1>
        <h2 className="pb-4">Gas Prices</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center	bg-white  border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            <div className="font-bold">🛴 Low Priority</div>
            <div className="text-green-400">
              {gasPrices.gasPrice.standard} Gwei
            </div>
            <div>$ {convertGweiToUSD(gasPrices.gasPrice.standard)}</div>
            <div className="text-sm mt-1">
              Base: {gasPrices.baseFee} | Priority:{" "}
              {gasPrices.priorityFee.standard}{" "}
            </div>
          </div>
          <div className="text-center bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            <div className="font-bold">🚗 Standard Priority</div>
            <div className="text-blue-400"> {gasPrices.gasPrice.fast} Gwei</div>
            <div>$ {convertGweiToUSD(gasPrices.gasPrice.fast)}</div>
            <div className="text-sm mt-1">
              Base: {gasPrices.baseFee} | Priority: {gasPrices.priorityFee.fast}{" "}
            </div>
          </div>
          <div className="text-center bg-white border border-white-200 rounded-lg shadow dark:bg-gray-200 dark:border-white-700 text-gray-700 p-8 ">
            <div className="font-bold">✈️ High Priority</div>
            <div className="text-red-400">
              {gasPrices.gasPrice.instant} Gwei
            </div>
            <div>$ {convertGweiToUSD(gasPrices.gasPrice.instant)}</div>
            <div className="text-sm mt-1">
              Base: {gasPrices.baseFee} | Priority:{" "}
              {gasPrices.priorityFee.instant}
            </div>
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
