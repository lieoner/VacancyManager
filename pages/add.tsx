import { Box, Button, Container, Input, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Header from '../src/components/header';
import { firebase } from '../src/initFirebase';

const cookies = new Cookies();
if (cookies.get('isAuth') != 'Y') {
    cookies.set('isAuth', 'N', { path: '/' });
}

const db = firebase.database();

export default function Add() {
    const router = useRouter();
    const classes = useStyles();

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [duties, setDuties] = useState('');

    useEffect(() => {
        if (cookies.get('isAuth') != 'Y') {
            router.push('/');
        }
    }, [router]);

    const addNewVakancy = () => {
        const vakanciesListRef = db.ref('vakancies');
        const newVakancyRef = vakanciesListRef.push();
        newVakancyRef.set({
            name: name,
            cost: cost,
            duties: duties,
        });
        clearStore();
    };

    const clearStore = () => {
        setName('');
        setCost('');
        setDuties('');
    };

    return (
        <Box>
            <Header title={'Добавление вакансии'} />
            <Container maxWidth='lg'>
                <form noValidate autoComplete='off'>
                    <FormControl className={classes.formControl} fullWidth={true}>
                        <InputLabel htmlFor='name'>Название вакансии</InputLabel>
                        <Input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            id='name'
                        />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth={true}>
                        <InputLabel htmlFor='cost'>Зарплата</InputLabel>
                        <Input
                            value={cost}
                            onChange={(e) => {
                                setCost(e.target.value);
                            }}
                            id='cost'
                        />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth={true}>
                        <InputLabel htmlFor='duties'>Обязанности</InputLabel>
                        <Input
                            value={duties}
                            onChange={(e) => {
                                setDuties(e.target.value);
                            }}
                            id='duties'
                        />
                    </FormControl>
                    <Box className={classes.btnBox}>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={() => {
                                if (name.length) {
                                    addNewVakancy();
                                    router.push('/');
                                }
                            }}
                        >
                            Добавить и вернуться на главную
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={() => {
                                if (name.length) {
                                    addNewVakancy();
                                }
                            }}
                        >
                            Добавить и очистить форму
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
}
const useStyles = makeStyles(() =>
    createStyles({
        formControl: { marginBottom: 15 },
        btnBox: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 15,
        },
        button: {
            marginRight: 15,
        },
    })
);
