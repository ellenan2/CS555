import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { AuthContext } from "../firebase/Auth";

function Viewer(props) {
    const { currentUser, userData } = useContext(AuthContext);
}