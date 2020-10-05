import React, { useContext, useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import withGA from 'next-ga'
import PropTypes from 'prop-types'
import DynamicNamespaces from 'next-translate/DynamicNamespaces'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { SearchContext, SearchContextProvider } from '../context/SearchContext'
import { ModalContext, ModalContextProvider } from '../context/ModalContext'
import { MessageContextProvider } from '../context/MessageContext'
import { AuthProvider, useAuth } from '../context/AuthProvider'
import { FormContextProvider } from '../context/FormContext'
import ModalSearchResults from '../components/Search/ModalSearchResults'
import AdminLayout from '../components/Admin/Layout/AdminLayout'
import appWithI18n from '../components/Locales/appWithI18n'
import ModalMessaging from '../components/ModalMessaging'
import ModalFollowers from '../components/ModalFollowers'
import NextProgress from '../components/NextProgress'
import PopupAlert from '../components/PopupAlert'
import PopupLogin from '../components/PopupLogin'
import ModalShare from '../components/ModalShare'
import Layout from '../components/Layout'
import Forbidden403Page from './403'
import theme from '../theme'
import '../scss/theme.scss'
import i18nConfig from '../../i18n.json'
import SEO from '../../next-seo.config'

const MyApp = ({ Component, pageProps }) => {
    const { formKey } = pageProps

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <MessageContextProvider>
                    <AuthProvider>
                        <FormContextProvider formKey={formKey}>
                            <SearchContextProvider>
                                <ModalContextProvider>
                                    <NextProgress/>
                                    <DefaultSeo {...SEO} />
                                    <ProtectedRouter pageProps={pageProps}>
                                        <Component {...pageProps}/>
                                    </ProtectedRouter>
                                </ModalContextProvider>
                            </SearchContextProvider>
                        </FormContextProvider>
                    </AuthProvider>
                </MessageContextProvider>
            </ThemeProvider>
        </>
    )
}

const ProtectedRouter = ({ children, pageProps }) => {
    const router = useRouter()
    const { requiredAuth } = pageProps
    const isAdminRoute = router.route.split('/').includes('admin')
    const { isAuthReady, forceLoginModal, isAuthenticated, isAuthenticatedUserAdmin } = useAuth()
    const showLoginModal = (requiredAuth && !isAuthenticated) || forceLoginModal
    const { searchStateContext } = useContext(SearchContext)
    const { modalStateContext } = useContext(ModalContext)

    if (isAdminRoute) {
        if (isAuthReady) {
            if (!isAuthenticatedUserAdmin) {
                return <Forbidden403Page/>
            }
        }

        return (
            <AdminLayout>
                <PopupAlert/>
                {children}
            </AdminLayout>
        )
    }

    return (
        <DynamicNamespaces
            dynamic={(lang, ns) => import(`../locales/${lang}/${ns}.json`).then((m) => m.default)}
            namespaces={[
                'layout',
                'messages_api',
                'form_validations'
            ]}
        >
            {(isAuthReady && showLoginModal) && <PopupLogin/>}
            {searchStateContext?.openModalSearch && <ModalSearchResults/>}
            {modalStateContext.openModalMessaging && <ModalMessaging/>}
            {modalStateContext.openModalFollowers && <ModalFollowers/>}
            {modalStateContext.openModalShare && <ModalShare/>}

            <Layout>
                <PopupAlert/>
                {children}
            </Layout>
        </DynamicNamespaces>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired
}

export default withGA('UA-229369587', Router)(appWithI18n(MyApp, i18nConfig))
