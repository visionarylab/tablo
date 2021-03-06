import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { closeAll } from 'store/ui/ui';
import { Section, SectionItem, setUserSection } from 'store/sidebar/sidebar';
import './Edit.scss';

interface Props {
    section: Section | null;
    setUserSection: (payload: Section) => void
    closeAll: () => void
}

interface State {
    item: SectionItem;
}

class Edit extends Component<Props, State> {

    static defaultProps: Props = {
        section: null,
        setUserSection: (payload: Section) => {},
        closeAll: () => { },
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            item: { label: '', link: '' }
        };

        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.resetItem = this.resetItem.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        const { section } = this.props
        if (section) {
                // this.setState({ item: section.items[index]})
        }
    }

    handleLabelChange(event: any) {
        const { item } = this.state;
        item.label = event.target.value;
        this.setState({ item });
    }

    handleLinkChange(event: any) {
        const { item } = this.state;
        item.link = event.target.value;
        this.setState({ item });
    }

    saveItem() {
        const { section, setUserSection } = this.props;
        const { item } = this.state;
        if (section) {
            section.items.push(item);
            setUserSection(section);
            this.resetItem();
        }
    }

    resetItem() {
        const { closeAll } = this.props;
        this.setState({ item: { label: '', link: '' } });
        closeAll();
    }

    render() {
        const { item } = this.state;

        if (!item) {
            return (null);
        }

        return (
            <div className="edit-wrapper">
                <div>
                    <label htmlFor="label">Label</label>
                    <input type="text" name="label" value={item.label} onChange={this.handleLabelChange}/>
                </div>

                <div>
                    <label htmlFor="link">Link</label>
                    <input type="text" name="link"  value={item.link} onChange={this.handleLinkChange}/>
                </div>

                <input type="submit" value="Cancel" onClick={this.resetItem}/>
                <input type="submit" value="Save" onClick={this.saveItem}/>
            </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => ({
    section: rootState.sidebarState.userSection,
});

const mapDispatchToProps = (dispatch: any) => ({
    setUserSection: (payload: Section) => dispatch(setUserSection(payload)),
    closeAll: () => dispatch(closeAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
