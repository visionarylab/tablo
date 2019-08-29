import React, { Component, CSSProperties } from 'react';
import { Spinner } from 'components/Spinner/Spinner';

interface Props {
    src: string;
    alt?: string;
    className?: string;
    style?: CSSProperties;
    onImageLoad?: () => void;
    onClick?: () => void;
}

interface State {
    isLoading: boolean;
}

export class PictureWrapper extends Component<Props, State> {
    img: HTMLImageElement | null = null;
    static defaultProps = {
        src: '',
        alt: '',
        className: '',
        style: {},
        onImageLoad: () => {},
        onImaonClickgeLoad: () => {},
    };

    state = {
        isLoading: true,
    };

    constructor(props: Props) {
        super(props);
        this.onImageLoad = this.onImageLoad.bind(this);
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

    render() {
        let { src, alt, className, style, onClick } = this.props;
        let { isLoading } = this.state;

        return (
            <>
            {isLoading &&
            <div className="picture-loader">
                <Spinner />
            </div>
            }
            <img className={className}
                style= {style}
                src={src}
                alt={alt}
                ref={(el) => this.img = el}
                onLoad={this.onImageLoad}
                onClick={onClick}
            />
            </>
        );
    }
}
