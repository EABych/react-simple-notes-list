import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {StateContext} from "../../App";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        display: 'none',
    },
}));

export default function FieldsForAddOrEditNote({note, onChange, onClick, onFileUpload}) {
    const classes = useStyles();
    const {globalStore} = useContext(StateContext);
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                value={note.name}
                id="name"
                label="Title"
                onChange={onChange}
                required
            />
            <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={onFileUpload}
            />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <Button variant="contained" color="primary" onClick={onClick}>
                {!!globalStore.notes.activeNote ? 'Save' : 'Add'}
            </Button>
        </form>
    );
}
