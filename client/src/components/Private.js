import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';

const Private = () => {
    const { currentUser } = useContext(AuthContext);
    console.log('Private route current user ', currentUser);
    return currentUser ? <Outlet /> : <Navigate to='/login' />;
};

export default Private;