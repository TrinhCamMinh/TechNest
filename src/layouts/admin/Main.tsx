import { Outlet } from 'react-router-dom';
import { CustomSideBar } from '@/components'
import { SidebarProvider } from "@/components/ui/sidebar"

const Main = () => {
    return (
        <div className="grid grid-cols-8">
            <aside className='col-span-1'>
                <SidebarProvider>
                    <CustomSideBar />
                </SidebarProvider>
            </aside>
            <main className='col-span-7 container'> 
                <Outlet />
            </main>
        </div>
    )
}

export default Main;