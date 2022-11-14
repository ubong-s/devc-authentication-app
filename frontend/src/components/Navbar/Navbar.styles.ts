import styled from 'styled-components';
import { breakpoints, misc, typography } from '../../styles/globalStyles';

interface ModalProps {
   path: string;
}

export const NavbarRoot = styled.nav`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 80px;
`;

export const NavbarProfile = styled.div`
   display: flex;
   gap: 0.75rem;
   align-items: center;
   cursor: pointer;
   position: relative;

   .avatar {
      width: 32px;
      height: 32px;
      border-radius: ${misc.rounded.xs};
   }

   span {
      display: none;
      font-weight: ${typography.weight.bold};
   }

   .caret {
      display: none;
      width: 10px;
      height: 10px;
      transform: rotate(0);
      transition: ${misc.transition.ease};

      &.active {
         transform: rotate(180deg);
      }
   }

   @media screen and (min-width: ${breakpoints.tablet}) {
      span {
         display: initial;
      }

      .caret {
         display: initial;
      }
   }
`;
export const NavbarModal = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   position: absolute;
   background-color: white;
   padding: 15px 12px;
   border-radius: ${misc.rounded.sm};
   border: 1px solid ${(props) => props.theme.gray};
   top: calc(100% + 1.25rem);
   right: 0;
   min-width: 188px;
   width: 100%;
   z-index: -1;
   visibility: hidden;
   opacity: 0;
   height: 0;
   transition: ${misc.transition.ease};

   .link {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 11px 13px;
      border-radius: ${misc.rounded.sm};
      font-weight: ${typography.weight.light};
      color: ${(props) => props.theme.blackLight};

      span {
         display: initial;
      }

      img {
         width: 16.5px;
         height: 16.5px;
         border-radius: 50%;
      }

      &.active,
      &:hover {
         background-color: ${(props) => props.theme.grayLight};
      }
   }

   &.active {
      z-index: 1;
      visibility: visible;
      height: auto;
      opacity: 1;
   }
`;
