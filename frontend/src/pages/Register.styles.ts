import styled from 'styled-components';
import { breakpoints, misc } from '../styles/globalStyles';

export const RegisterRoot = styled.div`
   display: flex;
   min-height: 100vh;
   padding: 2rem 0;

   @media screen and (min-width: ${breakpoints.desktop}) {
   }
`;

export const RegisterBox = styled.div`
   max-width: 475px;
   margin: auto;
   border: 1.5px solid ${(props) => props.theme.gray};
   border-radius: ${misc.rounded.sm};
   padding: 30px;

   h3 {
      margin: 1.25rem 0;
      font-size: 16px;
   }

   @media screen and (min-width: ${breakpoints.desktop}) {
      padding: 40px 60px;
      border-radius: ${misc.rounded.lg};

      h3 {
         font-size: 18px;
      }
   }
`;
