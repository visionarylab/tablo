import React, { Component } from 'react';

interface Props {
    locale: any;
    hour12: boolean;
    format: string;
}

interface State {
    time: string;
}

class Clock extends Component<Props, State> {

    runner: NodeJS.Timeout | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            'time': this.getCurrentTime()
        }
    }

    getCurrentTime = () => {
        const locale = this.props.locale ? this.props.locale : [];

        const hour12 = (this.props.hour12 == false) ? false : true;

        let hour,
            minute,
            second;

        if (this.props.format) {
            switch (this.props.format.toLowerCase()) {
                case 'hh':
                    hour = '2-digit';
                    break;
                case 'hh-mm':
                    hour = '2-digit';
                    minute = '2-digit';
                    break;
                case 'hh-mm-ss':
                    hour = '2-digit';
                    minute = '2-digit';
                    second = '2-digit';
                    break;
                default:
                    hour = '2-digit';
                    minute = '2-digit';
                    second = '2-digit';
            }
        }

        let time = new Date().toLocaleTimeString(locale, {
            'hour12': hour12,
            'hour': hour,
            'minute': minute,
            'second': second
        });

        return time;
    }

    componentDidMount() {
        this.runner = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.runner) {
            clearInterval(this.runner);
        }
    }
    render() {

        const clockTile = {
            color: 'white',
            textAlign: 'center'
        } as any;

        const clockSpan = {
            padding: '4px'
        }

        return (
            <div style={clockTile}>
                <span style={clockSpan}>{this.state.time}</span>
            </div>
        );
    }
}
export default Clock;