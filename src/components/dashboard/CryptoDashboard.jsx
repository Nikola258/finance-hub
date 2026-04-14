import { Box, Typography } from '@mui/material';
import CoinList from '../crypto/CoinList';
import SimplePieChart from '../charts/PieChart';
import Favorites from '../crypto/Favorites';
import { useCryptoContext } from '../../context/CryptoContext';
import SectionCard from '../style_components/SectionCard';

const CryptoDashboard = () => {
    const { coins } = useCryptoContext();

    const pieData = coins.slice(0, 10).map(c => ({ name: c.symbol.toUpperCase(), value: c.market_cap }));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Crypto Dashboard</Typography>
            <Box sx={{ mb: 4 }}>
                <SimplePieChart title="Top 10 by Market Cap" data={pieData} />
            </Box>
            <SectionCard title="Favorites">
                <Favorites />
            </SectionCard>
            <CoinList />
        </Box>
    );
};

export default CryptoDashboard;
