import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Title } from './styled';

export default function Login() {
  return (
    <Container>
      <Title>
        <h1>Page not afound</h1>
      </Title>
      <Link to="/"><button type="button">Login</button></Link>
    </Container>
  );
}
