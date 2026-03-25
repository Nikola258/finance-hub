import { Box, Typography } from '@mui/material';
import CoinList from '../crypto/CoinList';
import AreaChart from '../charts/AreaChart';

const CryptoDashboard = () => (
    <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Crypto Dashboard</Typography>
        <Box sx={{ mb: 4 }}>
            <AreaChart title="Market Overview" />
        </Box>
        <CoinList />
    </Box>
);

export default CryptoDashboard;
