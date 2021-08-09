import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router';
import React from 'react';

export default function Header({ title = 'Вакансии' }) {
    const classes = useStyles();
    const router = useRouter();
    return (
        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    <HomeIcon />
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: 30,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);
