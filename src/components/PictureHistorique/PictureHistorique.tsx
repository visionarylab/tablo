import React, { Component } from 'react';
import classNames from 'classnames';
import { Picture } from 'store/picture';
import './PictureHistorique.scss';

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
                        <img
                            className={className}
                            key={i}
                            src={pict.medias.mini}
                            alt=""
                            onClick={() => onSelectPicture(pict, i)}/>
                    )
                })}
            </div>
        );
    }
}
