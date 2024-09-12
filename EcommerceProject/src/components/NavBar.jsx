import { NavLink } from "react-router-dom";

function NavBar ({ token }) {
    console.log("NavBar token", token);

    return (
        <nav>
            <NavLink to="/home">Home</NavLink>  | 
            <NavLink to="/register">Login/Signup</NavLink> | 
            <NavLink to="/items">Items</NavLink>
        </nav>
    );
}

export default NavBar;