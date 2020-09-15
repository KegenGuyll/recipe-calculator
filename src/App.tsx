import React from 'react';

import './App.css';

import Navigation from './components/navigation/Navigation';

import Dashboard from './components/dashboard/Dashboard';
import { Grid } from '@material-ui/core';

const App = () => {
  return (
    <Navigation>
      <Grid container justify='center' alignContent='center'>
        <Grid item>
          <Dashboard />
        </Grid>
      </Grid>
    </Navigation>
  );
};

export default App;
