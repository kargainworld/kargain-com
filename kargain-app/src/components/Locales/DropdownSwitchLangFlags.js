import React, { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next-translate/Link'
import i18nConfig from '../../../i18n.json'
import useTranslation from 'next-translate/useTranslation'
import startsWithLang from 'next-translate/_helpers/startsWithLang'

const DropdownSwitchLangFlags = () => {
    const router = useRouter()
    const { allLanguages, allLanguagesLabel } = i18nConfig
    const { lang } = useTranslation()
    const [open, setOpen] = useState(false)
    const replaceLang = href => startsWithLang(href, allLanguages)
        ? href.split('/').filter(part => part !== lang).join('/') || '/'
        : href

    return (
        <div className="navbar-dropdown mx-2">
            <ul className={clsx('dropdown-reverse', open && 'show')}
                style={{ minWidth: 'unset' }}>
                {allLanguages && allLanguages.map((lng, index) => {
                    if (lng === lang) return null
                    return (
                        <li key={index} className="px-0 dropdown-item">
                            <Link
                                href={replaceLang(router.asPath)}
                                prefetch={false}
                                lang={lng}>
                                <a className="nav-link text-left">
                                    <div className="dropdown-toggler" onClick={() => setOpen(open => !open)}>
                                        <img className="rounded-circle"
                                            width="30"
                                            height="30"
                                            src={`/images/flags/${lng}.svg`}
                                            alt={lng}
                                        />
                                        <span> {allLanguagesLabel[lng]} </span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <img className="rounded-circle"
                width="30"
                height="30"
                src={`/images/flags/${lang}.svg`}
                alt={lang}
                onClick={() => setOpen(open => !open)}
            />

            <span
                className="dropdown-toggler"
                onClick={() => setOpen(open => !open)}
                style={{ width: '30px' }}>
                <i className={clsx('ml-2', 'arrow_nav', open ? 'is-top' : 'is-bottom')}/>
            </span>
        </div>
    )
}

export default DropdownSwitchLangFlags
