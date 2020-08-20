import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import {useStyles} from './style';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}))(Tooltip);

export default ({note, editNote, deleteNote, buttonsDisabled}) => {
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
                <CardActions className={classes.menu}>
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
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {note.date}
                    </Typography>
                    <LightTooltip title={note.name.length > 13 ? note.name : ''}>
                        <Typography
                            classes={{
                                root: classes.cardTitle,
                            }}
                            variant="h5"
                            component="h2"
                        >
                            {note.name.length > 13 ? note.name.substr(0, 12) + '...' : note.name}
                        </Typography>
                    </LightTooltip>
                </CardContent>
                <div className={classes.imgContainer}>
                    {
                        !!note.img.src &&
                        <img
                            alt={'note image'}
                            id="image_canv"
                            src={note.img.src}
                            className={classes.rootImg}
                            style={{
                                transform: `rotate(${note.img.imgTransform}deg)`,
                                width: `calc(100% * ${note.img.imgScale})`,
                            }}
                        />
                    }
                </div>
            </Card>
        </Grid>
    )
}

