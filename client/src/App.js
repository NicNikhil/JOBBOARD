import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/Homepage";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routes/PrivateRoute';
function App() {
    return (
        <>
            {" "}
            <ToastContainer />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>

                    } />
                <Route path="*" element={<Notfound />} />

            </Routes>
        </>
    );
}

export default App;