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

import Parser from 'html-react-parser';
interface Vakancy {
    key: string | null;
    data: {
        name: string;
        cost: string;
        duties: string;
    };
}
interface Props {
    vakanciesList: Vakancy[];
    removeVakancy(firebaseItemKey: string | null): void;
    editVakancy(firebaseItem: Vakancy): void;
}

export const VacanciesList: FC<Props> = ({ vakanciesList, removeVakancy, editVakancy }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [selectedVakancyKey, setSelectedVakancyKey] = useState<string | null>('');

    const handleClickOpen = (key: string | null) => {
        setSelectedVakancyKey(key);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedVakancyKey('');
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
                                    {Parser(item.data.duties)}
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
                <DialogTitle id='alert-dialog-title'>{'?????????????? ?????????????????? ?????????????????'}</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        ????????????
                    </Button>
                    <Button
                        onClick={() => {
                            removeVakancy(selectedVakancyKey);
                            handleClose();
                        }}
                        color='primary'
                        autoFocus
                    >
                        ??????????????????????
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
