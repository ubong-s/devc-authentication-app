import styled from 'styled-components';

export const FormBoxFooterRoot = styled.div`
   text-align: center;
   margin-top: 2rem;

   p {
      font-size: 14px;
      margin-bottom: 0.5rem;

      &:last-of-type {
         margin-bottom: 0;
      }

      a {
         color: ${(props) => props.theme.blue};
      }
   }
`;
