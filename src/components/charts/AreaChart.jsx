import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChart = ({ title, data = [], dataKey = 'value', xAxisKey = 'date', color = 'primary' }) => {
    const theme = useTheme();
    const strokeColor = theme.palette[color]?.main || theme.palette.primary.main;

    return (
        <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
                <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                            <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                            <XAxis dataKey={xAxisKey} tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} />
                            <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} tickFormatter={(v) => `$${new Intl.NumberFormat('en-US', { notation: 'compact' }).format(v)}`} />
                            <Tooltip formatter={(v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)} contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider }} />
                            <Area type="monotone" dataKey={dataKey} stroke={strokeColor} fill="url(#areaGradient)" />
                        </RechartsAreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AreaChart;
