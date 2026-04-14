import { Paper, Typography } from '@mui/material';

// SectionCard is een wrapper met een titel erboven
// title = de tekst bovenaan bv "Favorites"
// children = de inhoud die je erin stopt
const SectionCard = ({ title, children }) => (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
    </Paper>
);

export default SectionCard;
