import React from 'react';
import { useStyles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export default function FieldsForAddOrEditNote({note, onChange, onClick, onFileUpload, activeNote}) {
    const classes = useStyles();

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
            <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                disabled={!note.name}
            >
                {!!activeNote ? 'Save' : 'Add'}
            </Button>
        </form>
    );
}
