import React from "react";
// Material UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function Imprint(props) {

  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} item style={{ textAlign: 'center', padding: '1rem' }}>
        <Typography variant="h5">Impressum</Typography>
      </Grid>
      <Grid xs={10} item style={{ textAlign: 'center' }}>
        <Paper style={{ padding: '0.5rem'}}>
          <Typography variant="body1">sstyle.org IT-(re)engineering</Typography>
          <Typography variant="body2">Inh. Max Becker</Typography>
          <Typography variant="body2">Am Reiherhorst 2</Typography>
          <Typography variant="body2">15537 Erkner</Typography>
          <Typography variant="body2">-</Typography>
          <Typography variant="body2">info@sstyle.org</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

