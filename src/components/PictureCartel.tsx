import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiOpenInNew, mdiDownload } from '@mdi/js';
import { RootState } from 'store/rootReducer';
import { connect } from 'react-redux';
import { Picture } from 'store/picture/picture';
import { FlexContainer, Text, CartelButton, CartelRow } from 'components/ui';

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
            <FlexContainer direction="column">

                <FlexContainer direction="column" height="auto" padding="5px">
                    <CartelButton onClick={this.openImageWebsite}>
                        <Icon path={mdiOpenInNew} size="var(--iconSizeBtn)" color="var(--color)" />
                        <Text fontSize="1.2">Visit {currentPicture.from} page</Text>
                    </CartelButton>

                    <CartelButton onClick={this.downloadImage}>
                        <Icon path={mdiDownload} size="var(--iconSizeBtn)" color="var(--color)" />
                        <Text fontSize="1.2">Download</Text>
                    </CartelButton>
                </FlexContainer>

                { currentPictureData.map((item: any, i: number) => {
                    const itemClassNames = classNames('item', {
                        'even': (i % 2 === 0),
                        'odd': (i % 2 !== 0),
                    });

                    return (
                        <CartelRow className={itemClassNames} key={i}>
                            <Text width="125px">{item.label}</Text>
                            <Text>{item.data}</Text>
                        </CartelRow>
                    );
                })}
            </FlexContainer>
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

