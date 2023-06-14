import { NavLink } from "react-router-dom";
import "./Nav.css";
const Nav = () => {
    return (
        <>
            <div className="topnav">
                <NavLink to="/" activeClassName="active" exact={true}>
                    Home
                </NavLink>
                <NavLink to="AddToDo" activeClassName="active" exact={true}>
                    Create to do
                </NavLink>
                <NavLink to="/about" activeClassName="active" exact={true}>
                    About
                </NavLink>
            </div>
        </>
    )
}
export default Nav;