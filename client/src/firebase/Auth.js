import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
import firebaseApp from './Firebase';
// import firebase from 'firebase/app';
// import { getSessionToken } from '../firebase/FirebaseFunctions';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(undefined);
  const [loadingUser, setLoadingUser] = useState(true);
  // const { id } = useParams();

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingUser(false);
    });
  }, [setUserData]);

  if (loadingUser) {
    return (
      <div className="container">
        <h1>Loading. . .</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{currentUser, userData}}>
      {children}
    </AuthContext.Provider>
  );
};
