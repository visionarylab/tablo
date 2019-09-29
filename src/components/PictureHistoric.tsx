import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Picture, setPictureIndex } from 'store/picture/picture';
import PictureWrapper from 'components/PictureWrapper/PictureWrapper';
import { HistoricContainer } from 'components/ui';

interface Props {
    pictures: Picture[];
    currentPictureIndex: number;
    setPictureIndex?: (index: number) => void,
}

class PictureHistoric extends Component<Props> {

    static defaultPrps = {
        pictures: [],
        currentPictureIndex: 0,
        setPictureIndex: (index: number) => {},
    }

    constructor(props: any) {
        super(props);
        this.onSelectPicture = this.onSelectPicture.bind(this);
    }

    onSelectPicture(index: number) {
        const {
            currentPictureIndex,
            setPictureIndex } = this.props;

        if (index !== currentPictureIndex && setPictureIndex) {
            setPictureIndex(index);
        }
    }

    render() {
        let { pictures, currentPictureIndex } = this.props;
        return (
            <HistoricContainer>
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
            </HistoricContainer>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureHistoric);

