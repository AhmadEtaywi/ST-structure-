import { useNavigate } from 'react-router-dom';
import styles from './LogOut.module.css'

const LogOut = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()
        navigate('/');
    }

    return (
        <button className={styles.Log_out} onClick={logout}>Log Out</button>

    )
}

export default LogOut