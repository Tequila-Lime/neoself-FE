import { Link } from "react-router-dom";
import { requestLogout } from "./Requests";

export const Header = ({ setAuth, username, token }) => {

    const handleLogout = () => {
        setAuth(null, '')
        requestLogout(token)
    }

    return (
        <header className='header'>
            <div className='logo-side'>
                <h1 className='app-name'>Neoself</h1>
                <Link className="nav-link" to="/">Dashboard</Link>
                <Link className="nav-link" to="/habits">Habits</Link>
                <Link className="nav-link" to="/friends">Friends</Link>
            </div>

            <nav className="nav-links">
            
                    <Link className="new-habit" to="/create">Add a new Habit</Link>
                    <Link className="nav-link logout" to="/" onClick={handleLogout}>Log Out</Link>

            </nav>
        </header >
    )
}