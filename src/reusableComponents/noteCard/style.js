import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    previewContainer: {
        margin: '2rem',
        height: '26rem',
    },
    title: {
        fontSize: 14,
    },
    media: {
        height: 140,
    },
    rootCard: {
        minWidth: 275,
        backgroundColor: '#d2d2d270',
        position: 'relative',
    },
    menu:{
        position: 'absolute',
        right: 0,
    },
    imgContainer: {
        maxHeight: 200,
        height: 150,
        width: '100%',
        maxWidth: 275,
        overflow: "hidden",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rootImg: {
        height: `auto`,
    },
    cardTitle: {
        minHeight: '2rem',
        cursor: 'default'
    }
}));