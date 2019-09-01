import React, { Component } from 'react';
import classNames from 'classnames';
import { Picture } from 'store/picture';
import './PictureCartel.scss';
import Icon from '@mdi/react';
import { mdiOpenInNew, mdiDownload } from '@mdi/js';

interface Props {
    picture: Picture;
}

export class PictureCartel extends Component<Props> {

    constructor(props: any) {
        super(props);

        this.downloadImage = this.downloadImage.bind(this);
        this.openImageWebsite = this.openImageWebsite.bind(this);
    }

    parsePicture(picture: Picture) {
        const pictureData: any = [];

        if (picture.artiste) {
            pictureData.push({ label: 'Artist', data: picture.artiste });
        }

        if (picture.title) {
            pictureData.push({ label: 'Title', data: picture.title });
        }

        if (picture.subTitle) {
            pictureData.push({ label: 'SubTitle', data: picture.subTitle });
        }

        if (picture.date) {
            pictureData.push({ label: 'Date', data: picture.date });
        }

        if (picture.medium) {
            pictureData.push({ label: 'Medium', data: picture.medium });
        }

        if (picture.dimensions) {
            pictureData.push({ label: 'Dimensions', data: picture.dimensions });
        }

        if (picture.artisteBio) {
            pictureData.push({ label: 'Bio', data: picture.artisteBio });
        }

        if (picture.classification) {
            pictureData.push({ label: 'Classification', data: picture.classification });
        }

        if (picture.credits) {
            pictureData.push({ label: 'Credit', data: picture.credits });
        }

        return pictureData;
    }

    downloadImage(evt: any) {
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
        evt.stopPropagation();
    }

    openImageWebsite(evt: any) {
        if (this.props.picture) {
            window.open(this.props.picture.medias.page, '_blank')
        }
        evt.stopPropagation();
    }

    render() {
        let { picture } = this.props;

        const pictureData = this.parsePicture(picture);

        return (
            <div className="cartel-wrapper">

                <div className="cartel-header">
                    <div className="cartel-header-controls">
                        <button className="cartel-header-btn"
                            onClick={this.openImageWebsite}>
                            <Icon path={mdiOpenInNew} size={1} color={'white'} />
                            <span>Visit {picture.from} page</span>
                        </button>

                        <button className="cartel-header-btn"
                            onClick={this.downloadImage}>
                            <Icon path={mdiDownload} size={1} color={'white'} />
                            <span>Download</span>
                        </button>
                    </div>
                </div>

                {pictureData.map((item: any, i: number) => {
                    const itemClassNames = classNames('item', {
                        'even': (i % 2 === 0),
                        'odd': (i % 2 !== 0),
                    });

                    return (
                        <div className={itemClassNames} key={i}>
                            <div className="label">{item.label}</div>
                            <div>{item.data}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}



