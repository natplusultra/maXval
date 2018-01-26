import React from "react";
import "./Home.css";
import Jumbotron from "../../components/Jumbotron";

const Home = () => (
    <div>
        <Jumbotron />
        <div className="container">
            <p className="info-text">maXval is the premier crowdsourced product valuation application for modern market research.  maXval enables individuals and companies of any size to quickly evaluate their products in a simple and approachable platform.
            <br/><br/>
            See how others view your product, receive valuable feedback to inform your marketing and pricing strategies, and discover a faster path to successful product launches.</p>
        </div>
    </div>
)

export default Home;