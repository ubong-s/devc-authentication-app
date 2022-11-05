import styled from 'styled-components';
import { misc, typography, breakpoints } from '../../styles/globalStyles';

export const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 14px;
   margin-bottom: 2rem;

   label {
      position: relative;
      gap: 1rem;

      span {
         position: absolute;
         top: 50%;
         left: 13px;
         transform: translateY(-50%);
         line-height: 0;

         img {
            width: 20px;
         }
      }
   }

   input {
      border-radius: ${misc.rounded.xs};
      border: 1px solid ${(props) => props.theme.gray};
      width: 100%;
      padding: 13px 13px 13px 45px;
      height: 45px;
      outline: none;

      &:focus,
      &:active {
         border: 1px solid ${(props) => props.theme.blue};
      }

      @media screen and (min-width: ${breakpoints.tablet}) {
         height: 50px;
      }
   }
`;
