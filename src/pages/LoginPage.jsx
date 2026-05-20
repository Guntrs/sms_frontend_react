import { useState } from 'react'
import '../styles/login.css'
import api from '../api/axios'

function LoginPage() {

    // GUARDA EL EMAIL
    const [email, setEmail] = useState('')

    // GUARDA EL PASSWORD
    const [password, setPassword] = useState('')

    // FUNCION DEL LOGIN
    async function handleSubmit(e) {

        // EVITA RECARGAR LA PAGINA
        e.preventDefault()

        try {

            // ENVIA DATOS A LARAVEL
            const response = await api.post('/login', {
                email,
                password
            })

            // GUARDA TOKEN EN EL NAVEGADOR
            localStorage.setItem(
                'token',
                response.data.token
            )

            // MUESTRA RESPUESTA
            console.log(response.data)

        } catch (error) {

            // MUESTRA ERROR
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

                        // VALOR DEL INPUT
                        value={email}

                        // ACTUALIZA EL ESTADO
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"

                        // VALOR DEL INPUT
                        value={password}

                        // ACTUALIZA EL ESTADO
                        onChange={(e) => setPassword(e.target.value)}
                    />

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