import React from 'react';
import I18nProvider from './I18nProvider';
import startsWithLang from 'next-translate/_helpers/startsWithLang';
import getDefaultLang from 'next-translate/_helpers/getDefaultLang';

function getLang (ctx, config) {
    const { req, asPath } = ctx;
    if (req && req.query) {
        const { lang } = req.query;
        if (lang) return lang;
    }
    return startsWithLang(asPath, config?.allLanguages)
        ? asPath.split('/')[1]
        : config.defaultLanguage;
}

export default function appWithI18n (AppToTranslate, config = {}) {
    function AppWithTranslations (props) {
        const { lang, defaultLanguage } = props;
        const { defaultLangRedirect } = config;

        return (
            <I18nProvider
                lang={lang}
                internals={{
                    defaultLangRedirect,
                    defaultLanguage
                }}
            >
                <AppToTranslate {...props} />
            </I18nProvider>
        );
    }

    AppWithTranslations.getInitialProps = async ({ Component, ctx }) => {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        let defaultLanguage = ctx.req
            ? getDefaultLang(ctx.req, config)
            : __NEXT_DATA__.props.defaultLanguage;

        const lang = getLang(ctx, {
            ...config,
            defaultLanguage
        });

        return {
            config,
            lang,
            defaultLanguage,
            pageProps
        };
    };

    return AppWithTranslations;
}
