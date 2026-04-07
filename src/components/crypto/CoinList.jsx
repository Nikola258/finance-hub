import { useState } from 'react';
import Paper from '../mui-components/Paper';
import Table from '../mui-components/Table';
import TableBody from '../mui-components/TableBody';
import TableCell from '../mui-components/TableCell';
import TableContainer from '../mui-components/TableContainer';
import TableHead from '../mui-components/TableHead';
import TableRow from '../mui-components/TableRow';
import Typography from '../mui-components/typography';
import Box from '../mui-components/box';
import IconButton from '../mui-components/IconButton';
import TablePagination from '../mui-components/TablePagination';
import Avatar from '../mui-components/Avatar';
import TextField from '../mui-components/TextField';
import InputAdornment from '../mui-components/InputAdornment';
import { Search, Star, StarBorder, TrendingUp, TrendingDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCryptoContext } from '../../context/CryptoContext';

const CoinList = () => {
  // useNavigate laat me naar verschillende paginas gaan wanneer er een kolom wordt aangeklikt
  const navigate = useNavigate();

  // geeft coin array en laad state van CryptoContext
  const { coins, loading, favorites, toggleFav } = useCryptoContext();

  // huidige page nummer voor pagination (start op 0)
  const [page, setPage] = useState(0);

  // Hoeveel rijen per page wordt laten zien
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // de text de user typt in de search bar
  const [search, setSearch] = useState('');

  // array van coin IDs de user als favorites heeft geselecteerd — komt uit context
  if (loading) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  // filter coins met naam of symbool gebaseerd op de search input
  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // slice de filtered lijst naar laat alleen coins zien voor de huidige pagina
  const paginated = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // format een nummer als een USD currency string, e.g. 1234.5 → "$1,234.50"
  const formatUSD = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  // voeg of verwijder een coin toe van favorites gebaseerd op de coin ID — komt uit context

  return (
    <Box>
      {/* search bar — update de search state en reset de pagina naar 0 op elk toetsindruk*/}
      <TextField
        fullWidth
        placeholder="Search..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search /></InputAdornment> } }}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          {/* kolom headers */}
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
            {/* loop over de coins voor de huidige pagina*/}
            {paginated.map((coin) => (
              // als je een kolom klikt wordt je doorgestuurd naar de detail page
              <TableRow key={coin.id} hover onClick={() => navigate(`/coin/${coin.id}`)} sx={{ cursor: 'pointer' }}>

                {/* favorite button — e.stopPropagation() voorkomt dat het klikken op de rij wordt uitgevoerd */}
                <TableCell>
                  <IconButton onClick={(e) => { e.stopPropagation(); toggleFav(coin.id); }} color="warning" size="small">
                    {favorites.includes(coin.id) ? <Star /> : <StarBorder />}
                  </IconButton>
                </TableCell>

                {/* market cap rank (1 = biggest) */}
                <TableCell>{coin.market_cap_rank}</TableCell>

                {/* coin logo, full name, en ticker symbol */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={coin.image} sx={{ width: 24, height: 24 }} />
                    {coin.name}
                    <Typography variant="body2" color="text.secondary">{coin.symbol.toUpperCase()}</Typography>
                  </Box>
                </TableCell>

                {/* huidige prijs formatted als USD */}
                <TableCell>{formatUSD(coin.price)}</TableCell>

                {/* 24h price change — groen + TrendingUp als positive, rood + TrendingDown als negative */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: coin.price_change_percentage_24h > 0 ? 'success.main' : 'error.main' }}>
                    {coin.price_change_percentage_24h > 0 ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </Box>
                </TableCell>

                {/* totale market cap formatted als USD */}
                <TableCell>{formatUSD(coin.market_cap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* pagination controls — kan hier paginas van switchen */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
        />
      </TableContainer>
    </Box>
  );
};

export default CoinList;
