import React from 'react'
import { Container } from 'reactstrap'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ContentfulHOC from '../../components/ContenFulHOC'

const Conditions = (props) => {
    const { richTextDocument, options } = props
    const article = documentToReactComponents(richTextDocument, options)

    return (
        <Container>
            {article && (
                <div className="article-wrapper">
                    <div className="rich-text-content">
                        {article}
                    </div>
                </div>
            )}
        </Container>
    )
}

let entriesId = {
    'fr': '5O7NarDgWBWe0sWa641xI6',
    'en': '1f9HlAskOhDuoXEvtID3gU'
}

export default ContentfulHOC(Conditions, entriesId)

