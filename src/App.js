import React from 'react';
import {
  UserSession,
  AppConfig,
} from 'blockstack';
import S from 'sanctuary';
import { Grommet, Box, Button, Text, Heading } from 'grommet';
import { Login, Logout } from 'grommet-icons';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import AppBar from './components/AppBar';
import { browserHistory as history } from './index';
import reducer from './reducer';
import { StateProvider } from './StoreContext';

const ResetStyles = createGlobalStyle `
  ${reset}
`

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

class App extends React.PureComponent {
  constructor() {
    super ();
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    this.state = {
      userSession: new UserSession ({ appConfig }),
      userData: S.Nothing,
      user: S.Nothing,
    }
  }

  componentDidMount = async () => {
    const { userSession } = this.state;

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      const user = await userSession.loadUserData ();
      this.setState({ userData: S.Just (userData), user: S.Just (user) }, () => history.push ('/notes'));
    } else {

    }
  }

  handleSignIn = (e) => {
    e && e.preventDefault();
    this.state.userSession.redirectToSignIn ();
  }

  handleSignOut = (e) => {
    e && e.preventDefault();
    this.state.userSession.signUserOut(window.location.origin);
  }

  render () {
    const { userSession } = this.state;
    return (
      <StateProvider reducer={reducer} initialState={{ notes: [] }}>
        <Grommet theme={theme}>
          <ResetStyles />
          <AppBar>
            <Text>My Notes</Text>
            {userSession.isUserSignedIn () ? 
              <Button onClick={this.handleSign} icon={<Logout/>} primary label="Sign Out"/> :
              <Button onClick={this.handleSignIn} icon={<Login/>} primary label="Sign In"/>
            }
          </AppBar>
          <Box direction='column' pad='large' align='center' animation='fadeIn'>
            {React.cloneElement (this.props.children, { ...this.state })}
          </Box>
        </Grommet>
      </StateProvider>
    );
  }
}

export default App;
