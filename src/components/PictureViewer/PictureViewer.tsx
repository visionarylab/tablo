import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Picture } from 'store/picture/picture';
import { toggleDetails } from 'store/ui/ui';
import PictureWrapper from 'components/PictureWrapper/PictureWrapper';
import { PictureViewerContainer, PictureContainer, PictureCaptionContainer, Text } from 'components/ui';

const Zooming: any = require('zooming/build/zooming');

interface Props {
    currentPictureIndex: number;
    pictures: Picture[];
    showDetails: () => void;
}

interface State {
    currentPicture: Picture | null;
}

class PictureViewer extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {
    zoom: any;
    img: HTMLImageElement | null;

    static defaultProps: Props = {
        currentPictureIndex: 0,
        pictures: [],
        showDetails: () => { },
    };

    constructor(props: any) {
        super(props);

        this.img = null;
        this.state = {
            currentPicture: null
        };

        this.onImageLoad = this.onImageLoad.bind(this);
    }

    componentDidMount() {
        this.zoom = new Zooming({
            bgColor: 'var(--bgColorPanel)',
            // enableGrab: false,
            // customSize: '100%'
            scaleBase: 0.9,
            scaleExtra: 0.7
        });
        this.initSelectedPicture(this.props)
    }

    componentWillReceiveProps(nextProps: Props) {
        this.initSelectedPicture(nextProps);
    }

    initSelectedPicture(props: Props) {
        const { pictures, currentPictureIndex } = props;
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
    }

    render() {
        const { className, showDetails } = this.props;
        const { currentPicture } = this.state;

        if (!currentPicture) {
            return (null);
        }

        return (
            <PictureViewerContainer>
                <PictureContainer>
                    <PictureWrapper
                        onImageLoad={this.onImageLoad}
                        className="image-zoom"
                        src={currentPicture.medias.max}
                        alt={currentPicture.title + ' ' + currentPicture.artiste}
                    />
                </PictureContainer>

                <PictureCaptionContainer onClick={() => showDetails()}>
                    <Text><i>{currentPicture.title}</i></Text>
                    <Text>{currentPicture.artiste}</Text>
                </PictureCaptionContainer>
            </PictureViewerContainer>
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
    showDetails: () => dispatch(toggleDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureViewer);
