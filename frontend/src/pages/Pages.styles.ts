import styled from 'styled-components';
import { breakpoints, misc } from '../styles/globalStyles';

export const PageRoot = styled.div`
   min-height: 100vh;
   padding: 1.5rem 0;

   @media screen and (min-width: ${breakpoints.tablet}) {
      display: flex;
      align-items: center;
      padding: 3rem 0;
   }
`;

export const PageRootAlt = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   text-align: center;
   padding: 4rem 0;
`;

export const Box = styled.div`
   max-width: 475px;
   margin: 0 auto;
   border-radius: ${misc.rounded.sm};

   h3 {
      margin: 1.25rem 0;
      font-size: 16px;
   }

   @media screen and (min-width: ${breakpoints.tablet}) {
      padding: 40px 60px;
      border-radius: ${misc.rounded.lg};
      border: 1.5px solid ${(props) => props.theme.gray};

      h3 {
         font-size: 18px;
      }
   }
`;
