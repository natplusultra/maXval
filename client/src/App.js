import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rate from "./pages/Rate";
import Login from "./pages/Login";
import Logout from './pages/Logout';
import Upload from "./pages/Upload";
import { app, base } from './base';


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
            image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg",
            email: ""
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
            image: user.photoURL,
            email: user.email
          })
        } else {
          this.setState({
            loggedIn: false,
            currentUser: null,
            uid: null,
            name: null,
            image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg",
            email: null
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
              image: user.photoURL,
              email: user.email
            })
          } else {
            this.setState({
              loggedIn: false,
              currentUser: null,
              uid: null,
              name: null,
              image: "https://www.finearttips.com/wp-content/uploads/2010/05/avatar.jpg",
              email: null
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
        image: this.state.image,
        uid: this.state.uid
      }
        return (
            <Router>
                <MuiThemeProvider>
                    <div>
                        <Navbar 
                            loggedIn={this.state.loggedIn}
                            image={this.state.image}
                            uuid={this.state.uuid}
                            handleLogOut={this.handleLogOut}
                        />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/rate" render={(props) => {
                              return <Rate user={user} {...props} />
                            }} />
                            <Route exact path="/upload" render={(props) => {
                              return <Upload user={user} {...props} />
                            }} />
                            <Route exact path="/login" render={(props) => {
                              return <Login setCurrentUser={this.setCurrentUser} {...props} />
                            }} />
                            <Route exact path="/logout" component={Logout} />
                            {/* <Route exact path="/user/:id" component={User} />
                            <Route exact path="/product/:id" component={Product} /> */}
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    };
}

export default App;
