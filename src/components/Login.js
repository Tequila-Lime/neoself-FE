import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { requestLogin } from "./Requests";

export const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        requestLogin(username, password)
        .then((res) => {
            const token = res.data.auth_token
            setAuth(token, username)
            navigate("/")
        })
    }

    return (
        <div>
            <div className="header">
                <header className='header-place'>
                    <h1 className='app-name'>Neoself</h1>
                </header>
            </div>    
            <div className="login-box">
                <h3 className="login-label">Login</h3>
                <form className="login-form">
                    <div className="login-field">
                        <input className="login-input" type="text" placeholder="username" 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="login-field">
                        <input className="login-input" type="password" placeholder="password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="login-field is-flex is-justify-content-space-between">

                            <button className='login-button' type="submit"
                                onClick={handleSubmit}>Log In</button>  
                            <Link className="login-button" to="/register">New user</Link>

                    </div>
                </form>
            </div>
        </div>
    )
}