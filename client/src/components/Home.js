import React from "react";
import CurrentOffers from "./CurrentOffers";
import OngoingServices from "./OngoingServices";
import UserProfile from "./userProfile";

function Home() {
  return (
    <div>
      <CurrentOffers />
      <OngoingServices />
      <UserProfile />
    </div>
  );
}

export default Home;
