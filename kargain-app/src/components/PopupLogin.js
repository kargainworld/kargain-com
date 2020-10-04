import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import Link from 'next-translate/Link'
import { useRouter } from 'next/router'
import { Col, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TrackChangesIcon from '@material-ui/icons/TrackChanges'
import Typography from '@material-ui/core/Typography'
import ExploreIcon from '@material-ui/icons/Explore'
import ForumIcon from '@material-ui/icons/Forum'
import CloseIcon from '@material-ui/icons/Close'
import useTranslation from 'next-translate/useTranslation'
import AuthService from '../services/AuthService'
import { useAuth } from '../context/AuthProvider'
import { MessageContext } from '../context/MessageContext'
import CheckBoxInput from './Form/Inputs/CheckBoxInput'
import EmailInput from './Form/Inputs/EmailInput'
import PasswordInput from './Form/Inputs/PasswordInput'
import SSOProviders from './SSOProviders'
import { themeColors } from '../theme/palette'
import Divider from './Divider'
import CTALink from './CTALink'
import CTAButton from './CTAButton'
import userModel from '../models/user.model'

const formConfig = {
    mode: 'onChange',
    reValidateMode: 'onChange',
    validateCriteriaMode: 'all'
}

const useStyles = makeStyles(() => ({

    popupOverlay: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0,0.5)',
        display: 'flex',
        zIndex: 999
    },

    popupContent: {
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        width: '800px',
        height: '90vh',
        margin: 'auto',
        zIndex: 5
    },

    wrapperLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        borderRadius: '10px',
        color: themeColors.white,
        transition: 'all .5s',
        backgroundColor: '#3D4348'
    },

    contentLeft: {
        display: 'flex',
        flexDirection: 'column'
    },

    wrapperForm: {
        borderRadius: '10px',
        backgroundColor: '#fff',
        maxWidth: '300px',
        height: '100%',
        padding: '0 1rem 1rem',
        margin: 'auto',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        transition: 'all .5s'
    }
}))

const PopupLogin = () => {
    const theme = useTheme()
    const classes = useStyles()
    const router = useRouter()
    const { t } = useTranslation()
    const { isAuthenticated, avoidCloseLoginModal } = useAuth()
    const { control, errors, handleSubmit } = useForm(formConfig)
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const [openLoginModal, toggleLoginModal] = useState(!isAuthenticated)
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true
    })

    const onSubmit = (form) => {
        const { email, password } = form
        AuthService.login({
            email,
            password
        })
            .then(user => {
                const User = new userModel(user)
                const msg = `Welcome back ${User.getFullName}`
                router.reload()
                toggleLoginModal(false)
                dispatchModal({ msg })
            }).catch(err => {
                dispatchModalError({ err })
                toggleLoginModal(false)
            })
    }

    if (!openLoginModal && !avoidCloseLoginModal){
        return null
    }

    return (
        <div className={classes.popupOverlay}>
            <Row className={classes.popupContent}>
                {isDesktop && (
                    <Col sm={12} md={6}>
                        <div className={classes.wrapperLeft}>
                            <Left/>
                        </div>
                    </Col>
                )}
            
                <Col sm={12} md={isDesktop ? 6 : 12}>
                    <div className={classes.wrapperForm}>
                        {!avoidCloseLoginModal && (
                            <div className="d-flex justify-content-end">
                                <button type="button" onClick={() => toggleLoginModal(false)}>
                                    <CloseIcon/>
                                </button>
                            </div>
                        )}
                        
                        <div className="d-flex flex-column">
                            <SSOProviders col/>
                        </div>
                        <Divider className="m-3"/>
                        <div className="auth_form m-auto">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-2 form-group">
                                    <EmailInput
                                        name="email"
                                        placeholder="email"
                                        errors={errors}
                                        control={control}
                                        rules={{ required: t('form_validations:field-is-required') }}
                                    />
                                </div>
            
                                <div className="mt-2 form-group">
                                    <PasswordInput
                                        name="password"
                                        placeholder="Mot de passe"
                                        errors={errors}
                                        control={control}
                                        rules={{ required: t('form_validations:field-is-required') }}
                                    />
                                </div>
            
                                <div className="mt-2 form-group">
                                    <CheckBoxInput
                                        name="confirm"
                                        label={t('layout:remember-me')}
                                        errors={errors}
                                        control={control}
                                    />
            
                                </div>
            
                                <div className="submit">
                                    <CTAButton
                                        title={t('layout:login')}
                                        submit
                                        className="width-100"
                                    />
                                </div>
                            </form>
            
                            <div className="d-block text-center">
                                <Link href="/auth/reset-password">
                                    <a>{t('layout:password-forgotten')}</a>
                                </Link>
                            </div>
                            <Divider className="m-3"/>
                            <CTALink
                                className="submit"
                                title={t('layout:register')}
                                href="/auth/register"
                            />
                            <CTALink
                                className="submit"
                                title={t('layout:register-pro')}
                                href="/auth/register-pro"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const Left = () => {
    const classes = useStyles()
    return (
        <>
            <div style={{ flex: 1 }}>
                <div className="over-header m-b-lg">
                    <img className="img-fluid" width={300} src="/images/kargain-logo-white.png" alt="kargain"/>
                </div>
            </div>
            <div className={clsx(classes.contentleft, 'm-3')} style={{ flex: 3 }}>
                <div className="p-2">
                    <TrackChangesIcon fontSize="large"/>
                    <Typography component="h4" variant="h3" className="text-white">
                        Petites annonces automobiles
                    </Typography>
                </div>

                <div className="p-2">
                    <ExploreIcon fontSize="large"/>
                    <Typography component="h4" variant="h3" className="text-white">
                        Trouvez, vendez des véhicules prés de chez vous
                    </Typography>
                </div>

                <div className="p-2">
                    <ForumIcon fontSize="large"/>
                    <Typography component="h4" variant="h3" className="text-white">
                        Publiez et partagez du contenu avec la communauté
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default PopupLogin
