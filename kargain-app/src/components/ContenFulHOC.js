import React, { Component } from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import config from '../config/config'

const contentfulOptions = {
    space: config.contentful.CONTENTFUL_SPACE_ID,
    accessToken: config.contentful.CONTENTFUL_ACCESS_TOKEN
}

const options = {
    renderNode: {
        // eslint-disable-next-line react/display-name
        [MARKS.BOLD]: (node, children) => (
            <span className="bold-title">{children}</span>
        ),
        // eslint-disable-next-line react/display-name
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p>{children}</p>
        )
    }
}

export default function ContentfulHOC (WrappedComponent, entriesID) {
    return class ContentFulFunction extends Component {
        static async getInitialProps (ctx) {
            const { lang } = ctx
            const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)
            try {
                const client = require('contentful').createClient(contentfulOptions)
                const entry = await client.getEntry(entriesID[lang])
                const richTextDocument = entry.fields.content
                const HOCProps = {
                    options,
                    lang,
                    entry: entriesID[lang],
                    richTextDocument
                }

                return {
                    ...HOCProps,
                    ...pageProps,
                    entriesID,
                    lang
                }

            } catch (err) {
                return {
                    err,
                    ...pageProps,
                    lang
                }
            }
        }

        render () {
            return <WrappedComponent {...this.props} />
        }
    }
}
