import React from 'react';
import TemporaryTopDrawer from "../../../reusableComponents/topDrawer";
import FieldsForAddOrEditNote from "../../../reusableComponents/fieldsForAddOrEditNote";
import Preview from "../../../reusableComponents/preview";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PreviewNote from "../../../reusableComponents/noteCard";
import {useStyles} from './style';

function Dashboard(props) {
    const {
        closeTopDrawer,
        changeTemporaryData,
        refreshDataGlobal,
        onFileUpload,
        activeNote,
        editNote,
        deleteNote,
        setImgScale,
        setImgTransform,
        deleteImg,
        globalActiveNote,
    } = props
    const classes = useStyles();
    return (
        <>
            <TemporaryTopDrawer
                isOpen={props.isOpen}
                close={closeTopDrawer}
            >
                <FieldsForAddOrEditNote
                    onChange={changeTemporaryData}
                    onClick={refreshDataGlobal}
                    onFileUpload={onFileUpload}
                    note={activeNote}
                    activeNote={globalActiveNote}
                />
                <Preview
                    note={activeNote}
                    buttonsDisabled={true}
                    setImgScale={setImgScale}
                    setImgTransform={setImgTransform}
                    deleteImg={deleteImg}
                />
            </TemporaryTopDrawer>
            <div className={classes.root}>
                <Typography variant="h3" component="h1" className={classes.mainAriaTitle}>
                    Notes list
                </Typography>
                <Grid container spacing={3}>
                    {
                        !props.notes.length &&
                        <Typography color={'primary'} variant="h6" component="h1" className={classes.mainAriaTitle}>
                            You have no notes.
                            You can start adding notes right now!
                        </Typography>
                    }
                    {props.notes.map((note) => (
                        <PreviewNote
                            key={note.id}
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

export default Dashboard


