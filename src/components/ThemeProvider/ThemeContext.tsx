import React from 'react'
import themes from './themes';


const defaultState = {
    dark: false,
    toggleDark: () => { },
}

const ThemeContext = React.createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
    (window.matchMedia("(prefers-color-scheme: dark)").matches === true);


class ThemeProvider extends React.Component {
    state = {
        dark: false,
    }

    toggleDark = () => {
        let dark = !this.state.dark;
        localStorage.setItem('dark', JSON.stringify(dark));
        this.setTheme(dark);
    }

    componentDidMount() {
        // Getting dark mode value from localStorage!

        try {

            const isDark = JSON.parse(localStorage.getItem('dark') || 'true');
            if (isDark) {
                this.setTheme(isDark);
            } else if (supportsDarkMode()) {
                this.setTheme(true);
            } else {
                this.setTheme(false);
            }
        } catch (error) {

        }
    }

    setTheme(dark: boolean) {
        this.setState({ dark });

        const currentTheme = themes[dark ? 'dark' : 'light'];

        Object.keys(currentTheme).map((key: string) => {
            const cssKey = `--${key}`;
            const cssValue = currentTheme[key];

            document.body.style.setProperty(cssKey, cssValue);
        });

       /*
       const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", currentTheme.secondary);
        }
        */
    }

    render() {
        const { children } = this.props
        const { dark } = this.state

        const themeProps = {
            dark,
            toggleDark: this.toggleDark,
        };
        return (
            <ThemeContext.Provider value={themeProps}>
                {children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContext;

export { ThemeProvider };
