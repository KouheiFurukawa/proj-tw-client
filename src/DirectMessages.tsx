import * as React from 'react';
import { AppState } from './store';
import { connect } from 'react-redux';

interface OwnProps {
    directMessages: any[];
}

type MainProps = OwnProps;

const mapStateToProps = (appState: AppState) => {
    return {
        directMessages: appState.state.directMessages,
    };
};

const DirectMessage: React.FC<MainProps> = (props: MainProps) => {
    return (
        <div>
            {props.directMessages.map(dm => {
                return (
                    <div>
                        <div>{dm.created_timestamp}</div>
                        <div>{dm.message_data.text}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default connect(mapStateToProps)(DirectMessage);
