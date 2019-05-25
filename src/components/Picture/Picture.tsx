import React, { Component } from 'react';
import Icon from '@mdi/react'
import { mdiRefresh, mdiEye  } from '@mdi/js'
import { Dialog } from 'primereact/dialog';

import { Picture } from 'store/picture';
import { Spinner } from 'components/Spinner/Spinner';
import { Button } from 'components/Buttons/Button';

import Magnifier from "react-magnifier";
import classNames from "classnames";
import { RootState } from 'store/rootReducer';
import { getRandomPictureAsync } from 'store/picture';
import { connect } from 'react-redux';
import { Cartel } from 'components/Cartel/Cartel';

import './Picture.scss';

interface Props {
    picture: Picture | null;
    getRandomPicture: () => any;
}

interface State {
    isLoading: boolean;
    isShowDetails: boolean;
    magnifierSize: any;
}

class AppPicture extends Component<Props, State> {
    img: HTMLImageElement | null;

    static defaultProps: Props = {
        picture: null,
        getRandomPicture: () => { },
    };

    constructor(props: any) {
        super(props);

        this.img = null;
        this.state = {
            isLoading: true,
            isShowDetails: false,
            magnifierSize: { w: 0, h: 0 }
        };

        // this.loadPicture = this.loadPicture.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onImageError = this.onImageError.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
    }

    componentDidMount() {
        // this.loadPicture();
        window.addEventListener("resize", () => {
            this.computeMagnifierSize(false);
        });
    }

    /*
    async loadPicture() {
        this.setState({ isLoading: true });
        let picture = await API.picture.getRandomPicture();
        // console.log('picture', picture);
        this.setState({ picture: picture });
    };
    */

    onImageLoad(evt: any) {
        this.setState({ isLoading: false });
    }

    onImageError(evt: any) {
        // this.loadPicture();
    }

    showDetails() {
        this.computeMagnifierSize(true);
    }

    hideDetails() {
        this.setState({ isShowDetails: false });
    }

    computeMagnifierSize(isShowDetails: boolean) {
        let width = 0;
        let height = 0;

        if (this.img) {
            const w = (window.innerWidth / 2) - 20;
            const h = window.innerHeight - 20;
            const cw = this.img.clientWidth;
            const ch = this.img.clientHeight;

            const rx = w / cw;
            const ry = h / ch;
            const r1 = Math.min(rx, ry)

            width = r1 * cw;
            height = r1 * ch;
        }

        this.setState({
            isShowDetails: this.state.isShowDetails ? true : isShowDetails,
            magnifierSize: {
                w: width,
                h: height
            }
        });
    }

    render() {
        const { picture, getRandomPicture } = this.props;
        const { isLoading, isShowDetails, magnifierSize } = this.state;

        return (
            <div className="picture-wrapper" id="picture">

                <Button className="load-picture-btn"
                    isIcon={true}
                    onClick={getRandomPicture}>
                    <Icon path={mdiRefresh} size={0.8} color="white" />
                    <span>Random image</span>
                </Button>

                <div className="picture-content">
                    { isLoading &&
                    <div className="picture-loader">
                        <Spinner />
                    </div>
                    }

                    { this.img && !isLoading &&
                    <Button className="picture-overlay-btn"
                        isIcon={true}
                        onClick={this.showDetails}>
                        <Icon path={mdiEye} size={3} color="white" />
                    </Button>
                    }

                    {picture &&
                    <img className={classNames({ 'image-loaded': !isLoading })}
                        src={picture.medias.max}
                        alt={picture.title + ' ' + picture.artiste}
                        ref={(el) => this.img = el}
                        onLoad={this.onImageLoad}
                        // onClick={this.showDetails}
                    />
                    }
                </div>

                <Dialog
                    showHeader={false}
                    visible={isShowDetails}
                    modal={false}
                    className="details-wrapper"
                    onHide={this.hideDetails}>

                    { picture &&
                    <div className="details-content">
                        <div className="details-image-wrapper">
                            <Magnifier
                                className="details-image image-loaded"
                                mgShowOverflow={true}
                                src={picture.medias.max}
                                width={magnifierSize.w}
                                height={magnifierSize.h}
                                mgWidth={250}
                                mgHeight={250}>
                            </Magnifier>
                        </div>

                        <div className="details-cartel-wrapper">
                            <Cartel
                                picture={picture}
                                hideDetails={this.hideDetails}>
                            </Cartel>
                        </div>
                    </div>
                    }
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (rootState: RootState) => {
    return {
        picture: rootState.pictureState.current,
        history: rootState.pictureState.current,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    getRandomPicture: () => dispatch(getRandomPictureAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPicture);


