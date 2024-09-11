import { NavLink } from "react-router-dom";

function NavBar ({ token }) {
    console.log("NavBar token", token);

    return (
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/register">Login/Signup</NavLink>
        </nav>
    );
}

export default NavBar;