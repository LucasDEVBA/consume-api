import styled from 'styled-components';
import { primaryColor } from '../../styles/config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 0;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }
`;
