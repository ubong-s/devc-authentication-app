import { createGlobalStyle, css } from 'styled-components';

const misc = {
   rounded: {
      xs: '8px',
      sm: '10px',
      md: '15px',
      lg: '24px',
      full: '999px',
   },
   transition: {
      ease: 'all 0.3s ease-in-out',
   },
};

const typography = {
   type: {
      primary: `'Noto Sans', sans-serif`,
   },
   weight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
   },
};

const breakpoints = {
   mobile: '375px',
   tablet: '768px',
   desktop: '1024px',
   large: '1100px',
   hd: '1440px',
};

const bodyStyles = css`
   font-family: ${typography.type.primary};
   font-size: 14px;
   background-color: ${(props) => props.theme.BG};
   color: ${(props) => props.theme.black};
   line-height: 24.79px;
   max-width: 1600px;
   font-weight: ${typography.weight.normal};
   margin: auto;
   transition: ${misc.transition.ease};
   overflow-y: scroll;
   overflow-x: hidden;

   @media screen and (min-width: ${breakpoints.desktop}) {
      font-size: 1rem;
   }

   *,
   ::after,
   ::before {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: ${typography.type.primary};
   }

   main {
      min-height: 80vh;
   }

   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
      font-weight: ${typography.weight.semibold};
      letter-spacing: 0.5px;
      line-height: 24.5px;
      color: ${(props) => props.theme.black};
   }

   p {
      font-size: 14px;
      margin-bottom: 1rem;

      @media screen and (min-width: ${breakpoints.desktop}) {
         font-size: 1rem;
      }
   }

   img {
      max-width: 100%;
   }

   ul {
      list-style-type: none;
   }

   a {
      text-decoration: none;
      letter-spacing: 0.5px;
   }

   .container {
      width: 90%;
      max-width: 1300px;
      margin: auto;
   }

   .alert {
      max-width: 475px;
      margin: auto;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
      border-radius: ${misc.rounded.sm};
      color: ${(props) => props.theme.white};

      &.danger {
         background-color: ${(props) => props.theme.redLight};
         color: ${(props) => props.theme.redDark};
      }

      &.success {
         background-color: ${(props) => props.theme.greenLight};
         color: ${(props) => props.theme.greenDark};
      }
   }

   button {
      cursor: pointer;
   }
`;

const GlobalStyle = createGlobalStyle`
   html {
      scroll-behavior: smooth;
   }

   body {
      ${bodyStyles}
   }
`;

export { GlobalStyle, breakpoints, typography, misc };
