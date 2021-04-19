
import React, { useEffect, useState } from 'react';

import Login from '../Auth/Login';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';

export default function Account() {

    const { logged } = useSelector(state => state.auth)

    return logged ? <UserLogged /> : <Login />;
}