import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import React, { useState } from 'react';
import { RootState } from '../../redux/reducers';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { setUserData } from '../../redux/slice/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: '25ch',
        backgroundColor: '#fff',
      },
    },
    avatarLarge: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    avatarSmall: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  })
);

const LoginMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const Googleprovider = new firebase.auth.GoogleAuthProvider();
  const dispatch: Dispatch = useDispatch();
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchSignUp = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setSignUp(true);
    setLogin(false);
  };

  const switchLogin = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLogin(true);
    setSignUp(false);
  };

  const handleGoogleSign = () => {
    firebase.auth().signInWithRedirect(Googleprovider);
  };

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(
          setUserData({
            uid: '',
            photoURL: '',
            email: '',
            displayName: '',
          })
        );
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        {user.uid ? (
          <Avatar
            className={classes.avatarSmall}
            alt={user.displayName ? user.displayName : ''}
            src={user.photoURL ? user.photoURL : ''}
          />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Card style={{ maxWidth: '300px' }}>
          {user.uid ? (
            <>
              <CardContent>
                <Grid container justify='center' alignContent='center'>
                  <Grid item>
                    <Avatar
                      className={classes.avatarLarge}
                      alt={user.displayName ? user.displayName : ''}
                      src={user.photoURL ? user.photoURL : ''}
                    />
                  </Grid>
                  <Grid
                    item
                    justify='center'
                    alignContent='center'
                    container
                    xs={12}
                  >
                    <Typography variant='h6'>{user.displayName}</Typography>
                  </Grid>
                  <Grid
                    item
                    justify='center'
                    alignContent='center'
                    container
                    xs={12}
                  >
                    <Typography color='textSecondary' variant='caption'>
                      {user.email}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Grid container>
                <Grid item xs={12}>
                  <List>
                    <ListItem onClick={signout} button>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </>
          ) : (
            <CardContent>
              <form className={classes.root} noValidate autoComplete='off'>
                <Grid container justify='center' alignContent='center'>
                  <TextField
                    fullWidth
                    id='outlined-basic'
                    label='Email'
                    type='email'
                    variant='outlined'
                  />
                  <TextField
                    fullWidth
                    id='outlined-basic'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    variant='outlined'
                  />
                  {signUp ? (
                    <Button color='primary' variant='contained'>
                      Register
                    </Button>
                  ) : (
                    <Button color='primary' variant='contained'>
                      Login
                    </Button>
                  )}
                  {signUp ? (
                    <Button onClick={handleGoogleSign} variant='outlined'>
                      <img
                        height='25'
                        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                        alt='Google Sign In'
                      />
                    </Button>
                  ) : null}
                  <Typography variant='caption'>
                    {!signUp ? (
                      <Link onClick={switchSignUp} color='inherit'>
                        Don't have an account?
                      </Link>
                    ) : (
                      <Link onClick={switchLogin} color='inherit'>
                        Already have an account?
                      </Link>
                    )}
                  </Typography>
                </Grid>
              </form>
            </CardContent>
          )}
        </Card>
      </Popover>
    </>
  );
};

export default LoginMenu;
