import React, { Component } from 'react';
import classNames from 'classnames';
import { Picture } from 'store/picture';
import './PictureCartel.scss';
import Icon from '@mdi/react';
import { mdiOpenInNew, mdiDownload } from '@mdi/js';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';

interface Props {
    pictures: Picture[];
    currentPictureIndex: number;
}

interface State {
    currentPicture: Picture | null;
    currentPictureData: any[];
}

class PictureCartel extends Component<Props, State> {

    static defaultProps = {
        pictures: [],
        currentPictureIndex: 0,
    };

    constructor(props: any) {
        super(props);

        this.state = {
            currentPicture: null,
            currentPictureData: [],
        };

        this.downloadImage = this.downloadImage.bind(this);
        this.openImageWebsite = this.openImageWebsite.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        const currentPicture = nextProps.pictures[nextProps.currentPictureIndex];
        const currentPictureData = this.parsePicture(currentPicture);
        if (currentPicture && currentPictureData) {
            this.setState({ currentPicture, currentPictureData });
        }

    }

    parsePicture(picture: Picture) {
        const pictureData: any = [];

        if (!picture) {
            return pictureData;
        }

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
        const { currentPicture } = this.state
        if (currentPicture) {
            const link = document.createElement('a');
            link.href = currentPicture.medias.max;
            link.download = currentPicture.title + '.jpg';
            link.rel = 'noopener noreferrer';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        evt.stopPropagation();
    }

    openImageWebsite(evt: any) {
        const { currentPicture } = this.state
        if (currentPicture) {
            window.open(currentPicture.medias.page, '_blank')
        }
        evt.stopPropagation();
    }

    render() {
        const { currentPicture, currentPictureData } = this.state;

        if (!currentPicture) {
            return (null);
        }
        return (
            <div className="cartel-wrapper">

                <div className="cartel-header">
                    <div className="cartel-header-controls">
                        <button className="cartel-header-btn"
                            onClick={this.openImageWebsite}>
                            <Icon path={mdiOpenInNew} size={1} color={'white'} />
                            <span>Visit {currentPicture.from} page</span>
                        </button>

                        <button className="cartel-header-btn"
                            onClick={this.downloadImage}>
                            <Icon path={mdiDownload} size={1} color={'white'} />
                            <span>Download</span>
                        </button>
                    </div>
                </div>

                { currentPictureData.map((item: any, i: number) => {
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

const mapStateToProps = (rootState: RootState) => {
    return ({
        currentPictureIndex: rootState.pictureState.currentPictureIndex,
        pictures: rootState.pictureState.pictures,
    })
};

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureCartel);

