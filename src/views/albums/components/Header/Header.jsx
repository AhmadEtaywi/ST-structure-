import styles from './Header.module.css'
import LogOut from './LogOut';

const Header = (props) => {



    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title}>{props.title}</h1>
            <LogOut />
        </div>
    )
}

export default Header