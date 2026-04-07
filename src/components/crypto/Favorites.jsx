import Box from '../mui-components/box';
import Typography from '../mui-components/typography';
import Table from '../mui-components/Table';
import TableBody from '../mui-components/TableBody';
import TableCell from '../mui-components/TableCell';
import TableContainer from '../mui-components/TableContainer';
import TableHead from '../mui-components/TableHead';
import TableRow from '../mui-components/TableRow';
import Paper from '../mui-components/Paper';
import Avatar from '../mui-components/Avatar';
import IconButton from '../mui-components/IconButton';
import { Star, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCryptoContext } from '../../context/CryptoContext';

const Favorites = () => {
    const navigate = useNavigate();
    const { coins, favorites, toggleFav } = useCryptoContext();

    const favCoins = coins.filter(c => favorites.includes(c.id));
    const formatUSD = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    if (favCoins.length === 0) return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Favorites</Typography>
            <Typography color="text.secondary">Star a coin from the list below to add it here.</Typography>
        </Box>
    );

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Favorites</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>24h %</TableCell>
                            <TableCell>Market Cap</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {favCoins.map(coin => (
                            <TableRow key={coin.id} hover onClick={() => navigate(`/coin/${coin.id}`)} sx={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <IconButton onClick={(e) => { e.stopPropagation(); toggleFav(coin.id); }} color="warning" size="small">
                                        <Star />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{coin.market_cap_rank}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar src={coin.image} sx={{ width: 24, height: 24 }} />
                                        {coin.name}
                                        <Typography variant="body2" color="text.secondary">{coin.symbol.toUpperCase()}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{formatUSD(coin.price)}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: coin.price_change_percentage_24h > 0 ? 'success.main' : 'error.main' }}>
                                        {coin.price_change_percentage_24h > 0 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </Box>
                                </TableCell>
                                <TableCell>{formatUSD(coin.market_cap)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Favorites;
