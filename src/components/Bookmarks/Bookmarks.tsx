import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Treebeard } from 'react-treebeard';
import './Bookmarks.scss';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

interface Props {
    bookmarks: [];
}

interface State {
    data: any;
    cursor?: any;
    active: boolean;
}

class Bookmarks extends Component<Props, State> {

    static defaultProps: Props = {
        bookmarks: [],
    };

    constructor(props: any) {
        super(props);

        this.state = {
            data: data,
            active: false,
        }
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node: any, toggled: any) {
        const { cursor, data } = this.state;
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }

    render() {
        const { bookmarks } = this.props;

        const decorators = {
            Header: (props) => {
                return (
                    <div style={props.style}>
                        {props.node.title}
                    </div>
                );
            },
        };


        if (!bookmarks) {
            return(null);
        }
        console.log('bookmarks', bookmarks);

        return (
        <div className="bookmarks-wrapper">
          <Treebeard
                data={bookmarks}
                onToggle={this.onToggle}
                decorators={decorators}
            />
        </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => {
    console.log('mapStateToProps', rootState)
    return {
        bookmarks: rootState.bookmarkState.bookmarks,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);


