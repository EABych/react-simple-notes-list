import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function TemporaryTopDrawer(props) {
    const classes = useStyles();
    const {isOpen, close} = props

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        close()
    };

    return (
       <Drawer
           classes={{
                paper: classes.root,
           }}
           anchor={'top'}
                 open={isOpen}
                 onClose={toggleDrawer('top', false)}
       >
           {props.children}
       </Drawer>
    );
}
