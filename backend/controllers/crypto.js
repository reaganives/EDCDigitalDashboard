const axios = require('axios');

// List of stablecoins to exclude
const stableCoins = ['usdt', 'usdc', 'busd', 'dai', 'tusd', 'usdp', 'usdd', 'ustc', 'frax', 'steth', 'wsteth', 'wbtc', 'weth'];

// Controller function to fetch top 20 cryptocurrencies from CoinGecko
const fetchCryptoData = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 20, // Fetch more than needed to account for filtered out stablecoins
                page: 1
            }
        });

        // Filter out stablecoins based on symbol
        const filteredData = response.data.filter(crypto => !stableCoins.includes(crypto.symbol.toLowerCase()));

        // Limit the result to the top 10 after filtering out stablecoins
        res.status(200).json(filteredData.slice(0, 10));
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
    }
};

module.exports = {
    fetchCryptoData
};

