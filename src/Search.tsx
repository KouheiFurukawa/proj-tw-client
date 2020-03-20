import * as React from 'react';
import { State } from './reducer';
import { actions } from './actions';
import { TextField, Button } from '@material-ui/core';
import { AppState } from './store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Tweet from './Tweet';

interface OwnProps {
    handleOnChangeSearch(text: string): void;
    handleOnRequestSearch(query: string, product: string): void;
}

type SearchProps = OwnProps & Pick<State, 'searchResult' | 'searchInput'>;

const mapStateToProps = (appState: AppState) => {
    return {
        searchInput: appState.state.searchInput,
        searchResult: appState.state.searchResult,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeSearch: (text: string) => {
            dispatch(actions.changeSearch(text));
        },
        handleOnRequestSearch: (query: string, product: string) => {
            dispatch(actions.requestSearch({ query, product }));
        },
    };
};

const Search: React.FC<SearchProps> = (props: SearchProps) => {
    return (
        <div>
            <div>
                <TextField
                    label="search"
                    value={props.searchInput}
                    onChange={e => props.handleOnChangeSearch(e.target.value)}
                />
                <Button color="primary" onClick={e => props.handleOnRequestSearch(props.searchInput, '30day')}>
                    Search
                </Button>
            </div>
            {props.searchResult.map(tweet => {
                return <Tweet key={tweet.id} tweet={tweet} />;
            })}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
