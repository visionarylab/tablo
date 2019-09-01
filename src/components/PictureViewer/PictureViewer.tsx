import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Picture,
    getRandomPictureAsync,
    setPictureIndex,
    setMaxPicturesCount,
    toggleShowDetails,
    toggleShowHistory } from 'store/picture';
import classNames from 'classnames';
import { RootState } from 'store/rootReducer';
import { Modal } from '../Modal/Modal';
import { PictureCartel } from 'components/PictureCartel/PictureCartel';
import { PictureHistorique } from 'components/PictureHistorique/PictureHistorique';
import { PictureWrapper } from 'components/PictureWrapper/PictureWrapper';
import './PictureViewer.scss';

const Zooming: any = require('zooming/build/zooming');

interface Props {
    className: string;
    currentPictureIndex: number;
    maxPicturesCount: number;
    pictures: Picture[];
    showDetails: boolean;
    showHistory: boolean;
    getRandomPicture: () => void;
    toggleShowDetails: () => void,
    toggleShowHistory: () => void,
    setPictureIndex: (payload: number) => void,
    setMaxPicturesCount: (payload: number) => void,
}

interface State {
    currentPicture: Picture | null;
}

class PictureViewer extends Component<Props, State> {
    zoom: any;
    img: HTMLImageElement | null;

    static defaultProps: Props = {
        className: '',
        currentPictureIndex: 0,
        maxPicturesCount: 10,
        pictures: [],
        showDetails: false,
        showHistory: false,
        getRandomPicture: () => { },
        toggleShowDetails: () => { },
        toggleShowHistory: () => { },
        setPictureIndex: (payload: number) => { },
        setMaxPicturesCount: (payload: number) => { },
    };

    constructor(props: any) {
        super(props);

        this.img = null;
        this.state = {
            currentPicture: null
        };

        this.setCurrentPicture = this.setCurrentPicture.bind(this);
        this.getRandomPicture = this.getRandomPicture.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
    }

    componentDidMount() {
        this.zoom = new Zooming({
            bgColor: 'var(--bgColor)', // 'rgba(0, 0, 0, 0.3)',
            // enableGrab: false,
            // customSize: '100%'
            scaleBase: 0.9,
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        const { pictures, currentPictureIndex } = nextProps;
        let currentPicture: any;
        if (currentPictureIndex < pictures.length) {
            currentPicture = pictures[currentPictureIndex];
        }
        this.setState({ currentPicture: currentPicture });
    }

    setCurrentPicture(pict: Picture, i: number) {
        this.props.toggleShowHistory();
        if (i !== this.props.currentPictureIndex) {
            this.props.setPictureIndex(i);
        }
    }

    getRandomPicture() {
        const { getRandomPicture } = this.props;
        getRandomPicture();
    }

    onImageLoad(evt?: any) {
        if (this.zoom) {
            this.zoom.listen('.image-zoom');
        }
    }

    render() {
        const {
            className,
            pictures,
            currentPictureIndex,
            showDetails,
            showHistory,
            toggleShowDetails,
            toggleShowHistory } = this.props;
        const { currentPicture } = this.state;

        if (!currentPicture) {
            return (null);
        }

        const pictureViewerClass = classNames('picture-viewer-wrapper', className);

        return (
            <div className={pictureViewerClass}>

                <div className="picture-container">
                <PictureWrapper
                    onImageLoad={this.onImageLoad}
                    className="image-zoom"
                    src={currentPicture.medias.max}
                    alt={currentPicture.title + ' ' + currentPicture.artiste}
                />
                </div>

                <div className="picture-caption">
                    <div><i>{currentPicture.title}</i></div>
                    <div>{currentPicture.artiste}</div>
                </div>

                <Modal
                    title="Details"
                    show={showDetails}
                    onHide={toggleShowDetails}>
                    <PictureCartel picture={currentPicture} />
                </Modal>

                <Modal
                    title="History"
                    show={showHistory}
                    onHide={toggleShowHistory}>
                    <PictureHistorique
                        pictures={pictures}
                        selectedPictureIndex={currentPictureIndex}
                        onSelectPicture={this.setCurrentPicture}>
                    </PictureHistorique>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => {
    return ({
        currentPictureIndex: rootState.pictureState.currentPictureIndex,
        maxPicturesCount: rootState.pictureState.maxPicturesCount,
        pictures: rootState.pictureState.pictures,
        showDetails: rootState.pictureState.showDetails,
        showHistory: rootState.pictureState.showHistory,
    })
};

const mapDispatchToProps = (dispatch: any) => ({
    getRandomPicture: () => dispatch(getRandomPictureAsync()),
    toggleShowDetails: () => dispatch(toggleShowDetails()),
    toggleShowHistory: () => dispatch(toggleShowHistory()),
    setPictureIndex: (payload: number) => dispatch(setPictureIndex(payload)),
    setMaxPicturesCount: (payload: number) => dispatch(setMaxPicturesCount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureViewer);


