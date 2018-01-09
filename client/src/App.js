import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

class App extends Component {
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
        image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg",
        uuid: ""
        });
    }

    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <Navbar 
                        loggedIn={this.state.loggedIn}
                        image={this.state.image}
                        uuid={this.state.uuid}
                        handleLogOut={this.handleLogOut}
                    />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route exact path="/rate/:id" component={Rate} />
                        <Route exact path="/user/:id" component={User} />
                        <Route exact path="/product/:id" component={Product} /> */}
                    </Switch>
                </MuiThemeProvider>
            </Router>
        );
    };
}

export default App;

