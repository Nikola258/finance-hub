import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '../mui-components/box';
import Typography from '../mui-components/typography';
import Button from '../mui-components/Button';
import CircularProgress from '../mui-components/CircularProgress';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { CRYPTOCOMPARE_API_KEY } from '../../config/crypto';
import AreaChart from '../charts/AreaChart';

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

        // Fetch last 30 days of daily closing prices
        axios.get('/api/data/v2/histoday', {
            params: { fsym: id, tsym: 'USD', limit: 30 },
            headers,
        }).then(res => {
            const data = res.data.Data.Data.map(d => ({
                date: new Date(d.time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                value: d.close,
            }));
            setHistory(data);
        });
    }, [id]);

    if (!coin) return <CircularProgress sx={{ m: 4 }} />;

    return (
        <Box sx={{ p: 3, width: '1000px' }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
            <Typography variant="h4">{id}</Typography>
            <Typography variant="h5" sx={{ my: 1 }}>{coin.PRICE}</Typography>
            <Typography>24h Change: {coin.CHANGEPCT24HOUR}%</Typography>
            <Typography>Market Cap: {coin.MKTCAP}</Typography>
            <Typography>Volume 24h: {coin.VOLUME24HOURTO}</Typography>
            <Typography>High 24h: {coin.HIGH24HOUR}</Typography>
            <Typography>Low 24h: {coin.LOW24HOUR}</Typography>
            <Box sx={{ mt: 3 }}>
                <AreaChart title={`${id} — Last 30 Days`} data={history} xAxisKey="date" dataKey="value" />
            </Box>
        </Box>
    );
};

export default CoinDetails;
