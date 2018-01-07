import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from 'material-ui/Avatar';
import "./Navbar.css";

class Navbar extends Component {
  // sets the initial values
  state = {
    loggedIn: false,
    image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg",
    uuid: ""
  }
  
  // handles logging in
  handleLogIn = event => {
    this.setState({
      loggedIn: true,
      image: event.target.image,
      uuid: event.target.uuid
    });
  }

  //handles logging out
  handleLogOut = () => {
    this.setState({
      loggedIn: false,
      image: "",
      uuid: ""
    });
  }

  loggedOutMenu = () => {
    return (
      <ul className="right">
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li className="avatar">
          <Avatar
            src={this.state.image}
            size={40}
            style={{verticalAlign: "middle"}}
          />
        </li>
      </ul>
    );
  }

  loggedInMenu = () => {
    return (
      <ul className="right">
        <li><Link to="/rate">Rate</Link></li>
        <li><Link to="/">Log Out</Link></li>
        <li className="avatar"><Link to="/user">
          <Avatar
            src={this.state.image}
            size={40}
            style={{verticalAlign: "middle"}}
          />
        </Link></li>
      </ul>
    );
  }

  render() {
    return (
      <div className="navbar-fixed">
          <nav className="site-navbar">
              <div className="nav-wrapper">
                  <Link to="/" className="brand-logo"><i className="material-icons">thumbs_up_down</i> maXval</Link>
                  <div>{ this.state.loggedIn ? this.loggedInMenu() : this.loggedOutMenu() }</div>
              </div>
          </nav>
      </div>
    );
  }
};

export default Navbar;