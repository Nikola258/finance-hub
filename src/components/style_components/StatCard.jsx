import { Paper, Box, Typography } from '@mui/material';

// children = alles wat je tussen <StatCard> en </StatCard> zet
const StatCard = ({ children }) => (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        {children}
    </Paper>
);

// label = de naam bv "Market Cap", value = de waarde bv "$ 1,485 B"
export const StatRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography color="text.secondary">{label}</Typography>
        <Typography>{value}</Typography>
    </Box>
);

export default StatCard;
