import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../firebase/Auth";
import Button from 'react-bootstrap/Button';
import CurrentOffers from "./CurrentOffers";
import OngoingServices from "./OngoingServices";
import OngoingServicesManagers from "./OngoingServicesManagers";
import Sales from "./Sales";
import RequestForm from "./Forms/RequestForm";
import NewOfferForm from "./Forms/NewOfferForm";
import "../App.css";

function Home() {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [addBtnToggle, setBtnToggle] = useState(false);
  const { currentUser, userCode } = useContext(AuthContext);
  if (userCode === 1) {
    return (
      <div>
        <div>
          <Sales />
        </div>
        <br />
        <div>
          <div className="text-center">
            <Button onClick={() => setBtnToggle(!addBtnToggle)}>New Offer</Button>
          </div>
          <br />
          <br />
          {addBtnToggle && <NewOfferForm />}
        </div>
      </div>
    )
  } else if (userCode === 2) {
    return (
      <div>
        <div className="container">
          <OngoingServicesManagers />
        </div>
      </div>
    );
  } else if (userCode === 3) {
    return (
      <div>
        <OngoingServices />
      </div>
    )
  } else {
    return (
      <div>
        <div className="left-side">
          <CurrentOffers />
        </div>
        <div className="right-side">
          <OngoingServices />
        </div>
        <br />
        <div>
          <div className="text-center">
            <Button onClick={() => setBtnToggle(!addBtnToggle)}>Service Request</Button>
          </div>
          <br />
          <br />
          {addBtnToggle && <RequestForm />}
        </div>
      </div>
    );
  }

  
}

export default Home;
