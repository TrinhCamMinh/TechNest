import { Route, Routes } from 'react-router-dom';
import { HomePage as AdminHomePage, Login, ProductDetail} from '@/pages/admin';
import { HomePage as ClientHomePage} from '@/pages/clients';
import { MainLayout as AdminMainLayout} from '@/layouts/admin'
import { MainLayout as ClientMainLayout } from '@/layouts/clients';

function App() {
	return (
		<Routes>
            <Route path='/' element={<ClientMainLayout />}>
                <Route index element={<ClientHomePage />} />
            </Route>

            <Route path='/admin' element={<AdminMainLayout />}>
                <Route index element={<AdminHomePage />} />
                <Route path='detail/:productId' element={<ProductDetail />} />
            </Route>

            <Route path='/login' element={<Login />} />
        </Routes>
	);
}

export default App;
