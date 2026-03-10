import "../css/main.css";
import Sidebar from './sidebar/sidebar';

export default function Dashboard() {
    return (
        <>
            <Sidebar />
            <main>
                <h1>Dashboard Content</h1>
            </main>
        </>
    );
}