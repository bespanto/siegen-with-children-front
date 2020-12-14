import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function LoginRedirect(props) {
  const [text, setText] = useState('Loading...');
  const location = useLocation();
  const params = useParams();
  const history = useHistory();


  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/${params.providerName}/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Sie konnten nicht eingeloggt werden. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        console.log(res);
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('id', res.user.id);
        // localStorage.setItem('user', JSON.stringify(res.user));
        setText('Login war erfolgreich. Sie werden weitergeleitet ...');
        setTimeout(() => history.push('/'), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('Sorry. Das hat nicht geklappt.')
      });
  }, [history, location.search, params.providerName]);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} item style={{ textAlign: 'center', padding: '1rem' }}>
        <Typography variant="h5">Login</Typography>
      </Grid>
      <Grid xs={10} item style={{ textAlign: 'center' }}>
        <Typography paragraph>{text}</Typography>
      </Grid>
    </Grid>
  );
}

