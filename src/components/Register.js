import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestNewUser, requestLogin } from "./Requests"

export const Register = ({ setAuth }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        requestNewUser(username, password)
            .then((res) => res.data.id && (
                requestLogin(username, password)
                    .then((res) => {
                        const token = res.data.auth_token
                        setAuth(token, username)
                        navigate("/")
                    })
            ))
    }

    return (
        <div>
            <header className='header'>
                <div className="header-place">
                    <h1 className="app-name">Neoself</h1>
                </div>
            </header>
            <div className="login-box">
                <h3 className="login-label">Register</h3>
                <form className="login-form">
                    <div className="login-field">
                        <input className="login-input" type="text" placeholder="username"
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="login-field">
                        <input className="login-input" type="password" placeholder="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="login-field">

                        <button className='register-button' type="submit"
                            onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}