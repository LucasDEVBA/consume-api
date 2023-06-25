/* eslint-disable no-unused-vars */
import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  const buttonClicked = useSelector((state) => state.example.buttonClicked);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaSignInAlt size={24} />
      </Link>
      <Link to="/estudante">
        <FaUserAlt size={24} />
      </Link>
      {buttonClicked ? 'Clicked' : 'No clicked' }
    </Nav>
  );
}
