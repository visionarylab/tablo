import React, { Component } from 'react';
import { Picture } from 'types/picture';
import './Cartel.scss';

interface CartelProps {
  picture: Picture;
}

const wrapperStyles = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
};

const headerStyles = {
    display: 'flex',
    flexWrap: 'wrap'
};

const cartelBtnStyles = {
    color: 'black',
    textDecoration: 'none',
    border: '2px solid',
    borderRadius: '8px',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    marginBottom: '10px',
};

const spanStyles = {
    whiteSpace: 'nowrap'
};

const scrollContainerStyle = {
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    marginTop: '10px'
};

const itemStyles = {
    fontSize: '1.2em',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginLeft: '3px',
    marginBottom: '30px',
};

const labelStyles = {
    width: '125px',
    minWidth: '125px',
    color: '#888',
    marginBottom: '10px',
    fontSize: '1em',
}

export class Cartel extends Component<CartelProps> {
    render() {
      let { picture } = this.props;

      return (
        <div className="cartel-wrapper" style={wrapperStyles as any}>

            { !!picture &&
            <div className="header" style={headerStyles as any}>
                <a className="cartel-btn"
                    href={picture.medias.max}
                    target="_blank"
                    download={picture.title + '.jpg'}
                    rel="noopener noreferrer"
                    style={cartelBtnStyles}>
                    <i className="pi pi-download" ></i>
                    <span style={spanStyles as any}>Download</span>
                </a>

                <a className="cartel-btn"
                    href={picture.medias.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={cartelBtnStyles}>
                    <i className="pi pi-external-link" ></i>
                    <span style={spanStyles as any}>Visit {picture.from} page</span>
                </a>
            </div>
            }

            { !!picture &&
            <div className="scroll-container" style={scrollContainerStyle as any}>
                { !!picture.title &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Title: </div>
                    <div>{ picture.title }</div>
                </div>
                }

                { !!picture.subTitle &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>SubTitle: </div>
                    <div>{ picture.subTitle }</div>
                </div>
                }

                { !!picture.date &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Date: </div>
                    <div>{ picture.date }</div>
                </div>
                }

                { !!picture.medium &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Medium: </div>
                    <div>{ picture.medium }</div>
                </div>
                }

                { !!picture.dimensions &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Dimensions: </div>
                    <div>{ picture.dimensions }</div>
                </div>
                }

                <div className="separator"></div>

                { !!picture.artiste &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Artist: </div>
                    <div>{ picture.artiste }</div>
                </div>
                }

                { !!picture.artisteBio &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Bio: </div>
                    <div>{ picture.artisteBio }</div>
                </div>
                }

                <div className="separator"></div>

                { !!picture.classification &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Classification: </div>
                    <div>{ picture.classification }</div>
                </div>
                }

                { !!picture.credits &&
                <div className="item" style={itemStyles as any}>
                    <div className="label" style={labelStyles}>Credit: </div>
                    <div>{ picture.credits }</div>
                </div>
                }
            </div>
            }

        </div>
      );
    }
}
