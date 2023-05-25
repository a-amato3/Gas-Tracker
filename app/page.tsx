"use client";

import { useEffect, useState } from "react";

type GasPrices = {
  low: number;
  standard: number;
  high: number;
};

const GasTracker = (): JSX.Element => {
  const [gasPrices, setGasPrices] = useState<GasPrices | null>(null);

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
  }, []);

  if (!gasPrices) {
    return <div>Loading gas prices...</div>;
  }

  return (
    <main className="min-h-screen flex-col items-center p-24  mx-auto">
      <div className="container flex flex-col items-center">
        <h1 className="font-bold">Ethereum Gas Tracker</h1>
        <h2>Gas Prices</h2>
      </div>
    </main>
  );
};

const Home = () => {
  return (
    <div>
      <GasTracker />
    </div>
  );
};

export default Home;
