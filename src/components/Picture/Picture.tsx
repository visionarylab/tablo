import React, { Component } from 'react';
import './Picture.scss';
import getRandomPicture from './getRandomPicture';

import Icon from '@mdi/react'
import { mdiRefresh, mdiClose, mdiEye,
    mdiDownload, mdiOpenInNew } from '@mdi/js'
import { Dialog } from 'primereact/dialog';

import { Picture } from 'types/picture';
import { Spinner } from 'components/Spinner/Spinner';
import { Button } from 'components/Buttons/Button';
// import Magnifier from './Magnifier';

import Magnifier from "react-magnifier";
import classNames from "classnames";


interface PictureState {
    isLoading: boolean;
    isShowDetails: boolean;
    picture?: Picture | null;
    magnifierSize: any;
}

export class AppPicture extends Component<any, PictureState> {
    img: HTMLImageElement | null;

    constructor(props: any) {
        super(props);

        this.img = null;
        this.state = {
            isLoading: true,
            isShowDetails: false,
            picture: null,
            magnifierSize: { w: 0, h: 0 }
        };

        this.loadPicture = this.loadPicture.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onImageError = this.onImageError.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.downloadImage = this.downloadImage.bind(this);
        this.openImageWebsite = this.openImageWebsite.bind(this);
    }

    componentDidMount() {
        this.loadPicture();
        window.addEventListener("resize", () => {
            this.computeMagnifierSize(false);
        });
    }

    async loadPicture() {
        this.setState({ isLoading: true });
        let picture = await getRandomPicture();
        // console.log('picture', picture);
        this.setState({ picture: picture });
    };

    onImageLoad(evt: any) {
        this.setState({ isLoading: false });
    }

    onImageError(evt: any) {
        this.loadPicture();
    }

    showDetails() {
        this.computeMagnifierSize(true);
    }

    hideDetails() {
        this.setState({ isShowDetails: false });
    }

    downloadImage() {
        if (this.state.picture) {
            const link = document.createElement('a');
            link.href = this.state.picture.medias.max;
            link.download = this.state.picture.title + '.jpg';
            link.rel = 'noopener noreferrer';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    openImageWebsite() {
        if (this.state.picture) {
            window.open(this.state.picture.medias.page, '_blank')
        }
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
        let { isLoading, isShowDetails, picture, magnifierSize } = this.state;

        return (
            <div className="picture-wrapper" id="picture">

                <Button className="load-picture-btn" isIcon={true}
                    onClick={this.loadPicture}>
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
                    <Button className="picture-overlay-btn" isIcon={true}
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
                            mgHeight={250}/>
                        </div>

                        <div className="details-cartel-wrapper">
                            <div className="cartel-header">
                                <div className="cartel-header-controls">
                                    <Button className="cartel-btn"
                                        onClick={this.openImageWebsite}>
                                        <Icon path={mdiOpenInNew} size={0.8} />
                                        <span>Visit {picture.from} page</span>
                                    </Button>

                                    <Button className="cartel-btn"
                                        onClick={this.downloadImage}>
                                        <Icon path={mdiDownload} size={0.8} />
                                        <span>Download</span>
                                    </Button>
                                </div>

                                <Button className="cartel-btn close-cartel-btn" isIcon
                                    onClick={this.hideDetails}>
                                    <Icon path={mdiClose} size={1} />
                                </Button>
                            </div>

                            <div className="scroll-container">
                                {!!picture.title &&
                                <div className="item">
                                    <div className="label">Title: </div>
                                    <div>{picture.title}</div>
                                </div>
                                }

                                {!!picture.subTitle &&
                                <div className="item">
                                    <div className="label">SubTitle: </div>
                                    <div>{picture.subTitle}</div>
                                </div>
                                }

                                {!!picture.date &&
                                <div className="item">
                                    <div className="label">Date: </div>
                                    <div>{picture.date}</div>
                                </div>
                                }

                                {!!picture.medium &&
                                <div className="item">
                                    <div className="label">Medium: </div>
                                    <div>{picture.medium}</div>
                                </div>
                                }

                                {!!picture.dimensions &&
                                <div className="item">
                                    <div className="label">Dimensions: </div>
                                    <div>{picture.dimensions}</div>
                                </div>
                                }

                                <div className="separator"></div>

                                {!!picture.artiste &&
                                <div className="item">
                                    <div className="label">Artist: </div>
                                    <div>{picture.artiste}</div>
                                </div>
                                }

                                {!!picture.artisteBio &&
                                <div className="item">
                                    <div className="label">Bio: </div>
                                    <div>{picture.artisteBio}</div>
                                </div>
                                }

                                <div className="separator"></div>

                                {!!picture.classification &&
                                <div className="item">
                                    <div className="label">Classification: </div>
                                    <div>{picture.classification}</div>
                                </div>
                                }

                                {!!picture.credits &&
                                <div className="item">
                                    <div className="label">Credit: </div>
                                    <div>{picture.credits}</div>
                                </div>
                                }
                            </div>
                        </div>

                    </div>
                    }
                </Dialog>
            </div>
        );
    }
}
