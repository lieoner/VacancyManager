import { Box, Button, CardActionArea, IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import React, { FC, useState } from 'react';

interface Vakancy {
    key: string | null;
    data: {
        name: String;
        cost: String;
        duties: String;
    };
}
interface Props {
    vakanciesList: Vakancy[];
    removeVakancy(arg0: string | null): void;
    editVakancy(arg0: Vakancy): void;
}

export const VacanciesList: FC<Props> = ({ vakanciesList, removeVakancy, editVakancy }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [selectedVakancy, setSelectedVakancy] = useState<string | null>('');

    const handleClickOpen = (key: string | null) => {
        setSelectedVakancy(key);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedVakancy('');
        setOpen(false);
    };

    return (
        <Box>
            {vakanciesList.map((item) => {
                return (
                    <Card key={item.key} className={classes.root}>
                        <CardActionArea disableRipple={true}>
                            <CardContent>
                                <Box className={classes.header}>
                                    <Box className={classes.cardTitleBox}>
                                        <Typography className={classes.title}>
                                            {item.data.name}
                                        </Typography>
                                        <Typography className={classes.cost}>
                                            {item.data.cost}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.cardBtnBox}>
                                        <IconButton
                                            edge='start'
                                            className={classes.cardButton}
                                            color='inherit'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editVakancy(item);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge='start'
                                            className={classes.cardButton}
                                            color='inherit'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClickOpen(item.key);
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography className={classes.body} component='p'>
                                    {item.data.duties}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{'Удалить выбранную вакансию?'}</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Отмена
                    </Button>
                    <Button
                        onClick={() => {
                            removeVakancy(selectedVakancy);
                            handleClose();
                        }}
                        color='primary'
                        autoFocus
                    >
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    cardTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 20,
    },
    cardBtnBox: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 20,
    },
    cost: {
        fontSize: 18,
    },
    cardButton: {},
    body: {
        width: '100%',
        overflowWrap: 'break-word',
        fontSize: 16,
    },
});
