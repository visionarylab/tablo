import React, { Component } from 'react';
import classNames from 'classnames';
import { Picture } from 'store/picture';
import './PictureHistorique.scss';
import { PictureWrapper } from 'components/PictureWrapper/PictureWrapper';

interface Props {
    pictures: Picture[];
    selectedPictureIndex: number;
    onSelectPicture: (picture: Picture, i: number) => void
}

export class PictureHistorique extends Component<Props> {
    render() {
        let { pictures, selectedPictureIndex, onSelectPicture } = this.props;
        return (
            <div className="historique-wrapper">
                {pictures.map((pict: any, i: number) => {

                    const className = classNames({
                        'selected': i === selectedPictureIndex
                    });
                    return (
                        <PictureWrapper
                            key={i}
                            className={className}
                            src={pict.medias.mini}
                            alt={pict.medias.mini}
                            onClick={() => onSelectPicture(pict, i)}
                        />
                    )
                })}
            </div>
        );
    }
}
