import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

    // BUSCA TOKEN
    const token = localStorage.getItem('token')

    // SI NO HAY TOKEN
    if (!token) {

        // REGRESA AL LOGIN
        return <Navigate to="/" />
    }

    // SI HAY TOKEN
    return children
}

export default ProtectedRoute