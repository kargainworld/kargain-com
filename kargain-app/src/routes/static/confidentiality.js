import React from 'react'
import { Container } from 'reactstrap'
import ContentfulHOC from '../../components/ContenFulHOC'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const About = (props) => {
    const { richTextDocument, options } = props
    const article = documentToReactComponents(richTextDocument, options)

    return (
        <Container>
            <div className="article-wrapper">
                <div className="rich-text-content">
                    {article}
                </div>
            </div>
        </Container>
    )
}

let entriesId = {
    'fr': '47qNLFtLBRbf7lXLfzx5HW',
    'en': '4q5dCE8pJTM3v7s1jh9Rgw'
}

export default ContentfulHOC(About, entriesId)
