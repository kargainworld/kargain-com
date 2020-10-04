import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { Col, Row, Container } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import AuthService from '../../services/AuthService'
import FieldWrapper from '../../components/Form/FieldWrapper'
import EmailInput from '../../components/Form/Inputs/EmailInput'
import { MessageContext } from '../../context/MessageContext'
import Loading from '../../components/Loading'
import CTALink from '../../components/CTALink'

const ConfirmAccount = () => {
    const router = useRouter()
    const { token } = router.query
    const { t } = useTranslation()
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const [activated, setActivated] = useState(false)
    const { control, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all'
    })

    const onSubmitAskForActivation = (form) => {
        const { email } = form
        AuthService.askForEmailActivation(email)
            .then(() => {
                dispatchModal({ msg: t('vehicles:activation_email_sent') })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }

    useEffect(() => {
        if (!token) return
        AuthService.confirmAccount(token)
            .then(() => {
                dispatchModal({ msg: t('vehicles:account_activated') })
                setActivated(true)
                router.push('/auth/login')
            })
            .catch(err => {
                const action = err.name === 'AlreadyActivatedError' ? 'already-activated' : 'activation-invalid'
                const redirect = `/auth/error?${querystring.stringify({ action })}`
                router.push(`/auth/callback?redirect=${redirect}`)
            })
    }, [])

    if (!token) {
        return (
            <>
                <h1>{t('vehicles:activate_my_profile')}</h1>
                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6}>
                        <form className="p-3 mt-3 mx-auto" onSubmit={handleSubmit(onSubmitAskForActivation)}>
                            <FieldWrapper label={t('vehicles:')}>
                                <EmailInput
                                    name="email"
                                    inline
                                    errors={errors}
                                    control={control}
                                    rules={{ required: t('form_validations:required')}}
                                />
                            </FieldWrapper>
                            <div className="submit">
                                <button className="btn btn-outline-primary" type="submit">
                                    Activer mon compte
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </>
        )
    } else if (activated) {
        return (
            <Container>
                <CTALink
                    title={t('layout:login')}
                    href="/auth/login'"
                    className="cta_nav_link"
                />
            </Container>
        )
    }
    return <Loading/>
}

export default ConfirmAccount
