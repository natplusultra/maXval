import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () =>
    <Router>
        <MuiThemeProvider>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/rate/:id" component={Rate} />
                <Route exact path="/user/:id" component={User} />
                <Route exact path="/product/:id" component={Product} /> */}
            </Switch>
        </MuiThemeProvider>
    </Router>;

export default App;

