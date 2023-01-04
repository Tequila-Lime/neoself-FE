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
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <p className='nav-link'>Friends</p>
            </div>

            <nav className="nav-links">
            
                    <Link className="nav-link" to="/UserList">Users</Link>
                    <Link className="nav-link" to="/FriendList"> Friends</Link>
                    <Link className="nav-link logout" to="/" onClick={handleLogout}>Log Out</Link>
                    <Link className="nav-link" to="/Reflection" >Reflection</Link>
                    <Link className="nav-link" to="/createReflection" >Create Reflection</Link>
                    <Link className="nav-link" to="/Reflection" >Reflection</Link>
                    <Link className="nav-link" to="/create">Create Questionnaire</Link>
                    <Link className="nav-link" to="/questionnaires">questionnaires</Link>
                    <Link className="nav-link" to="/user-records">Your records</Link>
                    <Link className="nav-link" to="/friend-records">Friend records</Link>
                    <Link className="nav-link" to="/records-today">Records today</Link>
                    <Link className="nav-link" to="/createReactions"> Create Reactions</Link>
                    <Link className="nav-link" to="/weeklogs">WeekLogs</Link>
                    <Link className="nav-link" to="/results">Results</Link>
            </nav>
        </header >
    )
}