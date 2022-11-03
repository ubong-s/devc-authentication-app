import styled from 'styled-components';

export const FormBoxFooterRoot = styled.div`
   text-align: center;

   p {
      font-size: 14px;

      a {
         color: ${(props) => props.theme.blue};
      }
   }
`;
