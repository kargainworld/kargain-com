import ReactGA from 'react-ga'

export const initGA = () => {
    ReactGA.initialize('UA-xxxxxxxxx-1')
    // console.log('GA init');
}

export const logPageView = () => {
    // console.log(`Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname + window.location.search })
}

export const logEvent = (category = '', action = '') => {
    if (category && action) {
        ReactGA.event({ category, action })
    }
}

export const logException = (description = '', fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal })
    }
}
