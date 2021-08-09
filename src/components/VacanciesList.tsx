import { Box, CardActionArea } from '@material-ui/core';
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface Props {
    vakanciesList: {
        key: string | null;
        data: {
            name: String;
            cost: String;
            duties: String;
        };
    }[];
}

export const VacanciesList: FC<Props> = ({ vakanciesList }) => {
    const classes = useStyles();
    return (
        <Box>
            {vakanciesList.map((item) => {
                return (
                    <Card key={item.key} className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Box className={classes.header}>
                                    <Typography className={classes.title}>
                                        {item.data.name}
                                    </Typography>
                                    <Typography className={classes.cost}>
                                        {item.data.cost}
                                    </Typography>
                                </Box>
                                <Typography className={classes.body} component='p'>
                                    {item.data.duties}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 20,
    },
    cost: {
        fontSize: 18,
    },
    body: {
        fontSize: 16,
    },
});
