import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGINA LOGIN
import LoginPage from './pages/LoginPage'

// PAGINA DASHBOARD
import DashboardPage from './pages/DashboardPage'

// COMPONENTE QUE PROTEGE RUTAS
import ProtectedRoute from './components/ProtectedRoute'

function App() {

    return (

        // ACTIVA REACT ROUTER
        <BrowserRouter>

            {/* CONTENEDOR DE RUTAS */}
            <Routes>

                {/* RUTA LOGIN */}
                <Route
                    path="/"

                    // COMPONENTE LOGIN
                    element={<LoginPage />}
                />

                {/* RUTA DASHBOARD */}
                <Route
                    path="/dashboard"

                    // RUTA PROTEGIDA
                    element={

                        <ProtectedRoute>

                            {/* PAGINA PRIVADA */}
                            <DashboardPage />

                        </ProtectedRoute>

                    }
                />

            </Routes>

        </BrowserRouter>

    )
}

export default App