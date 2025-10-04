import axios from 'axios';

let cachedETHPrice: number | null = null;

const fetchETHPrice = async (): Promise<number> => {
  if (cachedETHPrice !== null) return cachedETHPrice;

  try {
    const { data } = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot');
    cachedETHPrice = parseFloat(data.data.amount);

    setTimeout(() => {
      cachedETHPrice = null;
    }, 300000);

    return cachedETHPrice;
  } catch (error: any) {
    throw new Error(`Coinbase API error: ${error.response?.status || error.message}`);
  }
};

export default fetchETHPrice;
