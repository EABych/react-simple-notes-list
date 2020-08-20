import React, {useContext} from 'react';
import {StateContext} from '../../App'
import { styles } from './styles'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {topDrawerFillingConstants} from "../../constants";

function Dashboard(props) {
    const { classes } = props
    const {globalStore, setGlobalStore} = useContext(StateContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setGlobalStore({type: 'logout'})
    };
    const handleClickAddNewNote = () => {
        setAnchorEl(null);
        setGlobalStore({type: 'openTopDrawer', payload: {filling: topDrawerFillingConstants.ADD_NEW_NOTE}})
    };

    return (
        <header className={classes.mainHeader}>
            logo
            <div className={classes.mainHeader_rightButtonsContainer}>
                <Button
                    classes={{
                        root: classes.customButton,
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={handleClickAddNewNote}
                >
                    Add new note
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClickOpenMenu}
                >
                    {globalStore.user.name}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </header>
    );
}

export default React.memo(withStyles(styles)(Dashboard))
