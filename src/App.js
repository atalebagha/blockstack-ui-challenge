import React from 'react';
import styled, { keyframes } from 'styled-components';
import hasBlockStack from './components/hasBlockstack';
import logo from './logo.svg';
import { BlockstackNamespace } from 'blockstack/lib/operations/skeletons';

const AppWrapper = styled.div`
  text-align: center;
`;

const AppLogoSpin = keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  animation: ${AppLogoSpin} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`;

const AppLink = styled.a `
  color: #61dafb;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

class App extends React.PureComponent {

  componentDidMount () {
    this.props.blockstack.redirectToSignIn();
  }
  render () {
    return (
      <AppWrapper>
        <AppHeader>
          <AppLogo src={logo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <AppLink
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </AppLink>
        </AppHeader>
      </AppWrapper>
    );
  }
}

export default hasBlockStack (App);
