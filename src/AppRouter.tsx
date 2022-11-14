import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Homepage from './pages/Homepage';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    );
}
