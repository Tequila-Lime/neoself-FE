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
            navigate("/all")
        })
    }

    return (
        <div>
            <header className='hero is-small is-info'>
                <h1 className='hero-body title is-1 has-text-centered'>Neoself</h1>
            </header>

                <form className="login-box box">
                <div className="field">
                    <input className="input" type="text" placeholder="username" 
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="field">
                    <input className="input" type="password" placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="field is-flex is-justify-content-space-between">

                        <button className='button has-background-danger-light' type="submit"
                            onClick={handleSubmit}>Log In</button>  
                        <Link to="/register">or register a new user!</Link>

                </div>
                </form>

        </div>
    )
}