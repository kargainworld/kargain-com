import React from 'react';
import Link from 'next-translate/Link';

const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => {
    return (
        <Link href={href} as={hrefAs} prefetch={prefetch}>
            <a className={className}>
                {children}
            </a>
        </Link>
    );
};

ButtonLink.defaultProps = {
    href : ''
}

export default ButtonLink;
