import React, { useState } from 'react';
import moment from "moment";
import shortid from "shortid";
// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import WarningIcon from '@material-ui/icons/Warning';
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    paper: {
        textAlign: 'center',
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

function PlaygroundCardMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteContent, setDeleteContent] = useState(false);
    const [editContent, setEditContent] = useState(false);
    const [address, setAddress] = useState(props.data.address);
    const [description, setDescription] = useState(props.data.description);
    const classes = useStyles();


    function deleteItem() {
        console.log('Delete!')
        handleCloseModal();
    };

    function saveItem() {
        props.saveItem({
            id: props.data.id,
            address: address,
            description: description,
            author: localStorage.getItem("id")
        });
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setOpen(false);
        setEditContent(false);
        setDeleteContent(false);
    };

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenModalDelete = () => {
        setOpen(true);
        setDeleteContent(true)
        setAnchorEl(null);
    };

    const handleOpenModalEdit = () => {
        setOpen(true);
        setEditContent(true)
        setAnchorEl(null);
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


    return (
        <React.Fragment>
            <IconButton onClick={openMenu} size="small">
                <MoreVertIcon />
            </IconButton>
            <Menu id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}>
                <MenuItem onClick={() => handleOpenModalEdit()}>Bearbeiten</MenuItem>
                <Divider variant="middle" />
                <MenuItem onClick={() => handleOpenModalDelete()}>Löschen</MenuItem>
            </Menu>
            <Modal
                style={{ marginLeft: '1rem', marginRight: '1rem', position: 'absolute' }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleCloseModal}
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
                            {deleteContent &&
                                <span>
                                    <WarningIcon fontSize="large" style={{ color: 'red' }} />
                                    <Typography style={{ marginTop: '1rem' }}>Durch diese Aktion löschen Sie unwiederruflich den Beitrag.</Typography>
                                    <Container style={{ textAlign: 'center', marginTop: '1rem' }}>
                                        <Button variant="contained" onClick={() => deleteItem()}>Löschen</Button>
                                    </Container>
                                </span>}
                            {editContent &&
                                <Grid container spacing={1} justify="space-around" >
                                    <Grid item xs={12} style={{ padding: '1rem' }}>
                                        <Typography variant="h6">Spielplatz bearbeiten</Typography>
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
                                        <Button variant="contained" onClick={() => saveItem()}>Speichern</Button>
                                    </Grid>
                                </Grid>}
                        </Grid>
                    </Grid>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}



