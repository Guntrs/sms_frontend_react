import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

function DashboardPage() {

    // GUARDA DATOS DEL USUARIO
    const [user, setUser] = useState(null)

    // PERMITE REDIRECCIONAR
    const navigate = useNavigate()

    // OBTENER USUARIO AUTENTICADO
    const getUser = async () => {

        try {

            // OBTIENE TOKEN
            const token = localStorage.getItem('token')

            // PETICION A LARAVEL
            const response = await api.get('/user', {

                headers: {

                    // ENVIA TOKEN
                    Authorization: `Bearer ${token}`

                }

            })

            // GUARDA USUARIO
            setUser(response.data)

            console.log(response.data)

        } catch (error) {

            console.log(error.response.data)

        }
    }

    // CERRAR SESION
    function logout() {

        // ELIMINA TOKEN
        localStorage.removeItem('token')

        // REDIRECCIONA AL LOGIN
        navigate('/')
    }

    // SE EJECUTA AL CARGAR
    useEffect(() => {

        async function loadUser() {

            await getUser()

        }

        loadUser()

    }, [])

    return (

        <div>

            <h1>DASHBOARD</h1>

            {

                // SI EXISTE USER
                user && (

                    <div>

                        {/* NOMBRE */}
                        <h2>
                            {user.name}
                        </h2>

                        {/* EMAIL */}
                        <p>
                            {user.email}
                        </p>

                        {/* BOTON LOGOUT */}
                        <button onClick={logout}>
                            LOGOUT
                        </button>

                    </div>

                )

            }

        </div>
    )
}

export default DashboardPage