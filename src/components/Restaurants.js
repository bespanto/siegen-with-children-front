import React from "react";
// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Restaurants(props) {

  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} item style={{ textAlign: 'center', padding: '1rem' }}>
        <Typography variant="h5">Restaurants</Typography>
      </Grid>
      <Grid xs={10} item style={{ textAlign: 'center' }}>
        Restaurants page
      </Grid>
    </Grid>
  );
}

