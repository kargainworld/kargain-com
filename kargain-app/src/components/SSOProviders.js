import React, {  useContext, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import GoogleLogin from 'react-google-login'
import useTranslation from 'next-translate/useTranslation'
import { MessageContext } from '../context/MessageContext'
import AuthService from '../services/AuthService'
import Loading from './Loading'
import config from '../config/config'

const SSOProviders = ({ col }) => {
    const router = useRouter()
    const { redirect } = router.query
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const { dispatchModalError } = useContext(MessageContext)

    const startAuth = async (provider, data) => {
        setIsLoading(true)
        AuthService.SSOAuthLogin(provider, data)
            .then(user => {
                setIsLoading(false)
                if (redirect) {
                    router.push(redirect)
                } else {
                    router.push(`/auth/callback?redirect=/profile/${user?.username}`)
                }
            }).catch(err => {
                setIsLoading(false)
                dispatchModalError({ err })
                if (redirect) router.push(redirect)
            })
    }

    const responseGoogle = (response) => {
        const { accessToken, profileObj } = response
        const { googleId, email, familyName, givenName, imageUrl } = profileObj

        startAuth('google', {
            email,
            firstname: givenName,
            lastname: familyName,
            avatarUrl: imageUrl,
            googleProvider: {
                id: googleId,
                token: accessToken
            }
        })
    }

    const badResponseGoogle = (response) => {
        console.log(response)
    }

    // const responseFacebook = (response) => {
    //     const { accessToken, id, email, first_name, last_name, picture } = response
    //     startAuth('facebook', {
    //         email,
    //         firstname: first_name,
    //         lastname: last_name,
    //         avatarUrl: picture?.data?.url,
    //         facebookProvider: {
    //             id: id,
    //             token: accessToken
    //         }
    //     })
    // }

    return (
        <div className={clsx('sso d-flex', col && 'flex-column', 'justify-content-center mx-auto my-2')}>
            {isLoading && <Loading fullscreen/>}

            <GoogleLogin
                clientId={config.google.sso.CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={badResponseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <button className="register-g" onClick={renderProps.onClick}>
                        <img src="/images/fb.png" alt=""/>
                        {t('layout:login-google')}
                    </button>
                )}
            />

            {/*    <FacebookLogin*/}
            {/*        appId={config.facebook.sso.APP_ID}*/}
            {/*        fields="last_name,first_name,name,email,picture"*/}
            {/*        scope={'public_profile,email'}*/}
            {/*        callback={responseFacebook}*/}
            {/*        render={renderProps => (*/}
            {/*            <button className="register-fb" onClick={renderProps.onClick}>*/}
            {/*                <img src="/images/fb.png" alt=""/>*/}
            {/*                {t('layout:login-facebook')}*/}
            {/*            </button>*/}
            {/*        )}*/}
            {/*    />*/}
        </div>
    )
}

SSOProviders.propTypes = {
    col: PropTypes.bool
}

export default SSOProviders
