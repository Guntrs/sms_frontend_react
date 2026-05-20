import { useState } from 'react'
import '../styles/login.css'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    // NAVEGACION
    const navigate = useNavigate()

    // GUARDA EMAIL
    const [email, setEmail] = useState('')

    // GUARDA PASSWORD
    const [password, setPassword] = useState('')

    // GUARDA MENSAJE ERROR
    const [errorMessage, setErrorMessage] = useState('')

    // LOGIN
    async function handleSubmit(e) {

        // EVITA RECARGA
        e.preventDefault()

        try {

            // LIMPIA ERROR
            setErrorMessage('')

            // PETICION A LARAVEL
            const response = await api.post('/login', {
                email,
                password
            })

            // GUARDA TOKEN
            localStorage.setItem(
                'token',
                response.data.token
            )

            // GUARDA USUARIO
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            )

            // REDIRECCIONA
            navigate('/dashboard')

        } catch (error) {

            // MENSAJE ERROR
            setErrorMessage('Credenciales incorrectas')

            console.log(error.response.data)

        }
    }

    return (

        <div className="login-container">

            <div className="login-left">

                <h1>Sign In</h1>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* MENSAJE ERROR */}
                    {

                        errorMessage && (

                            <p>
                                {errorMessage}
                            </p>

                        )

                    }

                    <button type="submit">
                        SIGN IN
                    </button>

                </form>

            </div>

            <div className="login-right">

                <h1>Hello, Friend!</h1>

                <p>
                    Enter your personal details
                    and start your journey with us
                </p>

            </div>

        </div>
    )
}

export default LoginPage