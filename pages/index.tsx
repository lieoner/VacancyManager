import { Box, Button, Container } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Header from '../src/components/header';
import { firebase } from '../src/initFirebase';

const db = firebase.database();

export default function Home() {
    const router = useRouter();
    const classes = useStyles();
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
