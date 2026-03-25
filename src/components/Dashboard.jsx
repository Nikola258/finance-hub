import "../css/main.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import CryptoDashboard from './dashboard/CryptoDashboard';
import ClassicDashboard from './dashboard/ClassicDashboard';

const drawerWidth = 240;

export default function Dashboard() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, marginLeft: drawerWidth, padding: '20px', boxSizing: 'border-box', minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/crypto_dashboard" replace />} />
                    <Route path="/crypto_dashboard" element={<CryptoDashboard />} />
                    <Route path="/classic_dashboard" element={<ClassicDashboard />} />
                </Routes>
            </main>

        </div>
    );
}
