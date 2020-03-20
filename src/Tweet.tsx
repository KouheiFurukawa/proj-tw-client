import * as React from 'react';
import {
    colors,
    Avatar,
    Paper,
    Typography,
    Grid,
    IconButton,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RepeatIcon from '@material-ui/icons/Repeat';
import Moment from 'react-moment';
import { State } from './reducer';
import { connect, useDispatch } from 'react-redux';
import { AppState } from './store';
import { actions } from './actions';

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
    const dispatch = useDispatch();
    const favCount = props.tweet.retweeted_status
        ? props.tweet.retweeted_status.favorite_count
        : props.tweet.favorite_count;
    const rtCount = props.tweet.retweeted_status
        ? props.tweet.retweeted_status.retweet_count
        : props.tweet.retweet_count;

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
                <IconButton onClick={e => dispatch(actions.requestLike(props.tweet.id_str))}>
                    {(props.myFavorites && props.myFavorites.indexOf(props.tweet.id_str)) >= 0 ? (
                        <React.Fragment>
                            <FavoriteIcon />
                            {favCount}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <FavoriteBorderIcon />
                            {favCount}
                        </React.Fragment>
                    )}
                </IconButton>
                <IconButton onClick={e => dispatch(actions.requestRetweet(props.tweet.id_str))}>
                    {props.tweet.retweeted ? (
                        <React.Fragment>
                            <RepeatIcon style={{ color: colors.green[500] }} />
                            {rtCount}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <RepeatIcon />
                            {rtCount}
                        </React.Fragment>
                    )}
                </IconButton>
            </span>
        </Paper>
    );
};

export default connect(mapStateToProps)(Tweet);
