import React from 'react';
import { Box } from 'grommet';

const AppBar = props =>
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='light-2'
    pad={{ vertical: 'small', horizontal: 'medium' }}
    {...props}
  />;

export default AppBar;
