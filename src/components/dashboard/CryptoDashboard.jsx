import CoinList from '../crypto/CoinList';
import SimplePieChart from '../charts/PieChart';
import Favorites from '../crypto/Favorites';
import { useCryptoContext } from '../../context/CryptoContext';
import Box from '../mui-components/box';
import Typography from '../mui-components/typography';

const CryptoDashboard = () => {
    const { coins } = useCryptoContext();

    // Top 10 coins by market cap formatted for the pie chart
    const pieData = coins.slice(0, 10).map(c => ({ name: c.symbol.toUpperCase(), value: c.market_cap }));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Crypto Dashboard</Typography>
            <Box sx={{ mb: 4 }}>
                <SimplePieChart title="Top 10 by Market Cap" data={pieData} />
            </Box>
            <Box sx={{ mb: 4 }}>
                <Favorites />
            </Box>
            <CoinList />
        </Box>
    );
};

export default CryptoDashboard;
