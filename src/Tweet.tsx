import * as React from 'react';
import { Avatar, Paper, Typography, Grid, createStyles, makeStyles, Theme } from '@material-ui/core';
import Moment from 'react-moment';

interface OwnProps {
    tweet: any;
}

type MainProps = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
    }),
);

export const Tweet: React.FC<MainProps> = (props: MainProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar alt="?" src={props.tweet.user.profile_image_url} />
                </Grid>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography>{props.tweet.user.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{`@${props.tweet.user.screen_name}`}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                <Moment date={new Date(props.tweet.created_at)} format="YYYY/MM/DD HH:mm" />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Typography>{props.tweet.text}</Typography>
        </Paper>
    );
};
