import React, { Component } from 'react';
import { Picture } from 'store/picture';

import './Cartel.scss';
import { Button } from 'components/Buttons/Button';
import Icon from '@mdi/react';
import { mdiOpenInNew, mdiDownload, mdiClose } from '@mdi/js';

interface Props {
  picture: Picture;
  hideDetails: () => any;
}


export class Cartel extends Component<Props> {

    constructor(props: any) {
        super(props);

        this.downloadImage = this.downloadImage.bind(this);
        this.openImageWebsite = this.openImageWebsite.bind(this);
    }

    downloadImage() {
        if (this.props.picture) {
            const link = document.createElement('a');
            link.href = this.props.picture.medias.max;
            link.download = this.props.picture.title + '.jpg';
            link.rel = 'noopener noreferrer';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    openImageWebsite() {
        if (this.props.picture) {
            window.open(this.props.picture.medias.page, '_blank')
        }
    }

    render() {
      let { picture, hideDetails } = this.props;

      return (
        <div className="cartel-wrapper">
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
                    onClick={hideDetails}>
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
      );
    }
}
