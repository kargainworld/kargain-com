import React from 'react'
import clsx from 'clsx'
import Link from 'next-translate/Link'

const CTALink = ({ href, icon: Icon, title, id, className }) => {
    return (
        <Link href={href} prefetch={false} passHref>
            <a id={id} className={
                clsx(className,
                    'btn btn-outline-primary',
                    'm-1'
                )
            }>
                {Icon && (
                    <span className="mx-2">
                        <Icon/>
                    </span>)}
                {title}
            </a>
        </Link>
    )
}

CTALink.defaultProps = {
    href: '/'
}
export default CTALink
