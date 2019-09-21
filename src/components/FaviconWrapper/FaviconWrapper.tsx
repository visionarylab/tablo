import React, { Component, HTMLAttributes, CSSProperties } from 'react';
import Spinner from 'components/Spinner/Spinner';
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
    useFallback: boolean;
}

class FaviconWrapper extends Component<Props & HTMLAttributes<HTMLDivElement>, State> {

    static defaultProps = {
        url: '',
    };

    state = {
        faviconUrl: '',
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
    }

    onImageError(event: any) {
        this.setState({ useFallback: true });
    }

    render() {
        let { className } = this.props;
        let { faviconUrl, useFallback } = this.state;

        const faviconClass = classNames('favicon-wrapper', className)
        return (
            <div className={faviconClass}>
                {useFallback
                    ? <Icon className="favicon-icon" path={mdiWeb} size="20px" />
                    : <img className="favicon-img"
                        src={faviconUrl}
                        onLoad={this.onImageLoad}
                        onError={this.onImageError}
                    />
                }
            </div>
        );
    }
}

export default FaviconWrapper;
