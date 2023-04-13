import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../firebase/Auth";
import Button from 'react-bootstrap/Button';
import CurrentOffers from "./CurrentOffers";
import OngoingServices from "./OngoingServices";
import RequestForm from "./Forms/RequestForm";
import "../App.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [addBtnToggle, setBtnToggle] = useState(false);
  const {currentUser} = useContext(AuthContext)

  return (
    <div >
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

export default Home;
