import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiWeb } from '@mdi/js';
import BrowserApi from 'api/BrowserApi';
import './FaviconWrapper.scss';

interface Props {
    url: string;
}

interface State {
    faviconUrl: string;
    isLoading: boolean;
    useFallback: boolean;
}

class FaviconWrapper extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps = {
        url: '',
    };

    state = {
        faviconUrl: '',
        isLoading: true,
        useFallback: false
    };

    constructor(props: Props) {
        super(props);
        this.onImageLoad = this.onImageLoad.bind(this);
        this.onImageError = this.onImageError.bind(this);
    }

    componentWillMount() {
        const { url } = this.props;
        const faviconUrl = BrowserApi.getFaviconUrl(url);
        this.setState({ faviconUrl });
    }

    onImageLoad(event: any) {
        this.setState({ isLoading: false })
    }

    onImageError(event: any) {
        this.setState({ useFallback: true });
    }

    render() {
        let { className, style } = this.props;
        let { faviconUrl, isLoading, useFallback } = this.state;

        const faviconClass = classNames('favicon-wrapper', className, {
            'is-loading': isLoading
        })
        return (
            <div className={faviconClass} style={style}>
                {!useFallback &&
                    <img className="favicon-img"
                        src={faviconUrl}
                        onLoad={this.onImageLoad}
                        onError={this.onImageError}
                    />
                }

                {useFallback &&
                    <Icon className="favicon-icon" path={mdiWeb} size="var(--iconSize)" color="var(--color)" />
                }
            </div>
        );
    }
}

export default FaviconWrapper;
