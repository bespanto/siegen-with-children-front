import React from "react";
import { Link } from "react-router-dom";
import ImgPlayground from '../images/pexels-anthony-133624.jpg';
import ImgRestaurant from '../images/pexels-viktoria-alipatova-2074130.jpg';
import ImgWalking from '../images/pexels-susanne-jutzeler-1292006.jpg';
import ImgChildcare from '../images/pexels-ben-mack-5707681.jpg';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MUILink from "@material-ui/core/Link";


export default function Start(props) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} item style={{ textAlign: 'center', padding: '1rem' }}>
        {/* <Typography variant="h5">Start</Typography> */}
      </Grid>
      <Grid xs={10} md={4} item style={{ textAlign: 'center' }}>
        <MUILink component={Link} to="/Playgrounds" color="textPrimary">
          <img src={ImgPlayground} alt="Spielplatz" className={classes.image}></img>
          <Typography paragraph variant="h6">Spielplätze</Typography>
        </MUILink>
      </Grid>
      <Grid xs={10} md={4} item style={{ textAlign: 'center' }}>
        <MUILink component={Link} to="/Restaurants" color="textPrimary">
          <img src={ImgRestaurant} alt="Essen und Trinken" className={classes.image}></img>
          <Typography paragraph variant="h6">Essen und Trinken</Typography>
        </MUILink>
      </Grid>
      <Grid xs={10} md={4} item style={{ textAlign: 'center' }}>
        <MUILink component={Link} to="/Walking" color="textPrimary">
          <img src={ImgWalking} alt="Wandern" className={classes.image}></img>
          <Typography paragraph variant="h6">Wandern</Typography>
        </MUILink>
      </Grid>
      <Grid xs={10} md={4} item style={{ textAlign: 'center' }}>
        <MUILink component={Link} to="/Childcare" color="textPrimary">
          <img src={ImgChildcare} alt="Kinderbetreuung" className={classes.image}></img>
          <Typography paragraph variant="h6">Kinderbetreuung</Typography>
        </MUILink>
      </Grid>
    </Grid >
  );
}

const useStyles = makeStyles(() => ({
  image: {
    width: '300px',
    border: 'solid'
  },
}));
