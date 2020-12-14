import React, { useState, useEffect, useCallback } from "react";
import shortid from "shortid";
import PlaygroundCard from "./PlaygroundCard";
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Playgrounds(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [playgrounds, setPlaygrounds] = useState([]);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const classes = useStyles();

  /**
   * 
   */
  function showError(msg) {
    setError(msg);
    setOpenSnackbar(true)
  }


  /**
   * 
   */
  const closeError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  /**
  * Sets state for changed fields on tap event
  */
  function handleChange(event) {
    switch (event.target.name) {
      case "address":
        setAddress(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  }

  /**
   * 
   */
  function createPlayground() {
    const errMsg = "Speichern ist fehlgeschlagen.";
    const url = `${process.env.REACT_APP_BACKEND_URL}/playgrounds/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        address: address,
        description: description
      })
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Fehler beim Erzeugen der Playground-Daten. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(() => {
        setAddress('');
        setDescription('');
        fetchPlaygrounds();
      })
      .catch((err) => {
        console.error(err);
        showError(errMsg);
      });
    setOpen(false)
  };

  /**
   * 
   */
  const fetchPlaygrounds = useCallback(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/playgrounds`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Sie konnten nicht eingeloggt werden. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        setPlaygrounds(res);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        showError('Sorry. Das hat nicht geklappt.')
      });
  }, [])


  useEffect(() => {
    fetchPlaygrounds()
  }, [fetchPlaygrounds]);


  return (
    <React.Fragment>
      <Grid container spacing={1} justify="space-around" >
        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <Typography variant="h5">Spielplätze</Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <IconButton aria-label="new playground" onClick={() => setOpen(true)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>

        {playgrounds.map(playground =>
          <Grid item xs={10} md={6} style={{ height: '400' }} key={shortid.generate()}>
            <Grid container justify="center" style={{ paddingTop: '8px', paddingBottom: '8px' }} >
              <PlaygroundCard data={playground} author={playground.author} fetchPlaygrounds={fetchPlaygrounds} />
            </Grid>
          </Grid>
        )}

      </Grid>
      <Modal
        style={{ marginLeft: '1rem', marginRight: '1rem', position: 'absolute' }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableEnforceFocus
        disableAutoFocus
      >
        <Fade in={open}>
          <Grid container spacing={1} justify="center" alignContent="center" className={classes.paper} >
            <Grid item md={6}>
              <Grid item xs={12} style={{ padding: '1rem' }}>
                <Typography variant="h6">Spielplatz hinzufügen</Typography>
              </Grid>
              <Grid item xs={12} style={{ padding: '1rem' }}>
                <TextField
                  id="address"
                  label="Adresse"
                  variant="outlined"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} style={{ padding: '1rem' }}>
                <TextField
                  id="description"
                  label="Beschreibung"
                  name="description"
                  multiline
                  rows={6}
                  value={description}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} style={{ padding: '1rem' }}>
                <Button variant="contained" onClick={() => createPlayground()}>Speichern</Button>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));