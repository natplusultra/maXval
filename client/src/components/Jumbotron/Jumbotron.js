import React from "react";
import { Link } from "react-router-dom";
import "./Jumbotron.css";

const Jumbotron = () =>
  <div className="row jumbotron">
    <div className="col s12 l12 text-div">
        <h1 className="title">maXval</h1>
        <br />
        <p className="tagline">A crowdsourced valuation tool for your products.</p>
        <br />
        <br />
        <div className="btn-div">
            <Link to="/rate" className="waves-effect waves-light btn center-align">Get started!</Link>
        </div>
    </div>
  </div>;

export default Jumbotron;