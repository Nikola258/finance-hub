import { Paper, Typography } from '@mui/material';

// Props zijn waardes die je van buiten meegeeft aan een component, zoals parameters bij een functie
// title = de tekst bovenaan, bv "Favorites"
// children = wat je erin stopt tussen de tags
const SectionCard = ({ title, children }) => (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        {children}
    </Paper>
);

export default SectionCard;
