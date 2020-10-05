import configFile from '../../../i18n.json'

export default function documentLang ({ __NEXT_DATA__ }, config) {
    if (!config) {
        config = configFile
    }

    const { page } = __NEXT_DATA__
    const [, langQuery] = page.split('/')
    const lang = config.allLanguages.find((l) => l === langQuery)
    return lang || config.defaultLanguage
}
