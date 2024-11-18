import { Outlet } from 'react-router-dom';
import { CustomSideBar } from '@/components'

const Main = () => {
    return (
        <div className="w-full h-full flex flex-row">
            <aside className='grow'>
                <CustomSideBar />
            </aside>
            <main className='grow-[2] container pr-4'> 
                <Outlet />
            </main>
        </div>
    )
}

export default Main;