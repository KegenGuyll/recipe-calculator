import React, { useEffect } from 'react';
import firebase from 'firebase';
import './App.css';

import Navigation from './components/navigation/Navigation';

import Dashboard from './components/dashboard/Dashboard';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { setUserData } from './redux/slice/userSlice';

const App = () => {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch(setUserData(user));
      }
    });
  }, []);

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
