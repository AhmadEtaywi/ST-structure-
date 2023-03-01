import { useNavigate } from 'react-router-dom';
import "./LogOut.css"

const LogOut = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()
        navigate('/');
    }

    return (
        <button className='Log-out' onClick={logout}>Log Out</button>

    )
}

export default LogOut