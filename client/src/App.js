import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {teal300} from "material-ui/styles/colors";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rate from "./pages/Rate";
import Login from "./pages/Login";
import Logout from './pages/Logout';
import Product from "./pages/Product";
import User from "./pages/User";
import { app, base } from './base';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal300
  }
});

class App extends Component {
    // sets the initial values
    constructor() {
        super();
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.state = {
            loggedIn: false,
            currentUser: null,
            uid: "",
            name: "",
            email: "",
            image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg"
        }
    }

    setCurrentUser(user) {
        if (user) {
          localStorage.setItem('myData-User', user);
          this.setState({
            loggedIn: true,
            currentUser: user,
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL
          })
        } else {
          this.setState({
            loggedIn: false,
            currentUser: null,
            uid: null,
            name: null,
            email: null,
            image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg"
          })
        }
      }

      componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              loggedIn: true,
              currentUser: user,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              image: user.photoURL
            })
          } else {
            this.setState({
              loggedIn: false,
              currentUser: null,
              uid: null,
              name: null,
              email: null,
              image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg"  
            })
          }
        })
      }
    
      componentWillUnmount() {
        this.removeAuthListener();
      }
    

    render() {
      console.log(this.state.currentUser);
      localStorage.setItem('user-id', this.state.uid);
      var user = {
        name: this.state.name,
        uid: this.state.uid,
        email: this.state.email,
        image: this.state.image
      }
        return (
            <Router>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <Navbar 
                            loggedIn={this.state.loggedIn}
                            image={this.state.image}
                            uid={this.state.uid}
                            handleLogOut={this.handleLogOut}
                        />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/rate" render={(props) => {
                              return <Rate user={user} {...props} />
                            }} />
                            <Route exact path="/login" render={(props) => {
                              return <Login setCurrentUser={this.setCurrentUser} {...props} />
                            }} />
                            <Route exact path="/logout" component={Logout} />
                            <Route exact path="/user/:id" render={(props) => {
                              return <User user={user} {...props} />
                            }} />
                            <Route exact path="/product/:id" render={(props) => {
                              return <Product user={user} {...props} />
                            }} />
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    };
}

export default App;
