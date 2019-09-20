import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Picture } from 'store/picture';
import { RootState } from 'store/rootReducer';
import PictureWrapper from 'components/PictureWrapper/PictureWrapper';
import './PictureViewer.scss';

const Zooming: any = require('zooming/build/zooming');

interface Props {
    currentPictureIndex: number;
    pictures: Picture[];
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
            bgColor: 'var(--bgColor2)',
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
        const { className } = this.props;
        const { currentPicture } = this.state;

        if (!currentPicture) {
            return (null);
        }

        const pictureViewerClass = classNames('picture-viewer-wrapper', className);

        return (
            <>
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
                </div>
            </>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureViewer);
