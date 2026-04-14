import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { CRYPTOCOMPARE_API_KEY } from '../../config/crypto';
import AreaChart from '../charts/AreaChart';
import StatCard, { StatRow } from '../style_components/StatCard';

const CoinDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const headers = { Authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}` };
        // Fetch current price info
        axios.get('/api/data/pricemultifull', {
            params: { fsyms: id, tsyms: 'USD' },
            headers,
        }).then(res => setCoin(res.data.DISPLAY[id].USD));

        axios.get('/api/data/v2/histoday', {
            params: { fsym: id, tsym: 'USD', limit: 30 },
            headers,
        }).then(res => {
            const data = res.data.Data.Data.map(d => {
                const date = new Date(d.time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return { date, value: d.close };
            });
            setHistory(data);
        });
    }, [id]);

    if (!coin) return <CircularProgress sx={{ m: 4 }} />;

    return (
        <Box sx={{ p: 3, width: '1000px' }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
            <StatCard>
                <Typography variant="h4" sx={{ mb: 1 }}>{id}</Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>{coin.PRICE}</Typography>
                <StatRow label="24h Change" value={`${coin.CHANGEPCT24HOUR}%`} />
                <StatRow label="Market Cap" value={coin.MKTCAP} />
                <StatRow label="Volume 24h" value={coin.VOLUME24HOURTO} />
                <StatRow label="High 24h" value={coin.HIGH24HOUR} />
                <StatRow label="Low 24h" value={coin.LOW24HOUR} />
            </StatCard>
            <Box sx={{ mt: 3 }}>
                <AreaChart title={`${id} — Last 30 Days`} data={history} xAxisKey="date" dataKey="value" />
            </Box>
        </Box>
    );
};

export default CoinDetails;
