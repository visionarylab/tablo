import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import './PictureWrapper.scss';
import { Spinner } from 'components/ui';

interface Props {
    src: string;
    alt?: string;
    className?: string;
    style?: CSSProperties;
    isLoading?: boolean;
    onImageLoad?: () => void;
    onImageError?: () => void;
    onClick?: () => void;
}

interface State {
    isLoading: boolean;
}

class PictureWrapper extends Component<Props, State> {
    img: HTMLImageElement | null = null;
    static defaultProps = {
        src: '',
        alt: '',
        className: '',
        style: {},
        onImageLoad: () => {},
        onImageError: () => {},
        onClick: () => {},
    };

    state = {
        isLoading: true,
    };

    constructor(props: Props) {
        super(props);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onImageError = this.onImageError.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.src !== this.props.src) {
            this.setState({ isLoading: true });
        }
    }

    onImageLoad(event: any) {
        this.setState({ isLoading: false });
        if (this.props.onImageLoad) {
            this.props.onImageLoad();
        }
    }

    onImageError(event: any) {
        this.setState({ isLoading: false });
        if (this.props.onImageError) {
            this.props.onImageError();
        }
    }

    render() {
        let { src, alt, className, style, onClick } = this.props;
        let { isLoading } = this.state;
        const imageClass = classNames('picture-el', className, {
            'is-loaded': !isLoading
        })
        return (
            <>
            {isLoading &&
            <div className="picture-loader">
                <Spinner />
            </div>
            }
            <img className={imageClass}
                style= {style}
                src={src}
                alt={alt}
                ref={(el) => this.img = el}
                onLoad={this.onImageLoad}
                onError={this.onImageError}
                onClick={onClick}
            />
            </>
        );
    }
}

export default PictureWrapper;
