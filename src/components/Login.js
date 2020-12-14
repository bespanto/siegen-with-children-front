import React from "react";
import ImgGoogleButton from '../images/btn_google_signin_light_normal_web.png';
// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


export default function Login(props) {


  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} item style={{ textAlign: 'center', padding: '1rem' }}>
        <Typography variant="h5">Login</Typography>
      </Grid>
      <Grid xs={10} item style={{ textAlign: 'center' }}>
        <a href={`${process.env.REACT_APP_BACKEND_URL}/connect/google`}>
          <Button>
            <img src={ImgGoogleButton} alt="Login mit Google"></img>
          </Button>
        </a>
      </Grid>
    </Grid>
  );
}

