import { Box, Button, Container, Input, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../src/components/header';
import { firebase } from '../src/initFirebase';

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
        if (typeof router.query.vakancy == 'string') {
            const vakancy: Vakancy = JSON.parse(router.query.vakancy);
            setKey(vakancy.key ?? '');
            setName(vakancy.data.name ?? '');
            setCost(vakancy.data.cost ?? '');
            setDuties(vakancy.data.duties ?? '');
        } else {
            router.push('/');
        }
    }, []);

    const editCurVakancy = () => {
        const curVakancyRef = db.ref(`vakancies/${key}`);
        curVakancyRef.set({
            name: name,
            cost: cost,
            duties: duties,
        });
        clearStore();
    };

    const clearStore = () => {
        setKey('');
        setName('');
        setCost('');
        setDuties('');
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
