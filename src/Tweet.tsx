import * as React from 'react';
import { Avatar, Paper, Typography, Grid, IconButton, createStyles, makeStyles, Theme } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RepeatIcon from '@material-ui/icons/Repeat';
import Moment from 'react-moment';
import { State } from './reducer';
import { connect } from 'react-redux';
import { AppState } from './store';

interface OwnProps {
    tweet: any;
}

type TweetProps = OwnProps & Pick<State, 'myFavorites'>;

export const mapStateToProps = (appState: AppState) => {
    return {
        myFavorites: appState.state.myFavorites,
    };
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
    }),
);

export const Tweet: React.FC<TweetProps> = (props: TweetProps) => {
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
            <span>
                <IconButton>
                    {(props.myFavorites && props.myFavorites.indexOf(props.tweet.id)) >= 0 ? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
                <IconButton>
                    <RepeatIcon />
                </IconButton>
            </span>
        </Paper>
    );
};

export default connect(mapStateToProps)(Tweet);