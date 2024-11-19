import { NavBar, Footer } from '@/components';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="h-full w-full flex flex-col justify-between gap-8">
            <nav>
                <div role="alert" className="alert alert-info text-white font-bold rounded-none flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 shrink-0 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>New software update available.</span>
                </div>
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