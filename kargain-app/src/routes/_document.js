import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import documentLang from '../components/Locales/documentLang'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../theme'
import config from '../config/config'

class MyDocument extends Document {
    render () {
        return (
            <Html lang={documentLang(this.props)}>
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta property="og:title" content="kargain"/>
                    <meta property="og:url" content="kargain.com"/>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"/>
                    <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${config.google.static.STATIC_API_KEY}&libraries=places`}/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}


// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    }
}

export default MyDocument
