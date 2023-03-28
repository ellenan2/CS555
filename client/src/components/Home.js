import React from "react";
import CurrentOffers from "./CurrentOffers";
import OngoingServices from "./OngoingServices";
import UserProfile from "./userProfile";

function Home() {
  return (
    <div>
      <UserProfile />
      <CurrentOffers />
      <OngoingServices />
    </div>
  );
}

export default Home;
