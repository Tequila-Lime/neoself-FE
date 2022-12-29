import { Link } from "react-router-dom";
import { requestLogout } from "./Requests";

export const Header = ({ setAuth, username, token }) => {

    const handleLogout = () => {
        setAuth(null, '')
        requestLogout(token)
    }

    return (
        <header className='hero is-small is-info'>
            <h1 className='hero-body title is-1 has-text-centered'>Neoself</h1>
            <nav className="navbar is-flex is-justify-content-space-around">
            <div className="navbar-item title is-4">
                    <Link to="/FriendList" onClick={handleLogout}>Friends</Link>
                </div>
                <div className="navbar-item title is-5">
                    <Link to="/" onClick={handleLogout}>Log Out</Link>
                </div>
                <div className="navbar-item title is-6">
                    <Link to="/Reflection" >Reflection</Link>
                </div>
                <p>Hello {username}!</p>
            </nav>
        </header >
    )
}