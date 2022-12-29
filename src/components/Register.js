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
                        navigate("/all")
                    })
            ))
    }

    return (
        <div>
            <header className='hero is-small is-info'>
                <h1 className='hero-body title is-1 has-text-centered'>Neoself</h1>
            </header>

            <form className="login-box box">
                <div className="field">
                    <input className="input" type="text" placeholder="username"
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="field">
                    <input className="input" type="password" placeholder="password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="field is-flex is-justify-content-space-between">

                    <button className='button has-background-danger-light' type="submit"
                        onClick={handleSubmit}>Register</button>
                </div>
            </form>
        </div>
    )
}