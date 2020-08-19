import React, {useContext, useEffect, useState} from 'react';
import {StateContext} from '../../../App'
import { makeStyles } from '@material-ui/core/styles';
import TemporaryTopDrawer from '../../../reusableComponents/topDrawer'
import FieldsForAddOrEditNote from "../../../reusableComponents/fieldsForAddOrEditNote";
import Preview from "../../../reusableComponents/preview";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    rootCard: {
        minWidth: 275,
        backgroundColor: '#d2d2d270'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    mainAriaTitle: {
        width: '100vw',
        textAlign: 'center',
        margin: '3rem',
    },
    media: {
        height: 140,
    },
}));


export const PreviewNote = ({note, editNote, deleteNote, buttonsDisabled}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const customEditNote = () => {
        editNote(note.id);
        handleClose()
    };

    const customDeleteNote = () => {
        deleteNote(note.id);
        handleClose()
    };


    return(
        <Grid item key={note.img}>
            <Card
                variant="outlined"
                className={classes.rootCard}
            >
                <CardActions>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        disabled={buttonsDisabled}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={customEditNote}>Edit</MenuItem>
                        <MenuItem onClick={customDeleteNote}>Delete</MenuItem>
                    </Menu>
                </CardActions>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {note.date}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {note.name}
                    </Typography>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image={note.img}
                    title="Contemplative Reptile"
                />
            </Card>
        </Grid>
    )
}

function Dashboard() {
    const classes = useStyles();
    const now = new Date()
    const {globalStore, setGlobalStore} = useContext(StateContext);
    const [activeNote, setActiveNote] = useState(globalStore.notes.notesList.find(note => note.id === globalStore.notes.activeNote) ||
        {
            name: ' ',
            date: now.toDateString(),
            img: ''
    })

    useEffect(()=>{
        if(!!globalStore.notes.activeNote){
            setActiveNote(globalStore.notes.notesList.find(note => note.id === globalStore.notes.activeNote))
        } else {
            setActiveNote( {
                name: ' ',
                date: now.toDateString(),
                img: ''
            })
        }
    },[globalStore.notes.activeNote])

    const changeTemporaryData = event => {
        const {id, value} = event.currentTarget
        setActiveNote({
            ...activeNote,
            [id]: value,
        })
    }

    const onFileUpload = e => {
        let formData   = new FormData(),
            file       = e.target.files[0],
            fileReader = new FileReader()

        if (file) {
            if (file.type.split('/')[0] !== 'image') {
                // Only files with the following extension JPG, JPEG and PNG are allowed
            } else {
                fileReader.onload = function(ev) {
                    setActiveNote({
                        ...activeNote,
                        img: ev.target.result,
                    })
                }
                fileReader.readAsDataURL(file)
                formData.append('avatar', file)
            }
        }
    }

    const refreshDataGlobal = () => {
        setGlobalStore({type: !!activeNote.id ? 'saveNodeChange':'addNewNote', payload: activeNote})
        clearTemporaryData()
    }

    const clearTemporaryData = () => {
        setActiveNote({
            name: ' ',
            date: now.toDateString(),
            img: '',
        })
    }

    const closeTopDrawer = () => {
        setGlobalStore({type: 'closeTopDrawer'})
        clearTemporaryData()
    }

    const editNote = id => {
        setGlobalStore({type: 'editNote', payload: {id}})
    }


    const deleteNote = id => {
        setGlobalStore({type: 'deleteNote', payload: {id}})
    }

    return (
        <>
            <TemporaryTopDrawer
                isOpen={globalStore.screenToggleElementsState.topDrawer.isOpen}
                close={closeTopDrawer}
            >
                <FieldsForAddOrEditNote
                    onChange={changeTemporaryData}
                    onClick={refreshDataGlobal}
                    onFileUpload={onFileUpload}
                    note={activeNote}
                />
                <Preview
                    note={activeNote}
                    buttonsDisabled={true}
                />

            </TemporaryTopDrawer>
            <div className={classes.root}>
                <Typography variant="h5" component="h1" className={classes.mainAriaTitle}>
                    Notes list
                </Typography>
                <Grid container spacing={3}>
                    {globalStore.notes.notesList.map((note) => (
                        <PreviewNote
                            note={note}
                            editNote={editNote}
                            deleteNote={deleteNote}
                        />
                    ))}
                </Grid>
            </div>
            </>
    );
}

export default Dashboard;
