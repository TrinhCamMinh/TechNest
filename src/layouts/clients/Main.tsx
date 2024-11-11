import { NavBar, Footer } from '@/components';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="h-full flex flex-col justify-between gap-2">
            <nav>
                <NavBar />
            </nav>
            <main className="container">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Main;