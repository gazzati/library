import React from "react"
import {
    Divider,
    Drawer,
    IconButton, List, ListItem,
    makeStyles,
    useTheme
} from "@material-ui/core"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 270,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 270,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerTop: {
        height: 53,
        paddingTop: 10
    },
    chatItem: {
        padding: '5px 10px',
        display: "flex",
        justifyContent: "space-between"
    },
    activeChat: {
        backgroundColor: '#b8b8b8',
        padding: '5px 10px',
        display: "flex",
        '&:hover': {
            backgroundColor: '#b8b8b8'
        }
    },
    chat: {
        display: "flex",
        alignItems: "center",
        padding: 5,
        width: '100%'
    }
}))

const Navbar = ({open, setOpen, mode, setMode}) => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{paper: classes.drawerPaper}}
        >
            <div className={classes.drawerTop}>
                <IconButton onClick={() => setOpen(!open)}>
                    {theme.direction === 'ltr'
                        ? <ChevronLeftIcon/>
                        : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem className={mode === 0 ? classes.activeChat : classes.chatItem} onClick={() => setMode(0)}>
                    Все библиотека
                </ListItem>
                <ListItem className={mode === 1 ? classes.activeChat : classes.chatItem} onClick={() => setMode(1)}>
                    Моя коллекция
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Navbar
