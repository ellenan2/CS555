import React from "react";
import CurrentOffers from "./CurrentOffers";
import OngoingServices from "./OngoingServices";
import RequestForm from "./Forms/RequestForm";
import "../App.css";

function Home() {
  return (
    <div >
      <div className="left-side">
        <CurrentOffers />
      </div>
      <div className="right-side">
        <OngoingServices />
      </div>
      <div>
        <RequestForm />
      </div>
    </div>
  );
}

export default Home;