export default function PlaygroundCard(props) {
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [error, setError] = useState("");
    const [activeRating, setActiveRating] = React.useState(-1);
    const [ratingId, setRatingId] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();

    /**
     * 
     */
    function showError(msg) {
        setError(msg);
        setOpenErrorSnackbar(true)
    }

    /**
     * 
     */
    const closeError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnackbar(false);
    };


    const fetchRating = () => {
        const errMsg = "Kann die Bewertungsinfo nicht abfragen.";
        const url = `${process.env.REACT_APP_BACKEND_URL}/playground-ratings?author.username=${localStorage.getItem("username")}&playground.id=${props.data.id}`;
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`Status: ${res.status}`);
                }
                return res;
            })
            .then(res => res.json())
            .then((res) => {
                if (res.length > 0) {
                    console.log('rating_id: ' + res[0].id);
                    setRatingId(res[0].id);
                    setActiveRating(+res[0].grade);
                }
                else {
                    setRatingId(-1);
                    setActiveRating(-1);
                }
            })
            .catch((err) => {
                console.error(err);
                showError(errMsg);
            });
    }


    const handleExpandClick = () => {
        fetchRating();
        setExpanded(!expanded);
    };

    /**
     * 
     */
    function savePlayground(playground) {
        const errMsg = "Speichern ist fehlgeschlagen.";
        const url = `${process.env.REACT_APP_BACKEND_URL}/playgrounds/${playground.id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(playground)
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`Status: ${res.status}`);
                }
                return res;
            })
            .then(res => res.json())
            .then(() => props.fetchPlaygrounds())
            .catch((err) => {
                console.error(err);
                showError(errMsg);
            });
    };


    /**
     * 
     * @param {*} index 
     */
    function handleStep(index) {

        let method = 'POST';
        let url = `${process.env.REACT_APP_BACKEND_URL}/playground-ratings`;
        if (ratingId > 0) {
            method = 'PUT';
            url = `${process.env.REACT_APP_BACKEND_URL}/playground-ratings/${ratingId}`;
        }

        const errMsg = "Setzen der Bewertung ist fehlgeschlagen.";
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                author: localStorage.getItem("id"),
                playground: props.data.id,
                grade: index
            })
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`Status: ${res.status}`);
                }
                return res;
            })
            .then(res => res.json())
            .then((res) => {
                fetchRating();
            })
            .catch((err) => {
                console.error(err);
                showError(errMsg);
            });
    }


    /**
      * 
      * @param {*} index 
      */
    function deleteRating(index) {
        const url = `${process.env.REACT_APP_BACKEND_URL}/playground-ratings/${ratingId}`;
        const errMsg = "Speichern ist fehlgeschlagen.";
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`Status: ${res.status}`);
                }
                return res;
            })
            .then(res => res.json())
            .then((res) => {
                fetchRating();
            })
            .catch((err) => {
                console.error(err);
                showError(errMsg);
            });
    }


    /**
     * 
     */
    function getRatingStars() {
        const ratings = props.data.playground_ratings;
        let total = 0;
        const stars = [];
        for (let index = 0; index < ratings.length; index++) {
            const rating = ratings[index];
            total = total + rating.grade+1;
        }
        const roundedAverage = Math.round(total / ratings.length)
        for (let index = 1; index < 6; index++) {
            if (index <= roundedAverage)
                stars.push(<StarIcon style={{ color: 'yellow' }} key={shortid.generate()} />)
            else
                stars.push(<StarBorderIcon style={{ color: 'yellow' }} key={shortid.generate()} />)
        }
        return stars
    }

    /**
     * 
     */
    function getSteps() {
        return ['1', '2', '3', '4', '5'];
    }


    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.data.address[0]}
                        </Avatar>
                    }
                    action={
                        props.data.author && localStorage.getItem("username").username === props.author.username &&
                        <PlaygroundCardMenu data={props.data} saveItem={savePlayground} />
                    }
                    title={props.data.address}
                    subheader={'Aktualisiert: ' + moment(props.data.updated_at).format('DD.MM.YYYY, HH:mm')}
                />
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent >
                    {props.data.description}
                </CardContent>
                <CardActions disableSpacing>
                    {getRatingStars()}
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography style={{ textAlign: 'center' }}>Ihre Bewertung</Typography>
                        <Grid container alignItems="center">
                            <Grid xs={1} item>
                                {activeRating > 0 &&
                                    <IconButton onClick={() => deleteRating()}>
                                        <HighlightOffIcon style={{ color: 'red' }} />
                                    </IconButton>}
                            </Grid>
                            <Grid xs={11} item>
                                <Stepper nonLinear activeStep={activeRating} alternativeLabel connector={<StarConnector />}>
                                    {getSteps().map((label, index) => (
                                        <Step key={label}>
                                            <StepButton
                                                onClick={() => handleStep(index)}
                                                completed={index <= activeRating}
                                                icon={index <= activeRating ? <StarIcon style={{ color: 'yellow' }} /> : <StarBorderIcon style={{ color: 'yellow' }} />}
                                            >
                                                {/* {label} */}
                                            </StepButton>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
            <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={closeError}>
                <Alert onClose={closeError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </React.Fragment >
    );
}

const StarConnector = withStyles({
    line: {
        border: 0,
    },
})(StepConnector);