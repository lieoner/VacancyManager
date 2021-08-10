import { Box, Button, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../src/components/header';
import { VacanciesList } from '../src/components/VacanciesList';
import { firebase } from '../src/initFirebase';

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
    useEffect(() => {
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
            query: { vakancy: JSON.stringify(vakancy) },
        });
    };

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
const useStyles = makeStyles(() =>
    createStyles({
        button: {
            marginTop: 30,
            marginBottom: 30,
        },
    })
);
