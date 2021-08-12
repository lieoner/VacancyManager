import { Box, Button, Container, Input, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Header from '../src/components/header';
import { firebase } from '../src/initFirebase';

const cookies = new Cookies();
if (cookies.get('passwordHash') != process.env.NEXT_PUBLIC_PASSWORD_HASH) {
    cookies.set('passwordHash', '', { path: '/' });
}

const db = firebase.database();

interface Vakancy {
    key: string;
    data: {
        name: string;
        cost: string;
        duties: string;
    };
}

export default function Edit() {
    const router = useRouter();
    const classes = useStyles();

    const [key, setKey] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [duties, setDuties] = useState('');

    useEffect(() => {
        if (cookies.get('passwordHash') != process.env.NEXT_PUBLIC_PASSWORD_HASH) {
            router.push('/');
        }
        if (typeof router.query.vakancyKey == 'string') {
            setKey(router.query.vakancyKey ?? '');

            db.ref(`/vakancies/${router.query.vakancyKey}`).once('value', (data) => {
                console.log(data.val());
                setName(data.val().name ?? '');
                setCost(data.val().cost ?? '');
                setDuties(data.val().duties ?? '');
            });
        } else {
            router.push('/');
        }
    }, [router]);

    const editCurVakancy = () => {
        const curVakancyRef = db.ref(`vakancies/${key}`);
        curVakancyRef.set({
            name: name,
            cost: cost,
            duties: duties,
        });
    };

    return (
        <Box>
            <Header title={'Изменение вакансии'} />
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
                                    editCurVakancy();
                                    router.back();
                                }
                            }}
                        >
                            Сохранить и вернуться на главную
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
