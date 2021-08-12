import { Avatar, Box, Button, Container, CssBaseline, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Header from '../src/components/header';
import { VacanciesList } from '../src/components/VacanciesList';
import { hashCode } from '../src/hashString';
import { firebase } from '../src/initFirebase';

const cookies = new Cookies();
if (cookies.get('passwordHash') != process.env.NEXT_PUBLIC_PASSWORD_HASH) {
    cookies.set('passwordHash', '', { path: '/' });
}

const db = firebase.database();

interface Vakancy {
    key: string | null;
    data: {
        name: string;
        cost: string;
        duties: string;
    };
}

export default function Home() {
    const router = useRouter();
    const classes = useStyles();
    const [vakanciesList, setVakanciesList] = useState<Vakancy[]>([]);
    const [isAuth, setIsAuth] = useState(false);
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (cookies.get('passwordHash') == process.env.NEXT_PUBLIC_PASSWORD_HASH) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        if (!vakanciesList.length) {
            const vakanciesListRef = db.ref('vakancies');
            vakanciesListRef.on(
                'value',
                function (data) {
                    data.forEach(function (vakancy) {
                        var key = vakancy.key;
                        var childData = vakancy.val();
                        setVakanciesList((oldVakanciesList) => [
                            ...oldVakanciesList,
                            { key: key, data: childData },
                        ]);
                    });
                },
                function (error) {
                    console.error(error);
                }
            );
        }
    }, [vakanciesList]);

    const removeVakancy = (vakancyKey: string | null) => {
        db.ref(`/vakancies/${vakancyKey}`).remove();
        setVakanciesList([]);
    };

    const editVakancy = (vakancy: Vakancy) => {
        router.push({
            pathname: '/edit',
            query: { vakancyKey: vakancy.key },
        });
    };

    const login = () => {
        if (hashCode(password).toString() == process.env.NEXT_PUBLIC_PASSWORD_HASH) {
            cookies.set('passwordHash', process.env.NEXT_PUBLIC_PASSWORD_HASH, { path: '/' });
            router.reload();
        }
    };

    if (!isAuth) {
        return (
            <Box>
                <Header />
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Авторизация
                        </Typography>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            fullWidth
                            name='password'
                            label='Пароль'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                    </div>
                    <Button
                        onClick={() => {
                            login();
                        }}
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            <Header />
            <Container maxWidth='lg'>
                <Button
                    variant='contained'
                    color='secondary'
                    className={classes.button}
                    onClick={() => {
                        router.push('/add');
                    }}
                >
                    Добавить новую вакансию
                </Button>
                <VacanciesList
                    vakanciesList={vakanciesList}
                    removeVakancy={removeVakancy}
                    editVakancy={editVakancy}
                />
            </Container>
        </Box>
    );
}
const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            marginTop: 30,
            marginBottom: 30,
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);
