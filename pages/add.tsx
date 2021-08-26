import { Box, Button, Container, Grid, Input, InputLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Cookies from 'universal-cookie';
import Header from '../src/components/header';
import { firebase } from '../src/initFirebase';
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
    ssr: false,
});
const cookies = new Cookies();
if (cookies.get('passwordHash') != process.env.NEXT_PUBLIC_PASSWORD_HASH) {
    cookies.set('passwordHash', '', { path: '/' });
}

const db = firebase.database();

export default function Add() {
    const router = useRouter();
    const classes = useStyles();

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [dutiesState, setDutiesState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        if (cookies.get('passwordHash') != process.env.NEXT_PUBLIC_PASSWORD_HASH) {
            router.push('/');
        }
    }, [router]);

    const addNewVakancy = () => {
        const vakanciesListRef = db.ref('vakancies');
        const newVakancyRef = vakanciesListRef.push();
        newVakancyRef.set({
            name: name,
            cost: cost,
            duties: stateToHTML(dutiesState.getCurrentContent()),
        });
        clearStore();
    };

    const clearStore = () => {
        setName('');
        setCost('');
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

                    <Editor
                        placeholder={'Обязанности'}
                        editorState={dutiesState}
                        toolbarClassName='toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        onEditorStateChange={setDutiesState}
                    />

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
