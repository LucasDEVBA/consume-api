/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const nameUser = useSelector((state) => state.auth.user.name);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history('/');
  };
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <>
          <Link onClick={handleLogout} to="/login">
            <FaPowerOff size={24} />
          </Link>
          <FaCircle
            size={24}
            color="#66ff33"
          />
          <span>{nameUser}</span>
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
          <FaCircle size={24} color="red" />
        </Link>
      ) }
    </Nav>
  );
}
