import React from "react";
import { Link } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import "./Navbar.css";

const Navbar = props => (
    <div className="nav-wrapper">
        <nav className="site-navbar">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo"><i className="material-icons">thumbs_up_down</i> maXval</Link>
                <ul className="right">
                    <li>{ props.loggedIn ? <Link to="/rate">Rate</Link> : <Link to="/login">Log In</Link> }</li>
                    <li>{ props.loggedIn ? <Link to="/logout">Log Out</Link> : null }</li>
                    <li className="avatar">
                        { props.loggedIn ? <Link to={`/user/${props.uid}`}><Avatar src={props.image} size={40} style={{verticalAlign: "middle"}} /></Link> : <Avatar src={props.image} size={40} style={{verticalAlign: "middle"}} />}
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

export default Navbar;