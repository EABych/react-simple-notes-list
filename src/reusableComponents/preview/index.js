import React from 'react';
import PreviewNote from '../noteCard';
import Typography from "@material-ui/core/Typography";
import {useStyles} from './style'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Icon from '@mdi/react'
import { mdiMagnifyMinus, mdiMagnifyPlus, mdiRotateRight, mdiRotateLeft, mdiDeleteForever } from '@mdi/js';


export default function Preview(props) {
    const classes = useStyles();
    const {setImgScale, setImgTransform, note, deleteImg} = props
    const buttonsList  = [
        {
            icon: mdiMagnifyPlus,
            id: 'Increment',
            action: setImgScale,
        },
        {
            icon: mdiMagnifyMinus,
            id: 'Decrement',
            action: setImgScale,
        },
        {
            icon: mdiRotateLeft,
            id: 'Decrement',
            action: setImgTransform,
        },
        {
            icon: mdiRotateRight,
            id: 'Increment',
            action: setImgTransform,
        },
        {
            icon: mdiDeleteForever,
            id: 'deleteImg',
            action: deleteImg,
        },
    ]

    return (
        <div className={classes.previewContainer}>
            <Typography variant="h5" component="h2" className={classes.title}>
                Note Preview
            </Typography>
            <PreviewNote {...props}/>
            <ButtonGroup
                classes={{
                    root: classes.rootButtonsContainer,
                }}
                disabled={!note.img.src}
                color="primary"
                aria-label="outlined primary button group"
            >
                {
                    buttonsList.map((button, i) => (
                        <Button
                            key={button.id + i}
                            id={button.id}
                            onClick={button.action}
                        >
                            <Icon
                                size={1}
                                path={button.icon}
                            />
                        </Button>
                    ))
                }
            </ButtonGroup>
        </div>
    );
}
