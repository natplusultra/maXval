import React from "react";
import { Link } from "react-router-dom";
import "./Jumbotron.css";

const Jumbotron = () =>
  <div className="jumbotron">
    <div className="text-div">
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