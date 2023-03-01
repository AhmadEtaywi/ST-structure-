import "./Header.css"
import LogOut from './LogOut';

const Header = (props) => {



    return (
        <div className="header-container">
            <h1 className="header-title">{props.title}</h1>
            <LogOut />
        </div>
    )
}

export default Header