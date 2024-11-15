import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <Link className="btn btn-ghost text-xl capitalize font-bold" to="/">TechNest</Link>
            </div>
            <div className="navbar-end">
                <a className="btn capitalize">login</a>
            </div>
        </div>
    )
}

export default NavBar;