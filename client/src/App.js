import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/Homepage";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';
function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Notfound />} />

            </Routes>
        </>
    );
}

export default App;