import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import PasswordInput from '../../components/Form/Inputs/PasswordInput'
import FieldWrapper from '../../components/Form/FieldWrapper'
import AuthService from '../../services/AuthService'
import { MessageContext } from '../../context/MessageContext'
import { Col } from 'reactstrap'
import CTAButton from '../../components/CTAButton'

const ResetPassword = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { redirect, token } = router.query
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { control, errors, getValues, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all'
    })

    const onSubmit = (form) => {
        if (!token) {
            return dispatchModal({
                type: 'error',
                err: t('vehicles:password_reset_token_expired')
            })
        }

        AuthService.resetPassword(token, form.password)
            .then(() => {
                dispatchModal({ msg: t('vehicles:password_successfully_reset') })
                if (redirect) return router.push(`/auth/callback?redirect=${redirect}`)
                router.push('/auth/callback?redirect=/auth/login')
            }).catch(err => {
                dispatchModalError({ err })
                if (redirect) return router.push(`/auth/callback?redirect=${redirect}`)
            })
    }

    return (
        <div className="container">
            <Col className="m-auto" sm="12" md="7">
                <h1>{t('vehicles:reset_password')}</h1>
                <form className="mt-3 mx-auto"
                    onSubmit={handleSubmit(onSubmit)}>

                    <FieldWrapper label={t('vehicles:password')}>
                        <PasswordInput
                            name="password"
                            errors={errors}
                            control={control}
                            rules={{ required: t('form_validations:required') }}
                        />
                    </FieldWrapper>

                    <FieldWrapper label={t('vehicles:password_confirm')}>
                        <PasswordInput
                            name="confirm_pwd"
                            errors={errors}
                            control={control}
                            rules={{
                                required: t('form_validations:required'),
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues()
                                        return password === value || t('form_validations:form_validations')
                                    }
                                }
                            }}
                        />
                    </FieldWrapper>

                    <div className="submit">
                        <CTAButton
                            title={t('vehicles:reset_password')}
                            submit
                        />
                    </div>
                </form>
            </Col>
        </div>
    )
}

export default ResetPassword
