import React, { useState } from 'react';
import { Link } from "react-router-dom";
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  function logout() {
    localStorage.removeItem('jwt');
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <header>
      <Box className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton aria-label="Menu" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu id="main-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>

              <MenuItem component={Link} to="/Start" onClick={handleClose}>Start</MenuItem>
              <Divider />
              <MenuItem component={Link} to="/Login" onClick={handleClose}>Login</MenuItem>
              <Divider />
              <MenuItem component={Link} to="/Playgrounds" onClick={handleClose}>Spielplätze</MenuItem>
              <MenuItem component={Link} to="/Restaurants" onClick={handleClose}>Restaurants</MenuItem>
              <MenuItem component={Link} to="/Childcare" onClick={handleClose}>Kinderbetreuung</MenuItem>
              <MenuItem component={Link} to="/Walking" onClick={handleClose}>Wandern</MenuItem>
              <Divider />
              <MenuItem component={Link} to="/Profile" onClick={handleClose}>Profil</MenuItem>
              <Divider />
              <MenuItem component={Link} to="/TermsOfUse" onClick={handleClose}>Nutzungsbedingungen</MenuItem>
              <MenuItem component={Link} to="/PrivacyPolicy" onClick={handleClose}>Dateschutz</MenuItem>
              <MenuItem component={Link} to="/Imprint" onClick={handleClose}>Impressum</MenuItem>
            </Menu>
            <Box className={classes.grow} >
              <Button component={Link} to="/Start" color="inherit" style={{ textTransform: 'none'}}>
                <Typography variant="h6" >
                  Siegen mit Kindern
                </Typography>
              </Button>
            </Box>
            <React.Fragment>
              <span style={{ textAlign: 'center' }}>
                <Grid container direction="column" alignItems="center" justify="center">
                  <Grid item>
                    <IconButton component={Link} to="/Profile" size="small">
                      <Person fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">Benutzer</Typography>
                  </Grid>
                </Grid>
              </span>
              <IconButton onClick={() => logout()} size="small">
                <ExitToAppIcon />
              </IconButton>
            </React.Fragment>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));

