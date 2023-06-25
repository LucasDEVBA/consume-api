import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Title } from './styled';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(exampleActions.clickButtonReq());
  };
  return (
    <Container>
      <Title>
        Home
      </Title>
      <p>Lorem Ipsum dolor sit amet.</p>
      <Link to="/estudante">
        {' '}
        <button type="button" onClick={handleClick}>Send</button>
      </Link>
    </Container>
  );
}
