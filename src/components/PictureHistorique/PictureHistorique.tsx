import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Picture, setPictureIndex } from 'store/picture';
import { closeAllSidebarSidebar } from 'store/ui';
import { PictureWrapper } from 'components/PictureWrapper/PictureWrapper';
import './PictureHistorique.scss';

interface Props {
    pictures: Picture[];
    currentPictureIndex: number;
    setPictureIndex?: (index: number) => void,
    closeAllSidebarSidebar: () => void;
}

class PictureHistorique extends Component<Props> {

    static defaultPrps = {
        pictures: [],
        currentPictureIndex: 0,
        setPictureIndex: (index: number) => {},
        closeAllSidebarSidebar: () => {},
    }

    constructor(props: any) {
        super(props);
        this.onSelectPicture = this.onSelectPicture.bind(this);
    }

    onSelectPicture(index: number) {
        const {
            currentPictureIndex,
            setPictureIndex,
            closeAllSidebarSidebar } = this.props;
        if (index !== currentPictureIndex && setPictureIndex) {
            setPictureIndex(index);
        }
        closeAllSidebarSidebar();
    }

    render() {
        let { pictures, currentPictureIndex } = this.props;
        return (
            <div className="historique-wrapper">
                {pictures.map((pict: any, i: number) => {
                    const className = classNames({ 'selected': (i === currentPictureIndex) });
                    return (
                        <PictureWrapper
                            key={i}
                            className={className}
                            src={pict.medias.mini}
                            alt={pict.medias.mini}
                            onClick={() => this.onSelectPicture(i)}
                        />
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => {
    return ({
        currentPictureIndex: rootState.pictureState.currentPictureIndex,
        pictures: rootState.pictureState.pictures,
    })
};

const mapDispatchToProps = (dispatch: any) => ({
    setPictureIndex: (payload: number) => dispatch(setPictureIndex(payload)),
    closeAllSidebarSidebar: () => dispatch(closeAllSidebarSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureHistorique);

