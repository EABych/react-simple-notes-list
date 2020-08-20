import React, {useEffect} from 'react';
import { styles } from './styles'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {topDrawerFillingConstants} from "../../constants";
import {history} from "../../_helpers";
import {connect} from "react-redux";
import {alertActions, pageActions, userActions} from "../../_actions";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

function Header(props) {
    const { classes } = props
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(()=>{
        history.listen(() => {
            // clear alert on location change
            props.clearAlerts();
        });
    },[])

    const handleClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickAddNewNote = () => {
        setAnchorEl(null);
        props.openTopDrawer({filling: topDrawerFillingConstants.ADD_NEW_NOTE})
    };

    const logout = () => {
        props.logout()
        handleClose();
    };

    return (
        <header className={classes.mainHeader}>
            <img
                alt={'Logo'}
                src={'https://f0.pngfuel.com/png/32/64/to-do-list-notebook-clipart-png-clip-art.png'}
                style={{
                    width: 60,
                    height: 'auto',
                }}
            />
            {
                props.state.authentication.loggedIn &&
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
                        {props.state.authentication.user.firstName}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            }
            {props.alert.message &&
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.clearAlerts}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >{props.alert.message}</Alert>
            }
        </header>
    );
}

const mapStateToProps = state => {
    const {alert} = state
    return {alert, state}
};

const mapDispatchToProps = {
    clearAlerts: alertActions.clear,
    logout: userActions.logout,
    openTopDrawer: pageActions.openTopDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withStyles(styles)(Header)));

