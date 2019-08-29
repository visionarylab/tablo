import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Icon from '@mdi/react'
import {
    mdiViewGrid,
    mdiImagePlus,
    mdiAlertBoxOutline
} from '@mdi/js';

import { RootState } from 'store/rootReducer';
import {
    Picture,
    getRandomPictureAsync,
    setPictureIndex,
    setMaxPicturesCount
} from 'store/picture';
import { Spinner } from 'components/Spinner/Spinner';
import { Modal } from '../Modal/Modal';
import { PictureCartel } from 'components/PictureCartel/PictureCartel';
import { PictureHistorique } from 'components/PictureHistorique/PictureHistorique';

import './PictureViewer.scss';
import { Box, Button, Layer, Text, Grommet } from 'grommet';
import { PictureWrapper } from 'components/PictureWrapper/PictureWrapper';


// const Dock: any = require('react-dock').default;
const Zooming: any = require('zooming/build/zooming');


interface Props {
    currentPictureIndex: number;
    maxPicturesCount: number;
    pictures: Picture[];
    getRandomPicture: () => void;
    setPictureIndex: (payload: number) => void,
    setMaxPicturesCount: (payload: number) => void,
}

interface State {
    isLoading: boolean;
    isShowDetails: boolean;
    isShowHistorique: boolean;
    magnifierSize: any;
    currentPicture: Picture | null;
}

class PictureViewer extends Component<Props, State> {
    zoom: any;
    img: HTMLImageElement | null;

    static defaultProps: Props = {
        currentPictureIndex: 0,
        maxPicturesCount: 10,
        pictures: [],
        getRandomPicture: () => { },
        setPictureIndex: (payload: number) => { },
        setMaxPicturesCount: (payload: number) => { },
    };

    constructor(props: any) {
        super(props);

        this.img = null;
        this.state = {
            isLoading: true,
            isShowDetails: false,
            isShowHistorique: false,
            magnifierSize: { w: 0, h: 0 },
            currentPicture: null
        };

        this.setCurrentPicture = this.setCurrentPicture.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onImageError = this.onImageError.bind(this);
        this.getRandomPicture = this.getRandomPicture.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.showHistorique = this.showHistorique.bind(this);
        this.hideHistorique = this.hideHistorique.bind(this);
    }

    componentDidMount() {
        this.zoom = new Zooming({
            bgColor: '#282c34', // 'rgba(0, 0, 0, 0.3)',
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

    onImageLoad(evt?: any) {
        if (this.zoom) {
            this.zoom.listen('.image-zoom');
        }
        this.setState({ isLoading: false });
    }

    onImageError(evt: any) {
        this.setState({ isLoading: false });
    }

    setCurrentPicture(pict: Picture, i: number) {
        this.hideHistorique();
        if (i !== this.props.currentPictureIndex) {
            this.setState({ isLoading: true });
            this.props.setPictureIndex(i);
        }
    }

    getRandomPicture() {
        const { getRandomPicture } = this.props;
        this.setState({ isLoading: true });
        getRandomPicture();
    }

    showDetails() { this.setState({ isShowDetails: true }) }
    hideDetails() { this.setState({ isShowDetails: false }) }
    showHistorique() { this.setState({ isShowHistorique: true }) }
    hideHistorique() { this.setState({ isShowHistorique: false }) }

    render() {
        const { pictures, currentPictureIndex } = this.props;
        const {
            isLoading,
            isShowDetails,
            isShowHistorique,
            currentPicture
        } = this.state;

        if (!currentPicture) {
            return (null);
        }

        const pictureClass = classNames('image-zoom', { 'image-loaded': !isLoading });
        const modalStyle = {
            // padding: 'calc(80px + 36px + 5px) 80px 80px 80px'
            margin: '80px 80px calc(40px + 36px + 5px) 80px',
            backgroundColor: '#282c34'
        };

        const myTheme = {
            layer: {
                background: '#282c34',
                overlay: {
                    background: '#282c34',
                },
                extend: {

                }
            }
        }
        return (
            <div className="picture-viewer-wrapper">

                <div className="picture-caption bg-box "
                    data-tip={currentPicture.title + ' - ' + currentPicture.artiste}>
                    <span>{currentPicture.title + ' - ' + currentPicture.artiste}</span>
                </div>

                <div className="picture-container">
                <PictureWrapper
                    className={pictureClass}
                    src={currentPicture.medias.max}
                    alt={currentPicture.title + ' ' + currentPicture.artiste}
                    onImageLoad={this.onImageLoad}
                />
                </div>

                <div className="picture-toolbar bg-box">
                    <button className="picture-viewer-btn"
                        data-tip="New picture"
                        onClick={this.getRandomPicture}>
                        <Icon path={mdiImagePlus} size={1} color="white" />
                    </button>
                    <button className="picture-viewer-btn"
                        data-tip="Show history"
                        onClick={this.showHistorique}>
                        <Icon path={mdiViewGrid} size={1} color="white" />
                    </button>
                    <button className="picture-viewer-btn"
                        data-tip="Show details"
                        onClick={this.showDetails}>
                        <Icon path={mdiAlertBoxOutline} size={1} color="white" />
                    </button>
                </div>

                <Modal
                    style={modalStyle}
                    show={isShowDetails}
                    onHide={this.hideDetails}>
                    <PictureCartel picture={currentPicture} />
                </Modal>

                {/* isShowHistorique &&
                <Grommet theme={myTheme}>
                    <Layer
                        position="bottom"
                        animation="slide"
                        onEsc={() => this.hideHistorique}
                        onClickOutside={this.hideHistorique}
                        >

                    <button className="picture-viewer-btn"
                        onClick={this.hideHistorique}>
                        <Icon path={mdiAlertBoxOutline} size={1} color="white" />
                    </button>
                        <PictureHistorique
                            pictures={pictures}
                            selectedPictureIndex={currentPictureIndex}
                            onSelectPicture={this.setCurrentPicture}>
                        </PictureHistorique>
                    </Layer>
                </Grommet>

                */}

                <Modal
                    style={modalStyle}
                    show={isShowHistorique}
                    onHide={this.hideHistorique}>
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
    console.log('rootState', rootState);
    return ({
        currentPictureIndex: rootState.pictureState.currentPictureIndex,
        maxPicturesCount: rootState.pictureState.maxPicturesCount,
        pictures: rootState.pictureState.pictures,
    })
};

const mapDispatchToProps = (dispatch: any) => ({
    getRandomPicture: () => dispatch(getRandomPictureAsync()),
    setPictureIndex: (payload: number) => dispatch(setPictureIndex(payload)),
    setMaxPicturesCount: (payload: number) => dispatch(setMaxPicturesCount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureViewer);


