import React, {useContext} from 'react';
import {StateContext} from '../../../App'
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
    } = props
    const { globalStore } = useContext(StateContext);
    const classes = useStyles();

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
                    setImgScale={setImgScale}
                    setImgTransform={setImgTransform}
                    deleteImg={deleteImg}
                />
            </TemporaryTopDrawer>
            <div className={classes.root}>
                <Typography variant="h5" component="h1" className={classes.mainAriaTitle}>
                    Notes list
                </Typography>
                <Grid container spacing={3}>
                    {globalStore.notes.notesList.map((note) => (
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

export default Dashboard;
