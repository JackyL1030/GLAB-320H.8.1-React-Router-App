import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Price() {
  const apiKey = import.meta.env.VITE_COIN_API_KEY;

  const { symbol } = useParams();

  const url = `https://rest.coincap.io/v3/price/bysymbol/${symbol}?apiKey=${apiKey}`;

  const [coin, setCoin] = useState(null);

  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
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
          {symbol.toUpperCase()}
        </h1>
        <h2>{coin.data[0]}</h2>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return coin?.data ? loaded() : loading();
}
