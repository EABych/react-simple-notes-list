import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {PreviewNote} from "../../pages/containers/dashboard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    previewContainer: {
        margin: '2rem',
        height: '23rem',
    },
    title: {
        paddingBottom: '2rem',
    }
}));

export default function Preview(props) {
    const classes = useStyles();
    return (
        <div className={classes.previewContainer}>
            <Typography variant="h5" component="h2" className={classes.title}>
                Note Preview
            </Typography>
            <PreviewNote {...props}/>
        </div>
    );
}
