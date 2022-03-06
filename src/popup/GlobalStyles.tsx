import { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  html,
  body {
    width: 375px;
    height: 600px;
  }

  body {
    overflow-y: scroll;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const GlobalStyles: FunctionComponent = () => (
  <Global styles={globalStyles} />
);
