import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Price() {
  const apiKey = "d30d95a2-72d5-46f0-b60a-72dc53910490";

  const { symbol } = useParams();

  const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  const [coin, setCoin] = useState(null);

  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCoin();
  }, [symbol]);

  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return coin?.rate ? loaded() : loading();
}