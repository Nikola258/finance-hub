import { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography, Box, Divider, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft, MonetizationOn, Dashboard, NightlightRound, LightMode } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';

const drawerWidth = 240;

const Sidebar = () => {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeContext();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

    const menu = [
        { text: 'Crypto Dashboard', icon: <MonetizationOn />, path: '/' },
        { text: 'Classic Dashboard', icon: <Dashboard />, path: '/dashboard' }
    ];

    const isSelected = (path) => path === '/' ? location.pathname === '/' || location.pathname.startsWith('/coin/') : location.pathname === path;

    const content = (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2 }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Finance Hub</Typography>
                {isMobile && <IconButton onClick={toggleMobile}><ChevronLeft /></IconButton>}
            </Box>
            <Divider />
            <List>
                {menu.map(item => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => { navigate(item.path); isMobile && setMobileOpen(false); }} selected={isSelected(item.path)}>
                            <ListItemIcon sx={{ color: isSelected(item.path) ? theme.palette.primary.main : theme.palette.text.secondary }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ color: isSelected(item.path) ? theme.palette.primary.main : theme.palette.text.primary }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={toggleTheme}>{mode === 'dark' ? <LightMode /> : <NightlightRound />}</IconButton>
            </Box>
        </Box>
    );

    return (
        <>
            {isMobile && <IconButton onClick={toggleMobile} sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1200 }}><MenuIcon /></IconButton>}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={toggleMobile}
                ModalProps={isMobile ? { keepMounted: true } : undefined}
                sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
            >
                {content}
            </Drawer>
        </>
    );
};

export default Sidebar;