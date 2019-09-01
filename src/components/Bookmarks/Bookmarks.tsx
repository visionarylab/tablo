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
    bookmarks: any;
}

interface State {
    data: any;
    cursor?: any;
    active: boolean;
}

class Bookmarks extends Component<Props, State> {

    static defaultProps: Props = {
        bookmarks: null,
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
            Header: (props: any) => {

                console.log('Header', props);
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
        bookmarks[0].title = 'root';
        bookmarks[0].name = 'root';
        bookmarks[0].toggled = true;

        console.log('bookmarks', bookmarks[0]);

        return (
        <div className="bookmarks-wrapper">
          <Treebeard
                data={bookmarks[0]}
                onToggle={this.onToggle}
                decorators={decorators}
            />
        </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        bookmarks: rootState.bookmarkState.bookmarks,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);


