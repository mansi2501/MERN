import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

function Layout() {
    return (
        <div>
            <Header />
            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;